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

  return (
    <div className="sidebar relative flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 pb-42">
        <p className="text-lg">
          Play Wordle for free, in your language, with no ads — unlimited fun,
          no limits!
        </p>

        <div className="languages">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-xl font-semibold">Languages</h3>
            <hr className="separator border-key-background flex-1" />
          </div>

          <div className="grid grid-cols-2">
            {languagesList.map((language, index) => (
              <Link
                key={index}
                onClick={onClose}
                href={language.link}
                className={clsx(
                  "language relative flex items-center gap-3 py-1 text-lg hover:underline",
                )}
              >
                {language.icon}
                <span>{language.displayName}</span>
              </Link>
            ))}
          </div>
        </div>

        <hr className="separator border-key-background" />

        <p className="support text-xl text-balance">
          Support the game and keep it free, ad-free, and fun for everyone!
        </p>

        <motion.a
          href={BMC_LINK}
          target="_blank"
          className="flex w-fit items-center justify-center gap-2 rounded-xl bg-[#FFDD00] px-4 py-2 text-lg text-[#181818]"
          aria-label="Support"
          whileTap={{ scale: 0.95 }}
        >
          <BuyMeACofeeIcon className="size-5" />
          Buy us a coffee
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
                  {user.displayName || user.email || `${APP_NAME} Player`}
                </div>

                <div className="user-rank relative flex w-fit items-center justify-center gap-2 overflow-hidden px-2">
                  <span>Rank:</span>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundColor: rank.color,
                    }}
                  />
                  <span
                    className="relative text-base font-normal"
                    style={{ color: rank.color }}
                  >
                    {rank.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="controls flex w-full justify-between gap-4">
              <Button
                variant="outline"
                onClick={share}
                className="flex flex-1 items-center gap-2 rounded-xl !px-2 !py-1 normal-case"
                aria-label="Share"
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="size-4" />
                Share
              </Button>
              <Button
                onClick={() => {
                  logout();
                  // Hard page reload
                  window.location.href = window.location.href;
                }}
                className="flex flex-1 items-center gap-2 rounded-xl !px-2 !py-1 normal-case"
                aria-label="Log out"
                whileTap={{ scale: 0.95 }}
              >
                <LogoutIcon className="size-4" />
                Log out
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg">
              Track your game stats by logging in or creating a free account.
            </p>
            <div className="controls flex w-full justify-between gap-4">
              <Button
                variant="outline"
                onClick={share}
                className="flex flex-1 items-center gap-2 rounded-xl !px-2 !py-1 normal-case"
                aria-label="Share"
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="size-4" />
                Share
              </Button>
              <motion.span
                className="bg-button-background text-button-foreground flex-1 cursor-pointer gap-2 rounded-xl !px-2 !py-1 text-center text-[1.06rem] transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  className="flex items-center justify-center gap-2"
                  href={"/login"}
                  onClick={onClose}
                  aria-label="Log in"
                >
                  <UserIcon className="size-4" />
                  Log in
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
