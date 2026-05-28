import { redirect } from "next/navigation"
import { routing } from "@/i18n/navigation"

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`)
}
