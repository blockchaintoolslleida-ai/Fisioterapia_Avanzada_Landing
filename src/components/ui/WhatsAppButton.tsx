"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const t = useTranslations("contact")

  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={`https://wa.me/${t("phone").replace(/[^0-9]/g, "")}?text=Hola%20Fisioter%C3%A0pia%20Avan%C3%A7a!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-shadow hover:shadow-xl sm:bottom-8 sm:right-8"
      aria-label="Contacta per WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  )
}
