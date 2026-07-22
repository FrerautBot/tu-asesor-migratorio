import { Hero } from "@/components/landing/Hero"
import { Qualifier } from "@/components/landing/Qualifier"
import { Equipo } from "@/components/landing/Equipo"
import { Servicios } from "@/components/landing/Servicios"
import { ComoFunciona } from "@/components/landing/ComoFunciona"
import { Testimonios } from "@/components/landing/Testimonios"
import { Faq } from "@/components/landing/Faq"
import { CtaFinal } from "@/components/landing/CtaFinal"

export default function Home() {
  return (
    <>
      <Hero />
      <Qualifier />
      <Equipo />
      <Servicios />
      <ComoFunciona />
      <Testimonios />
      <Faq />
      <CtaFinal />
    </>
  )
}
