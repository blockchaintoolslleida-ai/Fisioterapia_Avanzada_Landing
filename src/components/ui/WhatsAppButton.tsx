"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

const phoneRaw = "+34 973 268 599"
const phoneDigits = phoneRaw.replace(/[^0-9]/g, "")

export default function WhatsAppButton() {
  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={`https://wa.me/${phoneDigits}?text=Hola%20Traumare!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-shadow hover:shadow-xl sm:bottom-8 sm:right-8"
      aria-label="Contacta per WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  )
}
