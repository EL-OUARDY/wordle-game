import Line from "@/components/board/Line";
import Button from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import { copyToClipboard } from "@/lib/utils";
import { Share2Icon, Gamepad2Icon } from "lucide-react";

function GameOver() {
  const solution = useStore((s) => s.solution);
  const guesses = useStore((s) => s.guesses);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);

  const isSolved = solution === guesses[currentGuessIndex - 1];

  const newGame = () => {
    alert("NEW GAME");
  };

  const share = async () => {
    const title = document.title;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name !== "AbortError") {
          console.error("Error sharing:", err);
          await copyToClipboard(url);
          alert("Link copied to clipboard!");
        } else if (!(err instanceof DOMException)) {
          console.error("Unexpected error:", err);
        }
      }
    } else {
      await copyToClipboard(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="game-over bg-muted-background border-muted-foreground flex h-[200px] w-full flex-col items-center justify-around rounded-xl border p-2">
      {isSolved ? (
        <>
          <h3 className="text-center text-2xl">Congratulations</h3>

          <p className="max-w-sm text-center text-xl">
            Awesome! Your wordle took <br />
            <span className="font-bold">2 minutes 15 seconds</span>.
          </p>

          <div className="controls flex gap-3">
            <Button
              onClick={share}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Share"
            >
              <Share2Icon className="size-4" />
              Share
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className="flex items-center gap-2"
              aria-label="New game"
            >
              <Gamepad2Icon className="size-4" />
              New Game
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center text-2xl">Not this time!</h3>

          <Line
            lineIndex={currentGuessIndex - 1}
            guess={solution as string}
            className="max-h-[40px] w-[240px] px-[10px] !text-[1.4rem]"
          />

          <p className="max-w-sm text-center text-lg">
            {"No worries, you’ll get it next time."} <br />
          </p>

          <div className="controls flex gap-3">
            <Button
              onClick={share}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Share"
            >
              <Share2Icon className="size-4" />
              Share
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className="flex items-center gap-2"
              aria-label="New game"
            >
              <Gamepad2Icon className="size-4" />
              New Game
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GameOver;
