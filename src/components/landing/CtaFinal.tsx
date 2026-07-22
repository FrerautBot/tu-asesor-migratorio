"use client"

import { motion } from "motion/react"

export function CtaFinal() {
  return (
    <section id="contacto" className="relative bg-primary-dark py-16 sm:py-24 overflow-hidden">
      {/* Orbes cinematográficos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle at center, #C17A4E 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle at center, #1B3A5C 0%, transparent 70%)", filter: "blur(100px)" }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-[0.15em] uppercase">
            ¿Empezamos?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Su proceso migratorio, en manos de gente que ya lo vivió
          </h2>
          <p className="text-sm sm:text-base text-white/45 leading-relaxed mb-10 max-w-lg mx-auto">
            La primera conversación es sin costo. Cuéntenos su caso,
            le decimos exactamente qué necesita y cuánto demora.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a
              href="https://wa.me/56932525267"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 hover:-translate-y-0.5 transition-all duration-300 text-center min-h-[44px] text-sm sm:text-base shadow-lg shadow-secondary/25"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablemos por WhatsApp
            </a>

            <a
              href="mailto:contacto@tuasesormigratorio.cl"
              className="glass-btn inline-flex items-center justify-center px-8 py-4 text-white font-semibold text-center min-h-[44px] text-sm sm:text-base"
            >
              contacto@tuasesormigratorio.cl
            </a>
          </div>

          {/* Formulario glass */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto space-y-4 text-left"
          >
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-white/50 mb-1.5">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                required
                placeholder="Dr. / Ing. / Su nombre completo"
                className="glass-input w-full px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/50 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="su@correo.com"
                className="glass-input w-full px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-white/50 mb-1.5">
                Teléfono <span className="text-white/20">(opcional)</span>
              </label>
              <input
                id="telefono"
                type="tel"
                placeholder="+56 9 3252 5267"
                className="glass-input w-full px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="caso" className="block text-sm font-medium text-white/50 mb-1.5">
                Cuéntenos su caso
              </label>
              <textarea
                id="caso"
                required
                rows={4}
                placeholder="Profesión, etapa del proceso migratorio, qué necesita resolver..."
                className="glass-input w-full px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 hover:-translate-y-0.5 transition-all duration-300 min-h-[44px] text-sm shadow-lg shadow-secondary/20"
            >
              Enviar consulta
            </button>
            <p className="text-xs text-white/20 text-center">
              Sin spam, sin compromiso. Respondemos hoy.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
