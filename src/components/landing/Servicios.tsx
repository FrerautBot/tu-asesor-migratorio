"use client"

import { motion } from "motion/react"
import { FileText, Shield, Users, ClipboardCheck } from "lucide-react"
import Link from "next/link"

const SERVICIOS = [
  {
    num: "01",
    icon: FileText,
    title: "Residencias",
    desc: "Residencia temporal, definitiva, reunificación familiar, visa de trabajo. Te guiamos en cada formulario y requisito.",
    includes: ["Visa temporal", "Residencia definitiva", "Reunificación familiar", "Cambio de categoría"],
  },
  {
    num: "02",
    icon: Shield,
    title: "Nacionalización",
    desc: "Nacionalidad chilena por sangre, territorio o carta. Evaluamos tu caso y te decimos si calificas antes de que gastes plata.",
    includes: ["Nacionalidad por hijo chileno", "Carta de nacionalización", "Evaluación de requisitos", "Acompañamiento en cada etapa"],
  },
  {
    num: "03",
    icon: ClipboardCheck,
    title: "Documentos y Trámites",
    desc: "Subsanación, descargos, certificados, recuperación de estampados electrónicos. Lo que necesites, te ayudamos.",
    includes: ["Certificados de residencia", "Subsanación de trámites", "Órdenes de pago", "Recuperación de documentos"],
  },
  {
    num: "04",
    icon: Users,
    title: "Acompañamiento Personalizado",
    desc: "No solo llenamos papeles. Te acompañamos a entender cada paso, cada plazo, cada opción. Como un amigo que ya lo vivió.",
    includes: ["Orientación paso a paso", "Acompañamiento en citas", "Consultas por WhatsApp", "Seguimiento de tu caso"],
  },
]

export function Servicios() {
  return (
    <section id="servicios" className="bg-cream py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-wide uppercase">
            Nuestros Servicios
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Te ayudamos en cada etapa del camino
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal/60 leading-relaxed">
            Desde tu primera consulta hasta que tengas tus documentos en la mano.
            Servicios claros, precios justos, cero sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {SERVICIOS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-primary/10 hover:border-secondary/30 transition-colors group"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-primary/10 group-hover:text-secondary/15 transition-colors leading-none shrink-0">
                  {s.num}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <s.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-dark">{s.title}</h3>
                  </div>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-charcoal/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
          <p className="text-sm text-charcoal/50 mb-4">
            ¿No sabes qué servicio necesitas? Cuéntanos tu caso y te orientamos sin costo.
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-sm"
          >
            Consulta gratuita
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
