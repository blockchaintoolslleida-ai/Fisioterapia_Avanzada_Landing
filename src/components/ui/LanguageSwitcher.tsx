"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { Globe } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const languages = {
  ca: { label: "CA", native: "Català" },
  es: { label: "ES", native: "Castellano" },
  en: { label: "EN", native: "English" },
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-alt hover:text-text"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        {languages[locale as keyof typeof languages].label}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[140px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
          {Object.entries(languages).map(([code, { label, native }]) => (
            <button
              key={code}
              onClick={() => {
                router.replace(pathname, { locale: code as "ca" | "es" | "en" })
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface ${
                locale === code
                  ? "font-semibold text-primary"
                  : "text-text"
              }`}
            >
              <span className="text-xs font-bold uppercase text-text-muted">
                {label}
              </span>
              <span>{native}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
