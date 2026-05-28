"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import ContactForm from "@/components/ui/ContactForm"

interface Location {
  name: string
  address: string
  phone: string
  email: string
  hours: string
  mapsUrl: string
}

export default function ContactSection() {
  const t = useTranslations("contact")
  const locations = t.raw("locations") as Location[]

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="contact"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-10 lg:col-span-5"
        >
          {locations.map((loc, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-display font-bold text-primary">
                {loc.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">Adreça</p>
                    <p className="text-sm text-text-muted">{loc.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">Telèfon</p>
                    <a
                      href={`tel:${loc.phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">Email</p>
                    <a
                      href={`mailto:${loc.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {loc.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">Horari</p>
                    <p className="text-sm text-text-muted">{loc.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border">
                <iframe
                  src={loc.mapsUrl}
                  width="100%"
                  height={200}
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={loc.name}
                />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
