# Wordle Game (PWA)

A web-based Wordle-style game inspired by the NYT Wordle, enhanced with themes, a responsive UI, offline installability (PWA), custom word challenges and multi-language support.

![Screenshot](/public/screenshots/en/desktop.png)

[Play it now](https://poly-wordle.vercel.app/) 🎮

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Contributing](#contributing)
- [Add your own language to the project](#add-your-own-language-to-the-project)
- [Author](#author)

## Overview

This is a playable Wordle-like game built with Next.js and TypeScript. It provides an accessible and polished experience with multiple languages, theme/settings, and offline install support so players can keep playing even without a network connection.

## Features

- 🌐 Multi-language support
- 📦 Installable as a Progressive Web App (PWA) with offline fallback (service worker caching)
- 🎨 Themes and accessibility options (high-contrast, reduced motion)
- 🔗 Create and play custom word challenges (shareable via URL)
- 📊 Game statistics and share options
- 📱 Responsive UI
- ✨ Cool animations and transitions
- ⌨️ Keyboard and touch support

## Tech stack

- Next.js
- React 19
- TypeScript
- Tailwind CSS
- Next-intl (i18n)
- Serwist (service worker / precaching)
- Zustand (state management)
- Firebase (optional features / services)
- Motion (animations)
- Radix UI primitives

## Installation

Prerequisites: Node.js 18+ and npm.

1. Install dependencies

```bash
npm install
```

1. Run the development server

```bash
npm run dev
```

1. Build for production

```bash
npm run build
```

Notes:

- The app uses a service worker (via `serwist`) for offline caching and an offline fallback page. Building the app (`npm run build`) will prepare the service worker precache manifest.
- Language files are under `languages/` (e.g. `languages/en.json`, `languages/fr.json`).

## Contributing

Contributions are welcome. A simple workflow:

1. Fork the repository and create a branch for your change
2. Make changes and keep them focused (one feature / fix per PR)
3. Open a pull request describing the change

Guidelines:

- Keep UI changes responsive and test on mobile and desktop
- If you add new text, add a translation entry in `languages/*.json`
- For large changes, open an issue first to discuss the approach

### Add your own language to the project

Quick steps to add a new locale:

1. Create a new JSON file for text translations in `languages/` (use an existing file as a template like `languages/en.json` -> `languages/xx.json`) and translate all keys.
2. Add your language wordlist in src/wordlists
3. Add the languge/locale to the project's types and constants:
   - add your code to the Languages type (e.g. `types.ts`)
   - add an entry to the `LANGUAGES` constant (e.g. `constants.ts`)
   - update LanguagesMenu component.
4. Add keyboard keys (/src/components/keyboard/keys.ts)
5. Test locally (`npm run dev`) and build (`npm run build`).

Notes:

- Use a consistent locale code (e.g. `es`, `fr`, `de`) and keep translation keys identical across files.
- Update all language files whenever you add new UI strings.

## Author

Repository owner: [EL-OUARDY](https://github.com/EL-OUARDY/)  
Contact: [contact@wadi3.codes](mailto:contact@wadi3.codes)

If you want to report bugs or suggest features, please open an issue in the repo.

---

Thank you for checking out the project — have fun playing!
