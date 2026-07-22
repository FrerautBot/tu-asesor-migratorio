"use client"

import { motion } from "motion/react"
import { MessageCircle, Search, HeartHandshake } from "lucide-react"

const PASOS = [
  {
    num: "1",
    icon: MessageCircle,
    title: "Nos cuentas tu caso",
    desc: "Por WhatsApp o el formulario de contacto. Sin papeleo, sin cita previa. Cuéntanos en qué etapa estás y qué necesitas.",
  },
  {
    num: "2",
    icon: Search,
    title: "Evaluamos y te orientamos",
    desc: "Revisamos tu situación sin costo. Te decimos qué necesitas, cuánto demora, y si realmente calificas — antes de que gastes un peso.",
  },
  {
    num: "3",
    icon: HeartHandshake,
    title: "Te acompañamos paso a paso",
    desc: "Desde el primer formulario hasta el documento final. Con seguimiento real, recordatorios, y un WhatsApp de distancia para cada duda.",
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-primary-dark py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-wide uppercase">
            Cómo Funciona
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Tres pasos, cero complicaciones
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-smoke/50 leading-relaxed">
            Simple. Directo. Humano. Así debería ser la asesoría migratoria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {PASOS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              {/* Número grande */}
              <div className="text-7xl sm:text-8xl font-bold text-white/5 mb-4 leading-none select-none">
                {p.num}
              </div>

              <div className="relative -mt-16">
                <div className="h-14 w-14 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-5">
                  <p.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-smoke/50 leading-relaxed">{p.desc}</p>
              </div>

              {/* Línea conectora entre pasos (escritorio) */}
              {i < PASOS.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
