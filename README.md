# Animesh Basak — Liquid Glass Portfolio

An Apple Vision Pro / iOS-inspired "Liquid Glass" portfolio website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP ScrollTrigger**, **Three.js (React Three Fiber)**, and **Resend**.

![Liquid Glass Experience](https://animeshbasak.vercel.app/og-image.png)

## 💎 Design System & Aesthetic — "Liquid Glass"

- **Frosted Glassmorphism**: `backdrop-filter: blur(24–40px)`, semi-transparent dark obsidian acrylics, 1px inner border (`rgba(255, 255, 255, 0.15)`), and soft specular highlights along top edges.
- **Dynamic Optical Refraction**: Custom SVG displacement filters (`feTurbulence` + `feDisplacementMap`) simulating real-time fluid ripples and glass lens refraction.
- **Ambient Lighting**: Organic, slowly floating gradient meshes behind frosted glass panels.
- **Cursor Physics**:
  - **Magnetic Pull**: Interactive buttons and links gravitationally attract toward the pointer.
  - **3D Parallax Tilt**: Cards tilt dynamically in 3D (`rotateX`/`rotateY`) with spring physics.
  - **Spotlight Tracking**: Soft radial gradient tracks the cursor across glass surfaces.
  - **Fluid Droplet Trail**: Glowing liquid droplet particles fading out over ~0.5s.
- **3D Hero Crystal**: Interactive 3D glass object rendered via React Three Fiber with `MeshTransmissionMaterial` and cursor reaction.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Micro-Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll Orchestration**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Form Validation**: [Zod](https://zod.dev/)
- **Email Delivery**: [Resend](https://resend.com/) (with documented Nodemailer/SMTP fallback)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/AnimeshBasak-14/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file from the template:

```bash
cp .env.example .env.local
```

Add your credentials:

```env
# Get a free API key at https://resend.com
RESEND_API_KEY=re_your_api_key_here

# Recipient email for form submissions
CONTACT_TO_EMAIL=basakanimesh49@gmail.com

# Canonical URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: If `RESEND_API_KEY` is omitted, the API will operate in development simulation mode, validating requests and logging payloads to console without errors.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

```bash
npm run build
npm run start
```

---

## 🌐 API Routes

### `POST /api/contact`
Accepts contact inquiries, runs server-side Zod validation, enforces IP-based rate limiting (5 requests per 10 minutes), filters out bot spam via honeypot field, and delivers an email to `basakanimesh49@gmail.com` via Resend.

### `GET /api/projects`
Provides an extensible JSON endpoint serving project records with a clean seam for CMS or database integration.

---

## 👤 Identity & Canonical Links

- **Author**: Animesh Basak
- **Email**: [basakanimesh49@gmail.com](mailto:basakanimesh49@gmail.com)
- **LinkedIn**: [linkedin.com/in/animeshbasak03](https://linkedin.com/in/animeshbasak03/?skipRedirect=true)
- **GitHub**: [github.com/AnimeshBasak-14](https://github.com/AnimeshBasak-14)

---

## 📄 License

MIT © Animesh Basak
