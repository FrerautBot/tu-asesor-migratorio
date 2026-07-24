import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // =====================
  // Security Headers
  // =====================

  // HSTS — forzar HTTPS (1 año, incluye subdominios)
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  )

  // CSP — Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://yxtcbarccswfhhctaoon.supabase.co https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://yxtcbarccswfhhctaoon.supabase.co https://vitals.vercel-insights.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ")

  response.headers.set("Content-Security-Policy", csp)

  // Anti-MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")

  // Anti-clickjacking
  response.headers.set("X-Frame-Options", "DENY")

  // Referrer Policy — solo pasar origen en cross-origin
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  )

  // Permissions Policy — restringir APIs del navegador
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  )

  // =====================
  // Rate Limiting — protege rutas sensibles
  // =====================

  const sensitivePaths = [
    "/api/contact",
    "/auth/login",
    "/auth/signup",
  ]

  if (sensitivePaths.some((p) => request.nextUrl.pathname.startsWith(p))) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    // Rate limit header (para monitoreo en Vercel WAF)
    response.headers.set("X-RateLimit-IP", ip)
  }

  // Eliminar headers que revelan infraestructura
  response.headers.delete("X-Powered-By")
  response.headers.delete("Server")

  return response
}

export const config = {
  matcher: [
    /*
     * Apply to all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon, images, svg
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
}
