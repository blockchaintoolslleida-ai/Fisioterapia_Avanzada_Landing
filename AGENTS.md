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
