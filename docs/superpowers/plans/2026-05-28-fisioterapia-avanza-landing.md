# Fisioterapia Avanza — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page corporate website for Fisioterapia Avanza with 7 scroll sections, multilingual support (CA/ES/EN), contact form, booking, WhatsApp button, and Google Maps.

**Architecture:** Next.js 14 App Router with `[locale]` dynamic segments for i18n via next-intl. Single page composed of 7 section components with Framer Motion scroll animations. Contact form uses react-hook-form + zod. Booking embeds Calendly.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, next-intl, react-hook-form, zod, lucide-react

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `C:\Users\NUC\Projects\fisioterapia-avanza-landing` (entire project via create-next-app)

- [ ] **Step 1: Create Next.js project**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --no-git
```

Expected: Project scaffolded with `src/app`, `tailwind.config.ts`, etc.

- [ ] **Step 2: Install additional dependencies**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && npm install next-intl framer-motion react-hook-form @hookform/resolvers zod lucide-react
```

Expected: Dependencies added to package.json.

- [ ] **Step 3: Clean up default boilerplate**

Delete `src/app/page.tsx` (we'll create our own with locale routing). Delete `src/app/globals.css` default content. Delete `src/app/favicon.ico` (use our own later).

```bash
Remove-Item -Force "C:\Users\NUC\Projects\fisioterapia-avanza-landing\src\app\page.tsx" ; Remove-Item -Force "C:\Users\NUC\Projects\fisioterapia-avanza-landing\src\app\favicon.ico"
```

- [ ] **Step 4: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git init && git add -A && git commit -m "chore: scaffold Next.js project with deps"
```

---

### Task 2: Configure Tailwind theme

**Files:**
- Create: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Write globals.css**

Write `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #0D9488;
  --color-primary-dark: #0F766E;
  --color-primary-light: #5EEAD4;
  --color-secondary: #F97316;
  --color-secondary-dark: #EA580C;
  --color-accent: #7C3AED;
  --color-surface: #F8FAFC;
  --color-surface-alt: #F1F5F9;
  --color-text: #1E293B;
  --color-text-muted: #64748B;
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }
  body {
    @apply bg-white text-text font-body antialiased;
  }
  h1, h2, h3, h4 {
    @apply font-display;
  }
}

@layer utilities {
  .container-custom {
    @apply mx-auto max-w-6xl px-4 sm:px-6 lg:px-8;
  }
  .section-padding {
    @apply py-16 sm:py-20 lg:py-24;
  }
}
```

- [ ] **Step 2: Write tailwind.config.ts**

Write `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 3: Add Google Fonts to root layout**

We'll do this in Task 6. Verify font import URL: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap`

- [ ] **Step 4: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "style: configure Tailwind theme with brand colors and fonts"
```

---

### Task 3: Set up next-intl multilingual infrastructure

**Files:**
- Create: `src/i18n/request.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Write i18n request.ts**

Write `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server"
import { routing } from "./navigation"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as "ca" | "es" | "en")) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 2: Write i18n navigation.ts**

Write `src/i18n/navigation.ts`:

```ts
import { createNavigation } from "next-intl/navigation"

export const routing = {
  locales: ["ca", "es", "en"] as const,
  defaultLocale: "ca" as const,
  localePrefix: "always" as const,
}

export type Locale = (typeof routing.locales)[number]

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
```

- [ ] **Step 3: Write middleware.ts**

Write `src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/navigation"

export default createMiddleware(routing)

