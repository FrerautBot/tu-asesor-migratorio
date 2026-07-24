import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary-dark text-smoke/70 py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        <div>
          <p className="text-white font-bold text-lg mb-2">
            Tu Asesor<span className="text-secondary">Migratorio</span>
          </p>
          <p className="text-sm leading-relaxed max-w-xs">
            Asesoría migratoria basada en experiencia real. No somos abogados, somos
            gente que ya pasó por esto. Maule, Chile.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Enlaces</p>
          <div className="space-y-1 text-sm">
            <Link href="#qualifier" className="block py-2 hover:text-white transition-colors">Cuéntanos</Link>
            <Link href="#equipo" className="block py-2 hover:text-white transition-colors">Equipo</Link>
            <Link href="#servicios" className="block py-2 hover:text-white transition-colors">Servicios</Link>
            <Link href="#contacto" className="block py-2 hover:text-white transition-colors">Contacto</Link>
          </div>
        </div>

        <div>
          <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contacto</p>
          <div className="space-y-2 text-sm">
            <p>Maule, Chile</p>
            <p>contacto@tuasesormigratorio.cl</p>
            <p>WhatsApp: +56 9 3252 5267</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 mt-10 pt-6 border-t border-white/10 text-center text-xs text-smoke/40">
        Tu Asesor Migratorio &copy; {new Date().getFullYear()} &mdash; Maule, Chile. Todos los derechos reservados.
      </div>
    </footer>
  )
}
