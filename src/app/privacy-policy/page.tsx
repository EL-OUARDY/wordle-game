"use client";
import { motion } from "motion/react";
import { APP_NAME, EMAIL } from "../../lib/constants";
import { useTranslations } from "next-intl";
export default function Page() {
  const t = useTranslations("PrivacyPolicy");

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-4 flex w-full max-w-[520px] flex-1 flex-col gap-4 p-4"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">
          {t("title", { appName: APP_NAME })}
        </h1>
        <p className="text-lg">{t("intro", { appName: APP_NAME })}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="information-we-collect" className="text-2xl font-semibold">
          {t("section1.title")}
        </h2>
        <ul className="text-lg">
          <li>
            {t.rich("section1.anonymous", {
              underline: (chunks) => (
                <span className="underline">{chunks}</span>
              ),
            })}
          </li>
          <li>
            {t.rich("section1.loggedIn", {
              underline: (chunks) => (
                <span className="underline">{chunks}</span>
              ),
            })}
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="how-we-store-data" className="text-2xl font-semibold">
          {t("section2.title")}
        </h2>
        <ul className="text-lg">
          <li>
            {t.rich("section2.gameSettings", {
              underline: (chunks) => (
                <span className="underline">{chunks}</span>
              ),
            })}
          </li>
          <li>
            {t.rich("section2.userStats", {
              underline: (chunks) => (
                <span className="underline">{chunks}</span>
              ),
            })}
          </li>
          <li>
            {t.rich("section2.analytics", {
              underline: (chunks) => (
                <span className="underline">{chunks}</span>
              ),
            })}
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="cookies" className="text-2xl font-semibold">
          {t("section3.title")}
        </h2>
        <p className="text-lg">{t("section3.content")}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="playing-the-game" className="text-2xl font-semibold">
          {t("section4.title")}
        </h2>
        <ul className="text-lg">
          <li>{t("section4.anonPlay")}</li>
          <li>{t("section4.createAccount")}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="safety-security" className="text-2xl font-semibold">
          {t("section5.title")}
        </h2>
        <ul className="text-lg">
          <li>{t("section5.noShare")}</li>
          <li>{t("section5.secureData")}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="children" className="text-2xl font-semibold">
          {t("section6.title")}
        </h2>
        <p className="text-lg">
          {t("section6.content", { appName: APP_NAME })}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="changes-to-this-policy" className="text-2xl font-semibold">
          {t("section7.title")}
        </h2>
        <p className="text-lg">{t("section7.content")}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="user-data-deletion" className="text-2xl font-semibold">
          {t("section8.title")}
        </h2>
        <p className="text-lg">
          {t.rich("section8.content", {
            email: () => (
              <a href={"mailto:" + EMAIL} className="underline">
                {EMAIL}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 id="contact-us" className="text-2xl font-semibold">
          {t("contact.title")}
        </h2>
        <p className="text-lg">
          {t.rich("contact.content", {
            email: () => (
              <a href={"mailto:" + EMAIL} className="underline">
                {EMAIL}
              </a>
            ),
          })}
        </p>
      </div>
    </motion.main>
  );
}
