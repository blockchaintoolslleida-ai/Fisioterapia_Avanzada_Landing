"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import SectionHeading from "@/components/ui/SectionHeading"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export default function TeamSection() {
  const t = useTranslations("team")
  const members = t.raw("members") as TeamMember[]

  return (
    <section className="section-padding bg-white">
      <SectionHeading
        sectionId="team"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group text-center"
          >
            <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-surface-alt">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-display font-bold text-text">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-primary">{member.role}</p>
            <p className="mt-2 text-sm text-text-muted">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