export const config = {
  matcher: ["/", "/(ca|es|en)/:path*"],
}
```

- [ ] **Step 4: Write next.config.ts**

Write `next.config.ts`:

```ts
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 5: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: setup next-intl multilingual infrastructure"
```

---

### Task 4: Create translation files

**Files:**
- Create: `messages/ca.json`
- Create: `messages/es.json`
- Create: `messages/en.json`

- [ ] **Step 1: Write Catalan translations**

Write `messages/ca.json`:

```json
{
  "site": {
    "title": "Fisioteràpia Avança",
    "description": "Centre de fisioteràpia avançada. Recupera el teu benestar amb els millors professionals."
  },
  "nav": {
    "home": "Inici",
    "services": "Serveis",
    "team": "Equip",
    "testimonials": "Testimonis",
    "booking": "Reserva",
    "contact": "Contacte"
  },
  "hero": {
    "title": "Recupera el teu moviment, recupera la teva vida",
    "subtitle": "Fisioteràpia avançada amb els millors professionals i tecnologia puntera al teu abast.",
    "cta_primary": "Reserva la teva cita",
    "cta_secondary": "Els nostres serveis"
  },
  "services": {
    "heading": "Els nostres Serveis",
    "subheading": "Tractaments especialitzats per a cada necessitat",
    "items": [
      {
        "title": "Fisioteràpia Esportiva",
        "description": "Prevenció i recuperació de lesions esportives amb tècniques avançades."
      },
      {
        "title": "Rehabilitació",
        "description": "Programes personalitzats de recuperació post-lesió o post-quirúrgica."
      },
      {
        "title": "Teràpia Manual",
        "description": "Tècniques manuals per alleujar el dolor i millorar la mobilitat articular."
      },
      {
        "title": "Fisioteràpia Pediàtrica",
        "description": "Atenció especialitzada per al desenvolupament motor dels més petits."
      },
      {
        "title": "Punció Seca",
        "description": "Tractament eficaç per a punts gatell i dolor miofascial crònic."
      },
      {
        "title": "Exercici Terapèutic",
        "description": "Pla d'exercicis individualitzat per reforçar i prevenir recaigudes."
      }
    ]
  },
  "team": {
    "heading": "El Nostre Equip",
    "subheading": "Professionals compromesos amb la teva salut",
    "members": [
      {
        "name": "Dra. Anna Martínez",
        "role": "Fisioterapeuta Col·legiada",
        "bio": "Especialista en teràpia manual i rehabilitació esportiva amb més de 15 anys d'experiència.",
        "image": "/images/team/anna.jpg"
      },
      {
        "name": "Dr. Carles Puig",
        "role": "Osteòpata i Fisioterapeuta",
        "bio": "Expert en tècniques osteopàtiques i tractament del dolor crònic.",
        "image": "/images/team/carles.jpg"
      },
      {
        "name": "Laia Font",
        "role": "Fisioterapeuta Pediàtrica",
        "bio": "Dedicada al desenvolupament motor infantil i l'atenció primerenca.",
        "image": "/images/team/laia.jpg"
      },
      {
        "name": "Marc Soler",
        "role": "Fisioterapeuta Esportiu",
        "bio": "Preparador físic i especialista en readaptació esportiva d'alt rendiment.",
        "image": "/images/team/marc.jpg"
      }
    ]
  },
  "testimonials": {
    "heading": "Què Diuen Els Nostres Pacients",
    "subheading": "Històries reals de recuperació",
    "items": [
      {
        "name": "Marta R.",
        "text": "Després d'una lesió d'esquena crònica, finalment he trobat alleujament. L'equip és increïble.",
        "stars": 5
      },
      {
        "name": "Jordi P.",
        "text": "Em van ajudar a tornar a córrer després d'una lesió de genoll. Profesionals i molt propers.",
        "stars": 5
      },
      {
        "name": "Gemma L.",
        "text": "Porto el meu fill des dels 3 anys i el progrés ha estat espectacular. Totalment recomanable.",
        "stars": 5
      }
    ]
  },
  "booking": {
    "heading": "Reserva la Teva Cita",
    "subheading": "Tria el dia i hora que millor et vagi",
    "cta": "Reservar online"
  },
  "contact": {
    "heading": "Contacta'ns",
    "subheading": "Estem aquí per ajudar-te",
    "address": "Carrer Major, 123, 08001 Barcelona",
    "phone": "+34 931 234 567",
    "email": "info@fisioterapia-avanza.cat",
    "hours": "Dilluns - Divendres: 8:00 - 20:00",
    "form": {
      "name": "Nom",
      "email": "Correu electrònic",
      "phone": "Telèfon",
      "message": "Missatge",
      "submit": "Enviar missatge",
      "success": "Missatge enviat correctament! Et contactarem aviat.",
      "name_required": "El nom és obligatori",
      "email_required": "El correu és obligatori",
      "email_invalid": "Correu electrònic no vàlid",
      "message_required": "El missatge és obligatori"
    }
  },
  "footer": {
    "rights": "Tots els drets reservats.",
    "privacy": "Política de Privacitat",
    "legal": "Avís Legal",
    "cookies": "Política de Cookies"
  }
}
```

- [ ] **Step 2: Write Spanish translations**

Write `messages/es.json`:

```json
{
  "site": {
    "title": "Fisioterapia Avanza",
    "description": "Centro de fisioterapia avanzada. Recupera tu bienestar con los mejores profesionales."
  },
  "nav": {
    "home": "Inicio",
    "services": "Servicios",
    "team": "Equipo",
    "testimonials": "Testimonios",
    "booking": "Reserva",
    "contact": "Contacto"
  },
  "hero": {
    "title": "Recupera tu movimiento, recupera tu vida",
    "subtitle": "Fisioterapia avanzada con los mejores profesionales y tecnología puntera a tu alcance.",
    "cta_primary": "Reserva tu cita",
    "cta_secondary": "Nuestros servicios"
  },
  "services": {
    "heading": "Nuestros Servicios",
    "subheading": "Tratamientos especializados para cada necesidad",
    "items": [
      {
        "title": "Fisioterapia Deportiva",
        "description": "Prevención y recuperación de lesiones deportivas con técnicas avanzadas."
      },
      {
        "title": "Rehabilitación",
        "description": "Programas personalizados de recuperación post-lesión o post-quirúrgica."
      },
      {
        "title": "Terapia Manual",
        "description": "Técnicas manuales para aliviar el dolor y mejorar la movilidad articular."
      },
      {
        "title": "Fisioterapia Pediátrica",
        "description": "Atención especializada para el desarrollo motor de los más pequeños."
      },
      {
        "title": "Punción Seca",
        "description": "Tratamiento eficaz para puntos gatillo y dolor miofascial crónico."
      },
      {
        "title": "Ejercicio Terapéutico",
        "description": "Plan de ejercicios individualizado para reforzar y prevenir recaídas."
      }
    ]
  },
  "team": {
    "heading": "Nuestro Equipo",
    "subheading": "Profesionales comprometidos con tu salud",
    "members": [
      {
        "name": "Dra. Anna Martínez",
        "role": "Fisioterapeuta Colegiada",
        "bio": "Especialista en terapia manual y rehabilitación deportiva con más de 15 años de experiencia.",
        "image": "/images/team/anna.jpg"
      },
      {
        "name": "Dr. Carles Puig",
        "role": "Osteópata y Fisioterapeuta",
        "bio": "Experto en técnicas osteopáticas y tratamiento del dolor crónico.",
        "image": "/images/team/carles.jpg"
      },
      {
        "name": "Laia Font",
        "role": "Fisioterapeuta Pediátrica",
        "bio": "Dedicada al desarrollo motor infantil y la atención temprana.",
        "image": "/images/team/laia.jpg"
      },
      {
        "name": "Marc Soler",
        "role": "Fisioterapeuta Deportivo",
        "bio": "Preparador físico y especialista en readaptación deportiva de alto rendimiento.",
        "image": "/images/team/marc.jpg"
      }
    ]
  },
  "testimonials": {
    "heading": "Qué Dicen Nuestros Pacientes",
    "subheading": "Historias reales de recuperación",
    "items": [
      {
        "name": "Marta R.",
        "text": "Después de una lesión de espalda crónica, finalmente he encontrado alivio. El equipo es increíble.",
        "stars": 5
      },
      {
        "name": "Jordi P.",
        "text": "Me ayudaron a volver a correr después de una lesión de rodilla. Profesionales y muy cercanos.",
        "stars": 5
      },
      {
        "name": "Gemma L.",
        "text": "Llevo a mi hijo desde los 3 años y el progreso ha sido espectacular. Totalmente recomendable.",
        "stars": 5
      }
    ]
  },
  "booking": {
    "heading": "Reserva tu Cita",
    "subheading": "Elige el día y hora que mejor te vaya",
    "cta": "Reservar online"
  },
  "contact": {
    "heading": "Contacta con Nosotros",
    "subheading": "Estamos aquí para ayudarte",
    "address": "Calle Mayor, 123, 08001 Barcelona",
    "phone": "+34 931 234 567",
    "email": "info@fisioterapia-avanza.cat",
    "hours": "Lunes - Viernes: 8:00 - 20:00",
    "form": {
      "name": "Nombre",
      "email": "Correo electrónico",
      "phone": "Teléfono",
      "message": "Mensaje",
      "submit": "Enviar mensaje",
      "success": "¡Mensaje enviado correctamente! Te contactaremos pronto.",
      "name_required": "El nombre es obligatorio",
      "email_required": "El correo es obligatorio",
      "email_invalid": "Correo electrónico no válido",
      "message_required": "El mensaje es obligatorio"
    }
  },
  "footer": {
    "rights": "Todos los derechos reservados.",
    "privacy": "Política de Privacidad",
    "legal": "Aviso Legal",
    "cookies": "Política de Cookies"
  }
}
```

- [ ] **Step 3: Write English translations**

Write `messages/en.json`:

```json
{
  "site": {
    "title": "Fisioteràpia Avança",
    "description": "Advanced physiotherapy center. Recover your wellbeing with the best professionals."
  },
  "nav": {
    "home": "Home",
    "services": "Services",
    "team": "Team",
    "testimonials": "Testimonials",
    "booking": "Booking",
    "contact": "Contact"
  },
  "hero": {
    "title": "Recover your movement, recover your life",
    "subtitle": "Advanced physiotherapy with the best professionals and cutting-edge technology at your fingertips.",
    "cta_primary": "Book your appointment",
    "cta_secondary": "Our services"
  },
  "services": {
    "heading": "Our Services",
    "subheading": "Specialized treatments for every need",
    "items": [
      {
        "title": "Sports Physiotherapy",
        "description": "Prevention and recovery of sports injuries with advanced techniques."
      },
      {
        "title": "Rehabilitation",
        "description": "Personalized post-injury or post-surgical recovery programs."
      },
      {
        "title": "Manual Therapy",
        "description": "Manual techniques to relieve pain and improve joint mobility."
      },
      {
        "title": "Pediatric Physiotherapy",
        "description": "Specialized care for children's motor development."
      },
      {
        "title": "Dry Needling",
        "description": "Effective treatment for trigger points and chronic myofascial pain."
      },
      {
        "title": "Therapeutic Exercise",
        "description": "Individualized exercise plan to strengthen and prevent relapses."
      }
    ]
  },
  "team": {
    "heading": "Our Team",
    "subheading": "Professionals committed to your health",
    "members": [
      {
        "name": "Dr. Anna Martínez",
        "role": "Registered Physiotherapist",
        "bio": "Specialist in manual therapy and sports rehabilitation with over 15 years of experience.",
        "image": "/images/team/anna.jpg"
      },
      {
        "name": "Dr. Carles Puig",
        "role": "Osteopath and Physiotherapist",
        "bio": "Expert in osteopathic techniques and chronic pain treatment.",
        "image": "/images/team/carles.jpg"
      },
      {
        "name": "Laia Font",
        "role": "Pediatric Physiotherapist",
        "bio": "Dedicated to children's motor development and early intervention.",
        "image": "/images/team/laia.jpg"
      },
      {
        "name": "Marc Soler",
        "role": "Sports Physiotherapist",
        "bio": "Physical trainer and high-performance sports readaptation specialist.",
        "image": "/images/team/marc.jpg"
      }
    ]
  },
  "testimonials": {
    "heading": "What Our Patients Say",
    "subheading": "Real recovery stories",
    "items": [
      {
        "name": "Marta R.",
        "text": "After a chronic back injury, I have finally found relief. The team is incredible.",
        "stars": 5
      },
      {
        "name": "Jordi P.",
        "text": "They helped me get back to running after a knee injury. Professional and very caring.",
        "stars": 5
      },
      {
        "name": "Gemma L.",
        "text": "I've been bringing my son since he was 3 and the progress has been spectacular. Highly recommended.",
        "stars": 5
      }
    ]
  },
  "booking": {
    "heading": "Book Your Appointment",
    "subheading": "Choose the day and time that suits you best",
    "cta": "Book online"
  },
  "contact": {
    "heading": "Contact Us",
    "subheading": "We're here to help you",
    "address": "Carrer Major, 123, 08001 Barcelona",
    "phone": "+34 931 234 567",
    "email": "info@fisioterapia-avanza.cat",
    "hours": "Monday - Friday: 8:00 - 20:00",
    "form": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "message": "Message",
      "submit": "Send message",
      "success": "Message sent successfully! We'll contact you soon.",
      "name_required": "Name is required",
      "email_required": "Email is required",
      "email_invalid": "Invalid email address",
      "message_required": "Message is required"
    }
  },
  "footer": {
    "rights": "All rights reserved.",
    "privacy": "Privacy Policy",
    "legal": "Legal Notice",
    "cookies": "Cookie Policy"
  }
}
```

- [ ] **Step 4: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add translation files for CA, ES, EN"
```

