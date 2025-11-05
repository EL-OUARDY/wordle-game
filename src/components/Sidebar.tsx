import React from "react";
import LogoIcon from "@/components/ui/icons/logo";
import useAuth from "@/hooks/useAuth";
import { APP_NAME, BMC_LINK } from "@/lib/constants";
import Image from "next/image";
import Button from "@/components/ui/button";
import LogoutIcon from "@/components/ui/icons/logout";
import { motion } from "motion/react";
import { getRank, share } from "@/lib/utils";
import ShareIcon from "@/components/ui/icons/share";
import Link from "next/link";
import UserIcon from "@/components/ui/icons/user";
import BuyMeACofeeIcon from "@/components/ui/icons/bmc";
import { languagesList } from "@/components/LanguagesMenu";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import { useTranslations } from "next-intl";

interface Props {
  onClose?: () => void;
}

function SideBar({ onClose }: Props) {
  const { user, logout } = useAuth();
  const stats = useStore((s) => s.userStats);

  const wins = stats
    ? stats.guessDistribution.reduce((acc, cur) => acc + cur.count, 0)
    : 0;
  const rank = getRank(wins);

  const t = useTranslations("Sidebar");
  const tRanks = useTranslations("Ranks");

  return (
    <div className="sidebar relative flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 pb-42">
        <div className="border-key-background flex items-center gap-2 border-b pb-4">
          <LogoIcon className="size-[1.35rem] sm:size-6" />
          <h2 className="text-2xl font-semibold">{APP_NAME}</h2>
        </div>
        <p className="text-lg">{t("welcomeText")}</p>

        <div className="languages">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-xl font-semibold">{t("languages")}</h3>
            <hr className="separator border-key-background flex-1" />
          </div>

          <div className="grid grid-cols-2">
            {languagesList.map((language, index) => (
              <div className="py-1" key={index}>
                {language.available ? (
                  <Link
                    onClick={onClose}
                    href={language.link}
                    className={clsx(
                      "language relative flex size-fit items-center gap-3 text-lg hover:underline",
                    )}
                  >
                    {language.icon}
                    <span>{language.displayName}</span>
                  </Link>
                ) : (
                  <span
                    className={clsx(
                      "language relative flex w-fit items-center gap-3 text-lg",
                    )}
                  >
                    <span className="grayscale filter">{language.icon}</span>
                    <span>{language.displayName}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr className="separator border-key-background" />

        <p className="support text-xl text-balance">{t("support.title")}</p>

        <motion.a
          href={BMC_LINK}
          target="_blank"
          className="flex w-fit items-center justify-center gap-2 rounded-xl bg-[#FFDD00] px-4 py-2 text-lg text-[#181818]"
          aria-label={t("support.button")}
          whileTap={{ scale: 0.95 }}
        >
          <BuyMeACofeeIcon className="size-5" />
          {t("support.button")}
        </motion.a>
      </div>

      <div className="user-info bg-tile-background border-key-background absolute bottom-0 flex w-full flex-col gap-4 rounded-2xl border p-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <div
                className="user-avatar border-key-background flex size-[46px] items-center justify-center rounded-full border p-[2px]"
                style={{
                  borderColor: rank.color,
                }}
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : user.displayName ? (
                  <span className="flex size-full items-center justify-center text-lg">
                    {user.displayName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                ) : (
                  <LogoIcon className="size-5" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="user-fullname text-lg font-semibold">
                  {user.displayName || user.email || `#${APP_NAME}`}
                </div>

                <div className="user-rank relative flex w-fit items-center justify-center gap-2 overflow-hidden px-2">
                  {t.rich("userProfile.rankLabel", {
                    rank: () => (
                      <span
                        className="relative text-base font-normal"
                        style={{ color: rank.color }}
                      >
                        {tRanks(rank.name)}
                      </span>
                    ),
                  })}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundColor: rank.color,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="controls flex w-full justify-between gap-2">
              <Button
                variant="outline"
                onClick={share}
                className="flex flex-1 items-center gap-2 rounded-xl !px-2 !py-1 normal-case"
                aria-label={t("userProfile.shareButton")}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="size-4" />
                {t("userProfile.shareButton")}
              </Button>
              <Button
                onClick={() => {
                  logout();
                  // Hard page reload
                  window.location.href = window.location.href;
                }}
                className="flex flex-1 items-center gap-2 rounded-xl !px-2 !py-1 normal-case"
                aria-label={t("userProfile.logoutButton")}
                whileTap={{ scale: 0.95 }}
              >
                <LogoutIcon className="size-4" />
                {t("userProfile.logoutButton")}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg">{t("userProfile.text")}</p>
            <div className="controls flex w-full justify-between gap-2">
              <Button
                variant="outline"
                onClick={share}
                className="flex flex-1 items-center gap-2 rounded-xl !px-2 !py-1 normal-case"
                aria-label={t("userProfile.shareButton")}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="size-4" />
                {t("userProfile.shareButton")}
              </Button>
              <motion.span
                className="bg-button-background text-button-foreground flex-1 cursor-pointer gap-2 rounded-xl !px-2 !py-1 text-center text-[1.06rem] transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  className="flex items-center justify-center gap-2"
                  href={"/login"}
                  onClick={onClose}
                  aria-label={t("userProfile.loginButton")}
                >
                  <UserIcon className="size-4" />
                  {t("userProfile.loginButton")}
                </Link>
              </motion.span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
