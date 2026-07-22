"use client"

import { motion } from "motion/react"
import { useRef } from "react"

export function Equipo() {
  const ref = useRef(null)

  return (
    <section id="equipo" ref={ref} className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-wide uppercase">
            Quiénes Somos
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            No somos abogados, somos gente que ya pasó por esto
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal/60 leading-relaxed">
            Migramos, tropezamos, aprendimos. Ahora ayudamos a otros a hacer el mismo camino
            sin los errores que nosotros cometimos. Asesoría de persona a persona, sin letra chica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Miembro 1 — Papá de Lucas */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-4xl">👤</span>
            </div>
            <h3 className="text-lg font-bold text-primary-dark mb-1">[Nombre]</h3>
            <p className="text-sm text-secondary font-medium mb-3">Asesor Migratorio</p>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-xs mx-auto">
              Vivió el proceso migratorio en primera persona. Conoce cada paso, cada obstáculo
              y cada solución porque los atravesó todos.
            </p>
          </motion.div>

          {/* Miembro 2 — Polola del papá */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-4xl">👤</span>
            </div>
            <h3 className="text-lg font-bold text-primary-dark mb-1">[Nombre]</h3>
            <p className="text-sm text-secondary font-medium mb-3">Asesora Migratoria</p>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-xs mx-auto">
              Compañera de ruta en cada trámite. Su experiencia complementa una visión integral
              del proceso migratorio para familias.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-charcoal/40 mt-10"
        >
          Fotos reales próximamente — mientras tanto, estamos atendiendo.
        </motion.p>
      </div>
    </section>
  )
}