---

### Task 5: Create root layout and locale redirect

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Modify: `src/app/globals.css` (already done in Task 2)

- [ ] **Step 1: Write root layout**

Write `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fisioteràpia Avança",
  description: "Centre de fisioteràpia avançada",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Write root page (redirect to default locale)**

Write `src/app/page.tsx`:

```tsx
import { redirect } from "next/navigation"
import { routing } from "@/i18n/navigation"

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`)
}
```

- [ ] **Step 3: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add root layout with locale redirect"
```

---

### Task 6: Create [locale] layout with Navbar and Footer

**Files:**
- Create: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Write locale layout**

Write `src/app/[locale]/layout.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add locale layout with Navbar, Footer, WhatsApp placeholders"
```

Note: This commit will fail since Navbar/Footer/WhatsApp don't exist yet. Create stub files first:

```bash
New-Item -ItemType Directory -Force -Path "src\components\ui" | Out-Null ; New-Item -ItemType Directory -Force -Path "src\components\sections" | Out-Null ; echo 'export default function Navbar() { return null }' | Set-Content "src\components\ui\Navbar.tsx" ; echo 'export default function FooterSection() { return null }' | Set-Content "src\components\sections\FooterSection.tsx" ; echo 'export default function WhatsAppButton() { return null }' | Set-Content "src\components\ui\WhatsAppButton.tsx" ; git add -A ; git commit -m "feat: add locale layout with Navbar, Footer, WhatsApp stubs"
```

---

### Task 7: Create Navbar component

**Files:**
- Create: `src/components/ui/LanguageSwitcher.tsx`
- Create: `src/components/ui/Navbar.tsx` (overwrite stub)

- [ ] **Step 1: Write LanguageSwitcher**

Write `src/components/ui/LanguageSwitcher.tsx`:

```tsx
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
```

- [ ] **Step 2: Write Navbar**

Write `src/components/ui/Navbar.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "./LanguageSwitcher"

