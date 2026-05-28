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

function MapsEmbed({ address, name }: { address: string; name: string }) {
  const encoded = encodeURIComponent(address)
  return (
    <iframe
      src={`https://maps.google.com/maps?q=${encoded}&output=embed`}
      width="100%"
      height={200}
      className="border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={name}
    />
  )
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

      <div className="container-custom space-y-10">
        <div className="grid gap-8 md:grid-cols-2">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
            >
              <h3 className="mb-5 text-xl font-display font-bold text-primary">
                {loc.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{loc.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <a
                      href={`tel:${loc.phone}`}
                      className="text-sm text-text-muted hover:text-primary hover:underline"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <a
                      href={`mailto:${loc.email}`}
                      className="text-sm text-text-muted hover:text-primary hover:underline"
                    >
                      {loc.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{loc.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border">
                <MapsEmbed address={loc.address} name={loc.name} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
