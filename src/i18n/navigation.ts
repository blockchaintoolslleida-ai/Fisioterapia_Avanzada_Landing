import { createNavigation } from "next-intl/navigation"

export const routing = {
  locales: ["ca", "es", "en"] as const,
  defaultLocale: "ca" as const,
  localePrefix: "always" as const,
}

export type Locale = (typeof routing.locales)[number]

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
