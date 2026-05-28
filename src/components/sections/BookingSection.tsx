"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

export default function BookingSection() {
  const t = useTranslations("booking")

  return (
    <section className="section-padding bg-white">
      <SectionHeading
        sectionId="booking"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b px-6 py-4">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-semibold text-text">{t("cta")}</span>
          </div>
          <div className="h-[650px]">
            <iframe
              src="https://calendly.com/your-username/consulta-fisioterapia?embed_domain=fisioterapia-avanza.cat&amp;embed_type=Inline"
              width="100%"
              height="100%"
              className="border-0"
              title="Reserva de cita"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
