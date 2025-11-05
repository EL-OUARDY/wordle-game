import { Suspense } from "react";
import { Metadata } from "next";
import Wordle from "@/components/Wordle";
import { APP_LINK, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} - Jouez à Wordle en français`,
  description:
    "Jouez à Wordle gratuitement, en français, sans publicités — amusez-vous sans limites ! Suivez vos stats et défiez vos amis.",
  keywords: ["Wordle", APP_NAME, "Jeu", "Langues", "Wordle Multilingue"],
  openGraph: {
    title: `${APP_NAME} - Jeu Wordle Multilingue`,
    description:
      "Jouez à Wordle gratuitement en français, anglais, arabe, et plus. Pas de pubs, juste du fun !",
    url: APP_LINK,
    siteName: APP_NAME,
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} aperçu`,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Jouez à Wordle en français`,
    description:
      "Wordle gratuit et sans pubs en plusieurs langues. Jouez maintenant !",
    images: ["/img/og-image.png"],
  },
};

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      <Suspense fallback={null}>
        <Wordle language="French" />
      </Suspense>
    </main>
  );
}