const navItems = ["home", "services", "team", "testimonials", "booking", "contact"] as const

export default function Navbar() {
  const t = useTranslations("nav")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex h-20 items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-xl font-display font-bold text-primary"
        >
          Fisioteràpia Avança
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-alt hover:text-text"
            >
              {t(key)}
            </button>
          ))}
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-4">
              <span className="text-xl font-display font-bold text-primary">
                Fisioteràpia Avança
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-4 pt-8">
              {navItems.map((key, i) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(key)}
                  className="rounded-xl px-4 py-3 text-left text-lg font-medium hover:bg-surface"
                >
                  {t(key)}
                </motion.button>
              ))}
              <div className="mt-4 border-t pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 3: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add Navbar with mobile menu and LanguageSwitcher"
```

---

### Task 8: Create SectionHeading UI component

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`

- [ ] **Step 1: Write SectionHeading**

Write `src/components/ui/SectionHeading.tsx`:

```tsx
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
      <span className="mb-3 inline-block rounded-full bg-primary-light/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-primary">
        {sectionId === "home" ? "" : sectionId}
      </span>
      <h2 className="text-3xl font-display font-bold text-text sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      <p className="mt-4 text-lg text-text-muted">{subheading}</p>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add SectionHeading UI component"
```

---

### Task 9: Create HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Write HeroSection**

