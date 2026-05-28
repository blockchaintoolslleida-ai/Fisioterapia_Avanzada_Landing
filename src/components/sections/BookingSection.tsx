"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Calendar, ExternalLink } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

const DOCTORALIA_URL =
  "https://www.doctoralia.es/clinicas/traumare?utm_id=2973&utm_source=widget-facility-2973&utm_medium=facility-button&utm_campaign=&utm_content=#highlight-calendar"

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
          className="mx-auto max-w-lg text-center"
        >
          <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
            <Calendar className="h-10 w-10" />
          </div>
          <a
            href={DOCTORALIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
          >
            {t("cta")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
