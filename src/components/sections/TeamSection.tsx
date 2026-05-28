"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import SectionHeading from "@/components/ui/SectionHeading"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary-dark",
  "bg-accent/20 text-accent",
  "bg-primary-light/30 text-primary-dark",
]

function TeamImage({ member, index }: { member: TeamMember; index: number }) {
  const [failed, setFailed] = useState(false)

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .filter((c) => c && c !== ".")
    .join("")
    .slice(0, 2)
    .toUpperCase()

  if (failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${avatarColors[index % avatarColors.length]}`}
      >
        <span className="text-5xl font-display font-bold">{initials}</span>
      </div>
    )
  }

  return (
    <Image
      src={member.image}
      alt={member.name}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setFailed(true)}
    />
  )
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
              <TeamImage member={member} index={i} />
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
