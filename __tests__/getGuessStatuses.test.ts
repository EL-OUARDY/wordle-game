import { evaluateGuess } from "@/lib/utils";

describe("evaluateGuess", () => {
  it("marks all correct letters when guess matches solution", () => {
    const result = evaluateGuess("HELLO", "HELLO");
    expect(result).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  it("marks all absent letters when nothing matches", () => {
    const result = evaluateGuess("ABCDE", "VWXYZ");
    expect(result).toEqual(["absent", "absent", "absent", "absent", "absent"]);
  });

  it("marks letters as present when they exist elsewhere", () => {
    const result = evaluateGuess("ABCD", "DCBA");
    expect(result).toEqual(["present", "present", "present", "present"]);
  });

  it("handles mix of correct, present, and absent letters", () => {
    const result = evaluateGuess("HELLO", "HOLLY");
    expect(result).toEqual([
      "correct", // H
      "present", // O
      "correct", // L
      "correct", // L
      "absent", // Y
    ]);
  });

  it("handles duplicate letters in solution", () => {
    const result = evaluateGuess("BALLO", "ALLEY");
    expect(result).toEqual([
      "present", // A
      "present", // L
      "correct", // L
      "absent", // E
      "absent", // Y
    ]);
  });

  it("handles duplicate letters in guess", () => {
    const result = evaluateGuess("MAXIM", "MAMMA");
    expect(result).toEqual([
      "correct", // M
      "correct", // A
      "present", // M
      "absent", // M
      "absent", // A
    ]);
  });

  it("handles duplicate letters in guess 2", () => {
    const result = evaluateGuess("BANAL", "LLAMA");
    expect(result).toEqual([
      "present", // L
      "absent", // L
      "present", // A
      "absent", // M
      "present", // A
    ]);
  });

  it("handles guess with all letters correct but repeated in solution", () => {
    const result = evaluateGuess("LEVEL", "LEVER");
    expect(result).toEqual([
      "correct", // L
      "correct", // E
      "correct", // V
      "correct", // E
      "absent", // R
    ]);
  });

  it("handles empty string inputs", () => {
    const result = evaluateGuess("", "");
    expect(result).toEqual([]);
  });

  it("handles guess is empty", () => {
    const result = evaluateGuess("HELLO", "");
    expect(result).toEqual([]);
  });
});
