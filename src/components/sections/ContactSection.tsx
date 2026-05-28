"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import ContactForm from "@/components/ui/ContactForm"

export default function ContactSection() {
  const t = useTranslations("contact")

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="contact"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:col-span-2"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Adreça</h4>
              <p className="text-sm text-text-muted">{t("address")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Telèfon</h4>
              <a
                href={`tel:${t("phone")}`}
                className="text-sm text-primary hover:underline"
              >
                {t("phone")}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Email</h4>
              <a
                href={`mailto:${t("email")}`}
                className="text-sm text-primary hover:underline"
              >
                {t("email")}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Horari</h4>
              <p className="text-sm text-text-muted">{t("hours")}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.455558286424!2d2.1700!3d41.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDIzJzA2LjAiTiAywrAxMCcxMi4wIkU!5e0!3m2!1sca!2ses!4v1"
              width="100%"
              height={250}
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicació"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
