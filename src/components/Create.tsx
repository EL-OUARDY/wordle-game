"use client";
import Button from "@/components/ui/button";
import Check from "@/components/ui/icons/check";
import Copy from "@/components/ui/icons/copy";
import LoaderIcon from "@/components/ui/icons/loader";
import LogoIcon from "@/components/ui/icons/logo";
import useStore from "@/hooks/useStore";
import { WORD_LENGTH } from "@/lib/constants";
import { isValidWord, sleep } from "@/lib/utils";
import CreateService from "@/services/create";
import { Language } from "@/types";
import clsx from "clsx";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

function Create() {
  const language = useStore((s) => s.language);
  const [word, setWord] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [wordId, setWordId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);

  const t = useTranslations("CreateWordle");

  const create = async () => {
    if (isLoading) return;
    if (!isValidWord(word)) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 600);
      return;
    }

    setIsLoading(true);

    // Add a bit of delay
    await sleep(3000);

    const wordId = await CreateService.createCustomWord(
      word.toLowerCase(),
      language as Language,
      name,
    );
    if (wordId) {
      setWordId(wordId);
    }

    setIsLoading(false);
  };

  return (
    <div className="custom-wordle">
      {!wordId ? (
        <div className="create-form flex flex-col gap-4">
          <h3 className="border-key-background border-b pb-4 text-2xl font-semibold">
            {t("creation.title")}
          </h3>
          <p className="support text-xl">{t("creation.description")}</p>

          <div className="bg-tile-background border-key-background flex flex-col gap-4 rounded-xl border p-4">
            <motion.input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              type="text"
              className="border-key-background bg-background placeholder:text-key-background rounded-xl border px-2 py-2 text-center text-lg font-semibold tracking-wider uppercase placeholder:tracking-normal"
              // placeholder={`Your ${WORD_LENGTH}-letter word`}
              placeholder={t("creation.inputWordPlaceholder", {
                wordLength: 5,
              })}
              maxLength={5}
              animate={
                isInvalid && {
                  x: [0, -1, 2, -5, 5, -5, 5, -1, 0],
                  transition: { duration: 0.6, ease: "easeOut" },
                }
              }
              key={String(isInvalid)}
              disabled={isLoading}
            />

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border-key-background bg-background placeholder:text-key-background rounded-xl border px-2 py-2 text-center text-lg font-semibold tracking-wider capitalize placeholder:tracking-normal"
              placeholder={t("creation.inputNamePlaceholder")}
              disabled={isLoading}
              maxLength={30}
            />

            <Button
              onClick={create}
              variant="default"
              className={clsx(
                isLoading && "text-key-background",
                "flex items-center gap-2 !rounded-xl !py-3 !text-lg",
              )}
              aria-label={t("creation.buttonDefault")}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-5" />
              ) : (
                <LogoIcon className="size-5" />
              )}
              {isLoading
                ? t("creation.buttonLoading")
                : t("creation.buttonDefault")}
            </Button>
          </div>

          <hr className="separator border-key-background" />
        </div>
      ) : (
        <div className="word-created flex flex-col gap-4">
          <p className="support mt-4 text-center text-2xl">
            {t("ready.title")}
          </p>
          <div className="bg-tile-background border-key-background flex flex-col gap-4 rounded-xl border p-4">
            {/* Word reveal */}
            <div className="mx-auto w-[240px] overflow-hidden">
              <div className="line grid flex-1 grid-cols-5 gap-[5px] px-[10px] text-[1.4rem]">
                {word.split("").map((char, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="bg-correct text-tile-foreground tile flex size-[40px] items-center justify-center font-black uppercase"
                      initial={{ y: 40, opacity: 0.8 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: index * 0.1,
                      }}
                    >
                      {char}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <input
              value={`${window.location.origin}/${language?.toLowerCase()}?w=${wordId}`}
              type="text"
              className="border-key-background bg-background rounded-xl border px-4 py-2 text-lg tracking-wider"
              readOnly
            />

            <Button
              onClick={() => {
                const link = `${window.location.origin}/${language?.toLowerCase()}?w=${wordId}`;
                navigator.clipboard.writeText(link as string);
                setIsLinkCopied(true);
                setTimeout(() => setIsLinkCopied(false), 2000);
              }}
              variant="default"
              className={clsx(
                isLoading && "text-key-background",
                "flex items-center gap-2 !rounded-xl !py-3 !text-lg tracking-wider",
              )}
              aria-label="Copy Link"
              whileTap={{ scale: 0.95 }}
            >
              {!isLinkCopied ? (
                <Copy className="size-5" />
              ) : (
                <Check className="size-5" />
              )}
              {!isLinkCopied
                ? t("ready.copyButtonDefault")
                : t("ready.copyButtonSuccess")}
            </Button>
          </div>
          <hr className="separator border-key-background" />
        </div>
      )}
    </div>
  );
}

export default Create;
