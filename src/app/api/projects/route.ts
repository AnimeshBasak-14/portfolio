import { NextResponse } from "next/server";
import { projectsData } from "@/data/projects";

/**
 * Projects API Route Handler
 * 
 * Provides a lightweight GET endpoint returning portfolio projects.
 * Designed with a clean seam to swap in a database (e.g. Supabase, PostgreSQL)
 * or Headless CMS (Sanity, Notion) in the future without modifying consumer code.
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: projectsData,
      total: projectsData.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load project records" },
      { status: 500 }
    );
  }
}
