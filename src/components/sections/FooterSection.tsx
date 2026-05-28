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
            <h4 className="mb-4 font-semibold">Contacte</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="font-medium text-white/80">Traumare — Lleida</li>
              <li>Avda. Blondel, 98, 25002 Lleida</li>
              <li>+34 973 268 599</li>
              <li className="mb-3">fisio@traumare.com</li>
              <li className="font-medium text-white/80">TraumareSport — Mequinensa</li>
              <li>Calle A, 31, 50170 Mequinensa, Zaragoza</li>
              <li>fisio@traumare.com</li>
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
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Fisioteràpia Avança. {t("rights")}
        </div>
      </div>
    </footer>
  )
}
