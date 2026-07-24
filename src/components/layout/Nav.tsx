"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const LINKS = [
  { label: "Equipo", href: "#equipo" },
  { label: "Servicios", href: "#servicios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0" aria-label="Tu Asesor Migratorio — Inicio">
          <img
            src="/logo-optimized.png"
            alt="Tu Asesor Migratorio"
            className="h-11 sm:h-14 w-auto"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-2">
            <Link
              href="/auth/login"
              className="text-sm text-charcoal/50 hover:text-charcoal transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Comenzar
            </Link>
          </div>
        </div>

        {/* Mobile hamburger — 44px touch target */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-11 w-11 flex items-center justify-center text-charcoal -mr-1"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-primary/10 bg-cream px-5 py-4 space-y-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-charcoal/70 hover:text-primary transition-colors py-3"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4 border-t border-primary/10">
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex-1 text-center text-sm py-3 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setOpen(false)}
              className="flex-1 text-center text-sm py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Comenzar
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
