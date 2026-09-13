import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend client safely if API key is present
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Target recipient email
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "basakanimesh49@gmail.com";

// Contact form input validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150, "Email must be less than 150 characters")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be less than 3000 characters")
    .trim(),
  // Honeypot anti-spam field: Bots will fill this, humans will not see it
  website_hp: z.string().optional(),
});

// Simple in-memory token bucket / sliding window rate limiter
// Keyed by client IP. Limits to 5 requests per 10 minutes.
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a few minutes before sending another message.",
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate JSON request body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, message, website_hp } = validationResult.data;

    // 3. Honeypot check: If the hidden input is filled, silently discard spam
    if (website_hp && website_hp.length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered from IP ${ip}`);
      // Pretend success so bot doesn't retry with altered payload
      return NextResponse.json({ success: true, message: "Message dispatched" });
    }

    // 4. Send email via Resend
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [TO_EMAIL],
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">
            <h2 style="color: #38bdf8; margin-top: 0;">New Inquiry from Animesh Basak Portfolio</h2>
            <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 6px 0;"><strong>Sender Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 6px 0;"><strong>Sender Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #38bdf8;">${escapeHtml(email)}</a></p>
              <p style="margin: 6px 0;"><strong>Sender IP:</strong> ${escapeHtml(ip)}</p>
            </div>
            <h3 style="color: #cbd5e1; margin-bottom: 8px;">Message:</h3>
            <div style="background-color: #1e293b; padding: 18px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
            <p style="margin-top: 24px; font-size: 12px; color: #64748b; text-align: center;">Sent via Animesh Basak Portfolio Liquid Glass Contact Form</p>
          </div>
        `,
      });

      if (error) {
        console.error("[Resend API Error]:", error);
        return NextResponse.json(
          { success: false, error: "Failed to dispatch email. Please try again or email directly." },
          { status: 500 }
        );
      }
    } else {
      // If RESEND_API_KEY is not yet set in environment, log message for local development
      console.log(`[Development Mode - No RESEND_API_KEY configured]`);
      console.log(`Simulated email to: ${TO_EMAIL}`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Message:\n${message}`);

      /**
       * NODEMAILER / SMTP FALLBACK DOCUMENTATION:
       * In environments where Resend is unavailable, you can use nodemailer:
       * 
       * import nodemailer from "nodemailer";
       * const transporter = nodemailer.createTransport({
       *   host: process.env.SMTP_HOST,
       *   port: Number(process.env.SMTP_PORT || 587),
       *   auth: {
       *     user: process.env.SMTP_USER,
       *     pass: process.env.SMTP_PASS,
       *   },
       * });
       * await transporter.sendMail({
       *   from: `"${name}" <${process.env.SMTP_USER}>`,
       *   to: TO_EMAIL,
       *   replyTo: email,
       *   subject: `Portfolio Message from ${name}`,
       *   text: message,
       * });
       */
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! I'll get back to you promptly.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API Internal Error]:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

// Basic HTML escaping helper
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
