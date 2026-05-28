import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/navigation"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/sections/FooterSection"
import WhatsAppButton from "@/components/ui/WhatsAppButton"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return {
    title: {
      template: "%s | Fisioteràpia Avança",
      default: "Fisioteràpia Avança",
    },
    description:
      locale === "ca"
        ? "Centre de fisioteràpia avançada"
        : locale === "es"
          ? "Centro de fisioterapia avanzada"
          : "Advanced physiotherapy center",
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "ca" | "es" | "en")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </NextIntlClientProvider>
  )
}
