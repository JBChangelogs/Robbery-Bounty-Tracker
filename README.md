![Logo](https://assets.jailbreakchangelogs.xyz/assets/logos/JBCL_Long_Game_Background.png)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jailbreakchangelogs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](./LICENSE)
[![Discord](https://img.shields.io/discord/1286064050135896064?logo=discord&logoColor=white&label=discord&color=4d3dff)](https://discord.jailbreakchangelogs.xyz)
[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v3/monitor/1ofdv.svg)](https://status.jailbreakchangelogs.xyz)

> [!CAUTION]
> The only website associated with this repository is [tracker.jailbreakchangelogs.xyz](https://tracker.jailbreakchangelogs.xyz). Any other websites or platforms claiming to represent or provide content for this repo are not controlled by us.

> [!NOTE]
> This is a fan-made project operated by Jailbreak Changelogs LLC and is not affiliated with or endorsed by Badimo - the development team behind Roblox Jailbreak.

# Jailbreak Changelogs Tracker Notice

This repository now serves a deprecation notice page.

Server launching and direct Roblox deep-link joining have moved to the main website:
- https://jailbreakchangelogs.xyz/robberies
- https://jailbreakchangelogs.xyz/bounties

Users should refresh those pages to receive the latest join button updates.

## Tech Stack

- Astro v5.15.1
- Bun
- TypeScript (strict mode)

## Project Structure

```
/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Logo.astro      # Logo with fallback
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro    # Base HTML structure
│   ├── pages/              # Routes
│   │   └── index.astro     # Deprecation/migration page
│   └── styles/             # Global styles
│       └── global.css      # All CSS styling
├── public/                 # Static assets
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Setup

```bash
bun install
bun run dev
```

Open `http://localhost:4321`

## Usage

Visit the deployed page to view the migration/deprecation notice and the links to the main website trackers.

## Behavior

- The site shows a deprecation notice and links users to:
  - `https://jailbreakchangelogs.xyz/robberies`
  - `https://jailbreakchangelogs.xyz/bounties`
- URLs with query parameters are redirected to `/` so old deep-link URLs cannot be used here.

## Build

```bash
bun run build
```

Output in `dist/` - deploy to Cloudflare Pages, Vercel, Netlify, etc.

## Credits

Main tracking and join experience now lives on the main Jailbreak Changelogs website.
