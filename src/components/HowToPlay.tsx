import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import React from "react";

function HowToPlay() {
  const currentBgColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--tile-background");
  const bgCorrect = getComputedStyle(document.documentElement).getPropertyValue(
    "--correct",
  );
  const bgPresent = getComputedStyle(document.documentElement).getPropertyValue(
    "--present",
  );
  const bgAbsent = getComputedStyle(document.documentElement).getPropertyValue(
    "--absent",
  );
  const textForeground = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--foreground");
  const textTile = getComputedStyle(document.documentElement).getPropertyValue(
    "--tile-foreground",
  );

  const t = useTranslations("HowToPlay");

  return (
    <div className="flex flex-col gap-4 text-lg">
      <div className="border-key-background flex items-center gap-2 border-b pb-4">
        <h2 className="text-2xl font-semibold">{t("title")}</h2>
      </div>
      <p className="text-balance">{t("goal")}</p>
      <div className="text-muted-foreground">
        <p className="mb-2">{t("rule1")}</p>
        <p> {t("rule2")}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-xl font-semibold">{t("examples")}</h3>
          <hr className="separator border-key-background flex-1" />
        </div>
        <div className="guess">
          <div className="line grid w-[220px] flex-1 grid-cols-5 gap-[5px] text-xl">
            {t("correctWord")
              .split("")
              .map((char, index) => {
                return (
                  <motion.div
                    key={index}
                    className="tile bg-tile-background border-key-background flex size-[40px] items-center justify-center border-2 font-black uppercase"
                    animate={
                      index === 0 && {
                        rotateX: [0, -90, 0],
                        backgroundColor: [
                          currentBgColor,
                          currentBgColor,
                          bgCorrect,
                          bgCorrect,
                        ],
                        color: [
                          textForeground,
                          textForeground,
                          textTile,
                          textTile,
                        ],
                        border: [1, 1, 0, 0],
                      }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeIn",
                      delay: 0.2,
                    }}
                  >
                    {char}
                  </motion.div>
                );
              })}
          </div>
          <p className="text-muted-foreground mt-2">
            {t.rich("correctExplanation", {
              letter: (chunks) => (
                <span className="text-foreground font-bold">{chunks}</span>
              ),
            })}
          </p>
        </div>

        <div className="guess">
          <div className="line grid w-[220px] flex-1 grid-cols-5 gap-[5px] text-xl">
            {t("presentWord")
              .split("")
              .map((char, index) => {
                return (
                  <motion.div
                    key={index}
                    className="tile bg-tile-background border-key-background flex size-[40px] items-center justify-center border-2 font-black uppercase"
                    animate={
                      index === 1 && {
                        rotateX: [0, -90, 0],
                        backgroundColor: [
                          currentBgColor,
                          currentBgColor,
                          bgPresent,
                          bgPresent,
                        ],
                        color: [
                          textForeground,
                          textForeground,
                          textTile,
                          textTile,
                        ],
                        border: [1, 1, 0, 0],
                      }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeIn",
                      delay: 0.2,
                    }}
                  >
                    {char}
                  </motion.div>
                );
              })}
          </div>
          <p className="text-muted-foreground mt-2">
            {t.rich("presentExplanation", {
              letter: (chunks) => (
                <span className="text-foreground font-bold">{chunks}</span>
              ),
            })}
          </p>
        </div>

        <div className="guess">
          <div className="line grid w-[220px] flex-1 grid-cols-5 gap-[5px] text-xl">
            {t("absentWord")
              .split("")
              .map((char, index) => {
                return (
                  <motion.div
                    key={index}
                    className="tile bg-tile-background border-key-background flex size-[40px] items-center justify-center border-2 font-black uppercase"
                    animate={
                      index === 2 && {
                        rotateX: [0, -90, 0],
                        backgroundColor: [
                          currentBgColor,
                          currentBgColor,
                          bgAbsent,
                          bgAbsent,
                        ],
                        color: [
                          textForeground,
                          textForeground,
                          textTile,
                          textTile,
                        ],
                        border: [1, 1, 0, 0],
                      }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeIn",
                      delay: 0.2,
                    }}
                  >
                    {char}
                  </motion.div>
                );
              })}
          </div>
          <p className="text-muted-foreground mt-2">
            {t.rich("absentExplanation", {
              letter: (chunks) => (
                <span className="text-foreground font-bold">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
