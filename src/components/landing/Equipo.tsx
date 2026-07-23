"use client"

import { motion } from "motion/react"
import Image from "next/image"
import MarisaImg from "@/../public/equipo-marisa.jpeg"

export function Equipo() {
  return (
    <section id="equipo" className="bg-white py-16 sm:py-24">
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

        {/* Marisa Banda Mendoza */}
        <div className="max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10 ring-2 ring-secondary/20 shadow-lg">
              <Image
                src={MarisaImg}
                alt="Marisa Banda Mendoza"
                width={352}
                height={352}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-dark mb-1">
              Marisa Banda Mendoza
            </h3>
            <p className="text-sm text-secondary font-medium mb-4">
              Asesora Migratoria Principal
            </p>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-xs mx-auto">
              Vivió el proceso migratorio en primera persona. Conoce cada paso, cada
              obstáculo y cada solución porque los atravesó todos. Hoy dedica su
              experiencia a ayudar a otros a hacer lo mismo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