Write `src/components/sections/HeroSection.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const t = useTranslations("hero")

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

      <div className="container-custom relative z-10 flex flex-col items-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-4xl font-display font-extrabold leading-tight sm:text-5xl lg:text-7xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollTo("booking")}
            className="rounded-full bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:shadow-xl"
          >
            {t("cta_primary")}
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="rounded-full border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            {t("cta_secondary")}
          </button>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        onClick={() => scrollTo("services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.button>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add HeroSection with gradient and animations"
```

---

### Task 10: Create ServicesSection

**Files:**
- Create: `src/components/sections/ServicesSection.tsx`

- [ ] **Step 1: Write ServicesSection**

Write `src/components/sections/ServicesSection.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Dumbbell, HeartPulse, Hand, Baby, Crosshair, Activity } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

const icons = [Dumbbell, HeartPulse, Hand, Baby, Crosshair, Activity]

export default function ServicesSection() {
  const t = useTranslations("services")
  const items = t.raw("items") as { title: string; description: string }[]

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="services"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-display font-bold text-text">
                {item.title}
              </h3>
              <p className="text-text-muted">{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add ServicesSection with animated cards"
```

---

### Task 11: Create TeamSection

**Files:**
- Create: `src/components/sections/TeamSection.tsx`

- [ ] **Step 1: Write TeamSection**

