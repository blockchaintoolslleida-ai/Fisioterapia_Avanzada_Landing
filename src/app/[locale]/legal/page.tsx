"use client"

import { useTranslations } from "next-intl"

export default function LegalPage() {
  const t = useTranslations("legal")

  return (
    <div className="container-custom section-padding pt-28">
      <h1 className="mb-8 text-3xl font-display font-bold text-text sm:text-4xl">
        {t("title")}
      </h1>

      <div className="prose prose-slate max-w-3xl">
        <h2 className="mt-8 text-xl font-semibold text-text">{t("s1_title")}</h2>
        <p>{t("s1_text")}</p>

        <h2 className="mt-6 text-xl font-semibold text-text">{t("s2_title")}</h2>
        <p>{t("s2_text")}</p>

        <h2 className="mt-6 text-xl font-semibold text-text">{t("s3_title")}</h2>
        <p>{t("s3_text")}</p>

        <h2 className="mt-6 text-xl font-semibold text-text">{t("s4_title")}</h2>
        <p>{t("s4_text")}</p>

        <h2 className="mt-6 text-xl font-semibold text-text">{t("s5_title")}</h2>
        <p>{t("s5_text")}</p>
      </div>
    </div>
  )
}
