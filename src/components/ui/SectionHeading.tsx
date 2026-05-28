"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  sectionId: string
  heading: string
  subheading: string
}

export default function SectionHeading({
  sectionId,
  heading,
  subheading,
}: SectionHeadingProps) {
  return (
    <motion.div
      id={sectionId}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="container-custom mb-12 text-center sm:mb-16"
    >
      <h2 className="text-3xl font-display font-bold text-text sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      <p className="mt-4 text-lg text-text-muted">{subheading}</p>
    </motion.div>
  )
}