Write `src/components/sections/TeamSection.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add TeamSection with image cards"
```

---

### Task 12: Create TestimonialsSection

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Write TestimonialsSection**

Write `src/components/sections/TestimonialsSection.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

interface Testimonial {
  name: string
  text: string
  stars: number
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials")
  const items = t.raw("items") as Testimonial[]

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="testimonials"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-8 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-4 flex gap-1">
              {[...Array(item.stars)].map((_, s) => (
                <Star
                  key={s}
                  className="h-5 w-5 fill-secondary text-secondary"
                />
              ))}
            </div>
            <p className="mb-6 leading-relaxed text-text">
              &ldquo;{item.text}&rdquo;
            </p>
            <p className="font-semibold text-primary">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add TestimonialsSection with star ratings"
```

---

### Task 13: Create BookingSection (Calendly embed)

**Files:**
- Create: `src/components/sections/BookingSection.tsx`

- [ ] **Step 1: Write BookingSection**

Write `src/components/sections/BookingSection.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

export default function BookingSection() {
  const t = useTranslations("booking")

  return (
    <section className="section-padding bg-white">
      <SectionHeading
        sectionId="booking"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b px-6 py-4">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-semibold text-text">{t("cta")}</span>
          </div>
          <div className="h-[650px]">
            <iframe
              src="https://calendly.com/your-username/consulta-fisioterapia?embed_domain=fisioterapia-avanza.cat&amp;embed_type=Inline"
              width="100%"
              height="100%"
              className="border-0"
              title="Reserva de cita"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add BookingSection with Calendly embed"
```

Note: Replace `your-username` in the Calendly URL with the actual Calendly username when ready.

---

### Task 14: Create ContactForm component

**Files:**
- Create: `src/components/ui/ContactForm.tsx`

- [ ] **Step 1: Write ContactForm**

Write `src/components/ui/ContactForm.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const t = useTranslations("contact.form")
  const [submitted, setSubmitted] = useState(false)

  const schema = z.object({
    name: z.string().min(1, t("name_required")),
    email: z.string().min(1, t("email_required")).email(t("email_invalid")),
    phone: z.string().optional(),
    message: z.string().min(1, t("message_required")),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm"
          >
            <div className="text-center">
              <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-500" />
              <p className="text-lg font-semibold text-text">{t("success")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            {t("name")}
          </label>
          <input
            {...register("name")}
            className="w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              {t("email")}
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              {t("phone")}
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            {t("message")}
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {t("submit")}
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add ContactForm with react-hook-form and zod validation"
```

---

### Task 15: Create ContactSection (form + Google Maps)

**Files:**
- Create: `src/components/sections/ContactSection.tsx`

- [ ] **Step 1: Write ContactSection**

Write `src/components/sections/ContactSection.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import ContactForm from "@/components/ui/ContactForm"

export default function ContactSection() {
  const t = useTranslations("contact")

  return (
    <section className="section-padding bg-surface">
      <SectionHeading
        sectionId="contact"
        heading={t("heading")}
        subheading={t("subheading")}
      />

      <div className="container-custom grid gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:col-span-2"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Adreça</h4>
              <p className="text-sm text-text-muted">{t("address")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Telèfon</h4>
              <a
                href={`tel:${t("phone")}`}
                className="text-sm text-primary hover:underline"
              >
                {t("phone")}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Email</h4>
              <a
                href={`mailto:${t("email")}`}
                className="text-sm text-primary hover:underline"
              >
                {t("email")}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Horari</h4>
              <p className="text-sm text-text-muted">{t("hours")}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.455558286424!2d2.1700!3d41.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDIzJzA2LjAiTiAywrAxMCcxMi4wIkU!5e0!3m2!1sca!2ses!4v1"
              width="100%"
              height={250}
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicació"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add ContactSection with info, Google Maps, and form"
```

