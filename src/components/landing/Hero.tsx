"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Link from "next/link"

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax layers — cada capa se mueve a distinta velocidad
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yOrb3 = useTransform(scrollYProgress, [0, 1], [0, -260])
  const yContent = useTransform(scrollYProgress, [0, 0.4], [0, -60])
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scaleOrb1 = useTransform(scrollYProgress, [0, 1], [1, 1.4])

  return (
    <section
      ref={ref}
      className="relative bg-primary-dark text-smoke overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* --- CINEMATIC LIGHTING: orbes de luz flotantes --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbe 1 — terracota cálido (top right) */}
        <motion.div
          style={{
            y: yOrb1,
            scale: scaleOrb1,
            background: "radial-gradient(circle at center, #C17A4E 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          className="absolute -top-48 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
        />
        {/* Orbe 2 — azul profundo (bottom left) */}
        <motion.div
          style={{
            y: yOrb2,
            background: "radial-gradient(circle at center, #1B3A5C 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
        />
        {/* Orbe 3 — dorado/ámbar (center-right) */}
        <motion.div
          style={{
            y: yOrb3,
            background: "radial-gradient(circle at center, #D4953A 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          className="absolute top-1/3 -right-52 w-[400px] h-[400px] rounded-full opacity-10"
        />
      </div>

      {/* --- PARTÍCULAS FLOTANTES (geométricas, sutiles) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { x: "10%", y: "20%", s: 3, d: 8, o: 0.06 },
          { x: "85%", y: "65%", s: 2, d: 12, o: 0.05 },
          { x: "25%", y: "75%", s: 1.5, d: 10, o: 0.07 },
          { x: "70%", y: "15%", s: 2.5, d: 14, o: 0.04 },
          { x: "50%", y: "50%", s: 1, d: 9, o: 0.06 },
          { x: "90%", y: "85%", s: 2, d: 11, o: 0.05 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              opacity: p.o,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [p.o, p.o * 2.5, p.o],
            }}
            transition={{
              duration: p.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.3,
            }}
          />
        ))}
      </div>

      {/* --- GRID SUTIL (diagonal lines) --- */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, #FAF7F2 40px, #FAF7F2 41px)",
        }}
      />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative max-w-6xl mx-auto px-5 py-16 sm:py-28 md:py-44"
      >
        <div className="max-w-3xl">
          {/* Tag profesional */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-secondary text-xs sm:text-sm font-medium mb-5 tracking-[0.2em] uppercase"
          >
            Asesoría Migratoria Profesional &bull; Maule, Chile
          </motion.p>

          {/* Headline cinematográfico */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-white mb-6 tracking-tight"
          >
            Migrar no tiene
            <br />
            que ser un lío
          </motion.h1>

          {/* Subtítulo — enfocado a profesionales */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/55 leading-relaxed mb-10 max-w-xl"
          >
            Gestión migratoria para profesionales extranjeros que valoran
            su tiempo. Sin abogados caros, sin trámites eternos, sin
            soluciones genéricas.
          </motion.p>

          {/* --- CTAs con glass morphism --- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="https://wa.me/56932525267"
              target="_blank"
              className="glass-shimmer inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-all duration-300 text-center min-h-[44px] shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consulta por WhatsApp
            </Link>
            <Link
              href="#qualifier"
              className="glass-btn inline-flex items-center justify-center px-8 py-4 text-white font-semibold text-center min-h-[44px]"
            >
              Ver servicios
            </Link>
          </motion.div>

          {/* --- Trust cues sutiles --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap items-center gap-5 mt-10 text-white/25 text-xs"
          >
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Experiencia real, no legal
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Respuesta en menos de 2 horas
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              Trato personal, 1 a 1
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* --- Gradiente de transición inferior --- */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream via-cream/50 to-transparent pointer-events-none" />
    </section>
  )
}
