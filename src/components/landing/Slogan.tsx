"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { motion, useInView } from "motion/react"

const FRASE = "Migrar es simple"
const COLOR = "#B54A28"

// Generar posiciones aleatorias deterministas para cada letra
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

interface LetterData {
  char: string
  id: number
  fromX: number
  fromY: number
  fromRotate: number
}

function buildLetters(): LetterData[] {
  return FRASE.split("").map((char, i) => ({
    char,
    id: i,
    fromX: (seededRandom(i * 7) - 0.5) * 600,
    fromY: (seededRandom(i * 13) - 0.5) * 400,
    fromRotate: (seededRandom(i * 3) - 0.5) * 360,
  }))
}

export function Slogan() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const letters = useMemo(() => buildLetters(), [])
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setArmed(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const active = inView && armed

  // Posiciones aleatorias para la brújula
  const brjFromX = (seededRandom(99) - 0.5) * 500
  const brjFromY = (seededRandom(101) - 0.5) * 350
  // La brújula gira 360° — -355 a 0 fuerza el giro completo sin ambigüedad
  const brjStartRot = -355

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0F2440 0%, #0F2440 40%, #FAF7F2 60%, #FAF7F2 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-5 text-center">
        {/* Brújula — arriba del texto, animada como una letra más + giro completo */}
        <motion.div
          initial={{
            opacity: 0,
            x: brjFromX,
            y: brjFromY,
            rotate: brjStartRot,
            scale: 0.2,
          }}
          animate={
            active
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: [brjStartRot, 0],
                  scale: 1,
                }
              : {}
          }
          transition={{
            duration: 1.4,
            delay: 0.28, // aparece después de las primeras letras de "Migrar"
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.5 },
            rotate: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="flex justify-center mb-2"
        >
          <img
            src="/brujula.png"
            alt=""
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 select-none pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>

        {/* Texto animado */}
        <div className="inline-flex flex-wrap justify-center">
          {letters.map(({ char, id, fromX, fromY, fromRotate }) => (
            <motion.span
              key={id}
              initial={{
                opacity: 0,
                x: fromX,
                y: fromY,
                rotate: fromRotate,
                scale: 0.3,
              }}
              animate={
                active
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 1.2,
                delay: 0.1 + id * 0.06,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.6 },
              }}
              className={`inline-block font-[family-name:var(--font-cormorant)] italic font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide ${
                char === " " ? "w-4 sm:w-6 md:w-8" : ""
              }`}
              style={{ color: COLOR }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </div>

        {/* Línea decorativa sutil que aparece después */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={active ? { width: 120, opacity: 0.5 } : {}}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px mx-auto mt-6"
          style={{ backgroundColor: COLOR }}
        />
      </div>
    </section>
  )
}
