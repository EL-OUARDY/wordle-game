"use client";
import { motion } from "motion/react";
import { APP_NAME, EMAIL } from "../../lib/constants";
export default function Page() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-4 flex w-full max-w-[520px] flex-1 flex-col gap-4 p-4"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Privacy Policy – {APP_NAME}</h1>
        <p className="text-lg">
          At {APP_NAME}, your privacy matters. This page explains how we handle
          your information when you play our game.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <ul className="text-lg">
          <li>
            <span className="underline">Anonymous Players:</span> No personal
            data is collected.
          </li>
          <li>
            <span className="underline">Logged-in Users:</span> Only game
            statistics are collected. Authentication is via Firebase (Google,
            Facebook, or Microsoft), and passwords are never stored.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">2. How We Store Data</h2>
        <ul className="text-lg">
          <li>
            <span className="underline">Game Settings:</span> Saved locally on
            your device using local storage.
          </li>
          <li>
            <span className="underline">User Stats:</span> If you’re logged in,
            your game statistics are saved securely in the cloud via Google
            Firebase.
          </li>
          <li>
            <span className="underline">Analytics:</span> We use Google
            Analytics to understand game usage and improve your experience. No
            personal data is shared.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">3. Cookies</h2>
        <p className="text-lg">We do not use cookies.</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">4. Playing the Game</h2>
        <ul className="text-lg">
          <li>
            <span className="font-semibold">- </span>You can play anonymously
            without creating an account.
          </li>
          <li>
            <span className="font-semibold">- </span>Creating an account lets
            you save stats across devices.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">5. Safety & Security</h2>
        <ul className="text-lg">
          <li>
            <span className="font-semibold">- </span>We do not sell or share
            your personal information.
          </li>
          <li>
            <span className="font-semibold">- </span>Your data is stored
            securely and used only to enhance your gameplay experience.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">6. Children</h2>
        <p className="text-lg">
          {APP_NAME} can be played by any age. No personal data collection from
          children is required unless they log in with an account.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
        <p className="text-lg">
          We may update this policy from time to time. Any changes will be
          posted here.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-lg">
          If you have any questions about this privacy policy or how we handle
          your data, feel free to contact us at:{" "}
          <a href={"mailto:" + EMAIL} className="underline">
            {EMAIL}
          </a>
        </p>
      </div>
    </motion.main>
  );
}
