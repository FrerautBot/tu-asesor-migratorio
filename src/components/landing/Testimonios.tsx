"use client"

import { motion } from "motion/react"

export function Testimonios() {
  return (
    <section id="testimonios" className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-secondary text-xs sm:text-sm font-medium mb-3 tracking-wide uppercase">
            Testimonios
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Gente real, historias reales
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-charcoal/60 leading-relaxed">
            Ellos ya pasaron por esto. Así fue su experiencia con nosotros.
          </p>
        </motion.div>

        {/* Placeholder para screenshots de WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="bg-cream rounded-2xl p-5 border border-primary/5 h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="h-6 w-6 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </div>
                  <p className="text-xs text-charcoal/30 leading-relaxed">
                    Testimonio próximamente
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-charcoal/40 mt-8"
        >
        </motion.p>
      </div>
    </section>
  )
}