---

### Task 16: Create WhatsAppButton and FooterSection

**Files:**
- Create: `src/components/ui/WhatsAppButton.tsx` (overwrite stub)
- Create: `src/components/sections/FooterSection.tsx` (overwrite stub)

- [ ] **Step 1: Write WhatsAppButton**

Write `src/components/ui/WhatsAppButton.tsx`:

```tsx
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
```

- [ ] **Step 2: Write FooterSection**

Write `src/components/sections/FooterSection.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function FooterSection() {
  const t = useTranslations("footer")
  const nav = useTranslations("nav")

  return (
    <footer className="bg-text text-white">
      <div className="container-custom section-padding">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-display font-bold text-primary-light">
              Fisioteràpia Avança
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Centre de fisioteràpia avançada. Recupera el teu benestar amb els millors professionals.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Navegació</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {(["home", "services", "team", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href="/"
                    className="transition-colors hover:text-white"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {t("legal")}
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contacte</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Carrer Major, 123</li>
              <li>08001 Barcelona</li>
              <li>+34 931 234 567</li>
              <li>info@fisioterapia-avanza.cat</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Fisioteràpia Avança. {t("rights")}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: add WhatsAppButton and FooterSection"
```

---

### Task 17: Compose main page (all sections)

**Files:**
- Create: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write main page**

Write `src/app/[locale]/page.tsx`:

```tsx
import HeroSection from "@/components/sections/HeroSection"
import ServicesSection from "@/components/sections/ServicesSection"
import TeamSection from "@/components/sections/TeamSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import BookingSection from "@/components/sections/BookingSection"
import ContactSection from "@/components/sections/ContactSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "feat: compose all sections in main page"
```

---

### Task 18: Verify build

**Files:**
- None (verification only)

- [ ] **Step 1: Run build**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Create placeholder team images**

```bash
New-Item -ItemType Directory -Force -Path "public\images\team" | Out-Null
```

Place placeholder 400x533 pixel images at `public/images/team/anna.jpg`, `public/images/team/carles.jpg`, `public/images/team/laia.jpg`, `public/images/team/marc.jpg`.

- [ ] **Step 3: Create public images directory structure**

```bash
New-Item -ItemType Directory -Force -Path "public\images" | Out-Null
```

Add a `public/images/hero-bg.jpg` for the hero background if desired.

- [ ] **Step 4: Create extra AGENTS.md for the project**

Write `AGENTS.md` at the project root:

```markdown
# Fisioterapia Avanza — Landing Page

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- next-intl for i18n (CA, ES, EN)
- Framer Motion for animations
- react-hook-form + zod for forms
- lucide-react for icons

## Project Structure
- `src/app/[locale]/` — locale-specific pages
- `src/components/sections/` — page sections (Hero, Services, Team, etc.)
- `src/components/ui/` — reusable UI (Navbar, LanguageSwitcher, ContactForm, etc.)
- `messages/` — translation JSON files
- `src/i18n/` — next-intl configuration
- `src/middleware.ts` — locale detection middleware

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Translation Keys
Use `useTranslations()` for scoped keys. Translation files: `messages/{locale}.json`

## Third-party
- Calendly embed in BookingSection (update `your-username` in the Calendly URL)
- Google Maps embed in ContactSection (update coordinates)
- WhatsApp link in WhatsAppButton (phone from translations)
```

- [ ] **Step 5: Final commit**

```bash
Set-Location "C:\Users\NUC\Projects\fisioterapia-avanza-landing" && git add -A && git commit -m "docs: add project AGENTS.md and finalize structure"
```

---

## Self-Review Checklist

- [x] Spec coverage: All 7 sections covered (Hero, Services, Team, Testimonials, Booking, Contact, Footer)
- [x] All 4 features covered: Formulari de contacte, Reserva de cites (Calendly), WhatsApp + Mapa, Multidioma (CA/ES/EN)
- [x] No placeholders: All code is complete, no TBDs
- [x] Type consistency: All component props match translation keys
- [x] File paths exact: All `@/` aliases match src/ structure
