"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

interface Testimonial {
  name: string
  text: string
  stars: number
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials")
  const items = t.raw("items") as Testimonial[]

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="testimonials"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-8 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-4 flex gap-1">
              {[...Array(item.stars)].map((_, s) => (
                <Star
                  key={s}
                  className="h-5 w-5 fill-secondary text-secondary"
                />
              ))}
            </div>
            <p className="mb-6 leading-relaxed text-text">
              &ldquo;{item.text}&rdquo;
            </p>
            <p className="font-semibold text-primary">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
