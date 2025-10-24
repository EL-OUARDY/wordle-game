import { motion } from "motion/react";
import React from "react";

function HowToPlay() {
  const currentBgColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--background");
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

  console.log(currentBgColor, bgCorrect);

  return (
    <div className="flex flex-col gap-4 text-lg">
      <p className="text-balance">
        Your goal is to discover the hidden 5-letter word within 6 attempts.
      </p>
      <div className="text-muted-foreground">
        <p className="mb-2">
          • Each guess you make must be a valid 5-letter word.
        </p>
        <p>• Tile colors show how close your guess is to the answer.</p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Examples</h3>

        <div className="guess">
          <div className="line grid w-[220px] flex-1 grid-cols-5 gap-[5px] text-xl">
            {"stone".split("").map((char, index) => {
              return (
                <motion.div
                  key={index}
                  className="tile border-key-background flex size-[40px] items-center justify-center border-2 font-black uppercase"
                  animate={
                    char === "s" && {
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
            <span className="text-foreground font-bold">S</span> is in the word
            and in the correct spot.
          </p>
        </div>

        <div className="guess">
          <div className="line grid w-[220px] flex-1 grid-cols-5 gap-[5px] text-xl">
            {"blink".split("").map((char, index) => {
              return (
                <motion.div
                  key={index}
                  className="tile border-key-background flex size-[40px] items-center justify-center border-2 font-black uppercase"
                  animate={
                    char === "l" && {
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
            <span className="text-foreground font-bold">L</span> is in the word
            but in the wrong spot.
          </p>
        </div>

        <div className="guess">
          <div className="line xl grid w-[220px] flex-1 grid-cols-5 gap-[5px]">
            {"crane".split("").map((char, index) => {
              return (
                <motion.div
                  key={index}
                  className="tile border-key-background flex size-[40px] items-center justify-center border-2 font-black uppercase"
                  animate={
                    char === "a" && {
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
            <span className="text-foreground font-bold">A</span> is not in the
            word in any spot.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
