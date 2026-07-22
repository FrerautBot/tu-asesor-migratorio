"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { FileText, Shield, Users, ClipboardCheck } from "lucide-react"
import Link from "next/link"

const SERVICIOS = [
  {
    num: "01",
    icon: FileText,
    title: "Residencias y Visas",
    desc: "Gestión integral de visa temporal, residencia definitiva y reunificación familiar para profesionales.",
    includes: ["Visa de trabajo profesional", "Residencia definitiva", "Reunificación familiar", "Cambio de categoría migratoria"],
  },
  {
    num: "02",
    icon: Shield,
    title: "Nacionalización",
    desc: "Nacionalidad chilena por sangre, territorio o carta. Evaluación de viabilidad antes de iniciar cualquier trámite.",
    includes: ["Nacionalidad por hijo chileno", "Carta de nacionalización", "Evaluación de requisitos", "Seguimiento completo del proceso"],
  },
  {
    num: "03",
    icon: ClipboardCheck,
    title: "Documentación y Trámites",
    desc: "Subsanación, certificados, estampados electrónicos. Gestión documental precisa para profesionales sin tiempo que perder.",
    includes: ["Certificados de residencia", "Subsanación de trámites", "Órdenes de pago y resoluciones", "Recuperación de documentos"],
  },
  {
    num: "04",
    icon: Users,
    title: "Acompañamiento Premium",
    desc: "Atención personal 1 a 1. Un asesor dedicado que conoce tu caso, te recuerda plazos y resuelve dudas en minutos.",
    includes: ["Asesor dedicado a tu caso", "Seguimiento de plazos", "Consultas prioritarias por WhatsApp", "Acompañamiento en cada etapa"],
  },
]

export function Servicios() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section id="servicios" ref={ref} className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Orbe decorativo */}
      <motion.div
        style={{
          y: yOrb,
          background: "radial-gradient(circle at center, #1B3A5C 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        className="absolute -bottom-56 -right-44 w-[550px] h-[550px] rounded-full opacity-[0.05] pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-[0.15em] uppercase">
            Servicios
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4 tracking-tight">
            Soluciones migratorias para profesionales
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal/50 leading-relaxed">
            Procesos claros, precios transparentes, cero sorpresas. Sabemos
            que tu tiempo vale — por eso hacemos que cada trámite sea eficiente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {SERVICIOS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-cream/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary/5 hover:border-secondary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Número en marca de agua */}
              <span className="absolute top-4 right-5 text-7xl sm:text-8xl font-bold text-primary/[0.03] group-hover:text-secondary/[0.06] transition-colors leading-none select-none pointer-events-none">
                {s.num}
              </span>

              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-primary/10 flex items-center justify-center shrink-0 group-hover:border-secondary/30 group-hover:bg-secondary/5 transition-all duration-300 shadow-sm">
                    <s.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary-dark tracking-tight">{s.title}</h3>
                </div>
                <p className="text-sm text-charcoal/50 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-charcoal/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-charcoal/40 mb-4">
            ¿No sabes qué servicio necesitas? Cuéntanos tu caso y te orientamos sin costo.
          </p>
          <Link
            href="#qualifier"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-md shadow-primary/20"
          >
            Consulta gratuita
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
