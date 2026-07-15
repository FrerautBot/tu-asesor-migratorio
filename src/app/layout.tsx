import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tu Asesor Migratorio — Asesoría real para inmigrantes en Chile",
  description:
    "Te guiamos paso a paso con asesoría migratoria basada en experiencia real. No somos abogados, somos gente que ya pasó por esto. Maule, Chile.",
  keywords: ["asesoría migratoria", "inmigrantes Chile", "visa Chile", "residencia Chile", "Maule", "trámites migratorios"],
  icons: {
    icon: "/logo-symbol.svg",
    apple: "/logo-symbol.svg",
  },
  openGraph: {
    title: "Tu Asesor Migratorio — Asesoría real para inmigrantes",
    description: "Te guiamos paso a paso con asesoría basada en experiencia real.",
    type: "website",
    locale: "es_CL",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal overflow-x-hidden">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
