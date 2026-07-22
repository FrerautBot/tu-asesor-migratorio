"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Briefcase, GraduationCap, Stethoscope, Building2, Cpu, ArrowRight, Check } from "lucide-react"

const PROFESIONES = [
  { id: "medicina", icon: Stethoscope, label: "Medicina / Salud" },
  { id: "ingenieria", icon: Cpu, label: "Ingeniería / Tecnología" },
  { id: "academico", icon: GraduationCap, label: "Académico / Investigación" },
  { id: "empresario", icon: Building2, label: "Empresario / Ejecutivo" },
  { id: "otro", icon: Briefcase, label: "Otro profesional calificado" },
]

const NECESIDADES = [
  { id: "visa-trabajo", label: "Visa de trabajo / Residencia temporal" },
  { id: "definitiva", label: "Residencia definitiva" },
  { id: "nacionalizacion", label: "Nacionalización chilena" },
  { id: "reunificacion", label: "Reunificación familiar" },
  { id: "orientacion", label: "No estoy seguro — necesito orientación" },
]

const ETAPAS = [
  { id: "llegando", label: "Estoy por llegar a Chile" },
  { id: "temporal", label: "Ya estoy en Chile con visa temporal" },
  { id: "definitiva-etapa", label: "Quiero mi residencia definitiva" },
  { id: "oferta", label: "Tengo una oferta de trabajo concreta" },
]

export function Qualifier() {
  const [step, setStep] = useState(0)
  const [profesion, setProfesion] = useState("")
  const [necesidad, setNecesidad] = useState("")
  const [etapa, setEtapa] = useState("")

  const avanzar = () => setStep((s) => Math.min(s + 1, 3))
  const completado = step === 3

  return (
    <section id="qualifier" className="relative bg-cream py-16 sm:py-24 overflow-hidden">
      {/* Orbe decorativo sutil */}
      <div className="absolute -top-60 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle at center, #C17A4E 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative max-w-3xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-[0.15em] uppercase">
            Para profesionales extranjeros
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4 tracking-tight">
            Cuéntanos sobre ti
          </h2>
          <p className="text-sm sm:text-base text-charcoal/50 leading-relaxed max-w-xl mx-auto">
            Sabemos que tu tiempo vale. En 30 segundos entendemos tu caso
            y te decimos exactamente cómo podemos ayudarte.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-10 max-w-xs mx-auto">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                i < step ? "bg-secondary" : i === step ? "bg-secondary/60" : "bg-primary/10"
              }`}
            />
          ))}
        </div>

        {/* STEP 0: Profesión */}
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-sm font-medium text-charcoal/50 mb-6 tracking-wide uppercase">
              ¿En qué área te desempeñas?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {PROFESIONES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setProfesion(p.id); avanzar() }}
                  className="glass-card glass-lift group flex items-center gap-4 px-5 py-4 text-left min-h-[44px] cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                    <p.icon className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-primary-dark">{p.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 1: Necesidad */}
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-sm font-medium text-charcoal/50 mb-6 tracking-wide uppercase">
              ¿Qué necesitas resolver?
            </p>
            <div className="space-y-2.5 max-w-lg mx-auto">
              {NECESIDADES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { setNecesidad(n.id); avanzar() }}
                  className="w-full glass-card glass-lift flex items-center gap-4 px-5 py-4 text-left min-h-[44px] cursor-pointer group"
                >
                  <div className="h-5 w-5 rounded-full border-2 border-primary/20 flex items-center justify-center shrink-0 group-hover:border-secondary group-hover:bg-secondary/10 transition-colors">
                    <ArrowRight className="h-3 w-3 text-primary/30 group-hover:text-secondary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-primary-dark">{n.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Etapa */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-sm font-medium text-charcoal/50 mb-6 tracking-wide uppercase">
              ¿En qué etapa estás ahora?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {ETAPAS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => { setEtapa(e.id); avanzar() }}
                  className="w-full glass-card glass-lift flex items-center gap-3 px-5 py-4 text-left min-h-[44px] cursor-pointer group"
                >
                  <span className="text-sm font-medium text-primary-dark">{e.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: Resultado — redirige a WhatsApp con mensaje calificado */}
        {completado && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 200 }}
              className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="h-8 w-8 text-success" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold text-primary-dark mb-3 tracking-tight">
              Estás en buenas manos
            </h3>
            <p className="text-sm sm:text-base text-charcoal/50 leading-relaxed max-w-md mx-auto mb-8">
              Sabemos exactamente lo que un profesional como tú necesita.
              Cuéntanos tu caso por WhatsApp y te respondemos hoy.
            </p>

            <a
              href={`https://wa.me/56932525267?text=Hola%2C+soy+profesional+del+área+${encodeURIComponent(profesion)}%2C+necesito+${encodeURIComponent(necesidad)}%2C+estoy+en+etapa+${encodeURIComponent(etapa)}.+Me+gustaría+recibir+orientación.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-all duration-300 text-center min-h-[44px] shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>

            <button
              onClick={() => { setStep(0); setProfesion(""); setNecesidad(""); setEtapa(""); }}
              className="block mx-auto mt-4 text-xs text-charcoal/30 hover:text-charcoal/50 transition-colors"
            >
              Empezar de nuevo
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
