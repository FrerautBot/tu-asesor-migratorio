"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "¿Necesito un abogado para hacer un trámite migratorio?",
    a: "No necesariamente. Muchos trámites los puedes hacer por tu cuenta si sabes qué formulario llenar, adónde ir y qué documentos llevar. Nosotros justamente existimos para eso: guiarte sin que pagues los honorarios de un abogado. Para casos complejos —órdenes de expulsión, recursos de amparo— ahí sí recomendamos representación legal. Y somos los primeros en decírtelo con honestidad.",
  },
  {
    q: "¿Cuánto demora una residencia temporal?",
    a: "Depende del tipo de visa y de la carga administrativa del momento, pero en general: entre 3 y 8 meses. Nosotros te ayudamos a preparar todo bien de entrada para que no te rechacen por un papel mal puesto. Una solicitud bien presentada desde el día uno es la diferencia entre 3 meses y un año.",
  },
  {
    q: "Entré por paso no habilitado. ¿Puedo regularizar mi situación?",
    a: "Sí, existe el proceso de autodenuncia o empadronamiento biométrico. No es automático ni garantizado, pero se puede. Lo importante es no esconderse: mientras más tiempo pase, más se complica. Cuéntanos tu caso y te orientamos sobre tus opciones reales, sin asustarte ni venderte falsas promesas.",
  },
  {
    q: "¿Puedo trabajar mientras espero mi residencia?",
    a: "Depende del tipo de visa que solicitaste. Algunas visas temporales incluyen permiso de trabajo desde el día uno, otras requieren un trámite adicional. Si ya tienes una visa en trámite, revisamos tu caso y te decimos exactamente qué puedes y qué no puedes hacer legalmente.",
  },
  {
    q: "¿Qué pasa si me rechazan la visa?",
    a: "No es el fin del camino. Dependiendo del motivo del rechazo, puedes presentar un recurso de reconsideración, apelar, o volver a postular con documentación corregida. Lo peor que puedes hacer es quedarte de brazos cruzados. Evaluamos tu carta de rechazo y te decimos qué opciones tienes.",
  },
  {
    q: "¿Ustedes son abogados?",
    a: "No. Y no lo escondemos. Somos personas que migraron, que pasaron por el sistema migratorio chileno, que cometieron errores y aprendieron de ellos. Te ofrecemos experiencia real, orientación práctica y acompañamiento. Si tu caso requiere un abogado, te lo decimos directamente y te ayudamos a buscar uno.",
  },
  {
    q: "¿Cuánto cuesta la asesoría?",
    a: "La primera consulta es gratuita — evaluamos tu caso y te decimos qué necesitas. Si decides trabajar con nosotros, los precios dependen del servicio: desde orientación puntual hasta acompañamiento completo. Siempre te decimos el costo por adelantado, sin sorpresas. Como debe ser.",
  },
  {
    q: "¿Atienden solo en el Maule?",
    a: "Atendemos a inmigrantes de todo Chile. La primera consulta y el seguimiento son por WhatsApp o videollamada. Si tu trámite requiere presencia física en el Maule, coordinamos. Pero la distancia no es un problema para orientarte y revisar tu documentación.",
  },
]

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="faq" className="bg-cream py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-wide uppercase">
            Preguntas Frecuentes
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Lo que todos quieren saber
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal/60 leading-relaxed">
            Respuestas directas, sin vueltas. Como hablar con un amigo que ya pasó por esto.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl border border-primary/10 overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left min-h-[44px] hover:bg-primary/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-primary-dark pr-2">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-charcoal/40 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-charcoal/60 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
