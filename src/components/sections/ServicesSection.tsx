"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Dumbbell, HeartPulse, Hand, Baby, Crosshair, Activity } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

const icons = [Dumbbell, HeartPulse, Hand, Baby, Crosshair, Activity]

export default function ServicesSection() {
  const t = useTranslations("services")
  const items = t.raw("items") as { title: string; description: string }[]

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="services"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-display font-bold text-text">
                {item.title}
              </h3>
              <p className="text-text-muted">{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
