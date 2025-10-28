# Jailbreak Changelogs Server Joiner

Web app for joining specific Roblox Jailbreak servers via deep links.

## Tech Stack

- Astro v5.15.1
- Bun
- TypeScript (strict mode)

## Project Structure

```
/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Logo.astro      # Logo with fallback
│   │   └── LoadingState.astro  # Loading UI
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro    # Base HTML structure
│   ├── pages/              # Routes
│   │   └── index.astro     # Main page
│   ├── scripts/            # Client-side logic
│   │   └── server-joiner.ts    # Server joining logic
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

```
/?jobid=YOUR_JOB_ID
```

Example: `/?jobid=23fb286f-7b40-438a-ba1c-85dd1b632649`

## Configuration

**Background images** - Random 1-30 from `src/pages/index.astro`:
```typescript
const randomBg = Math.floor(Math.random() * 30) + 1;
```

**Place ID** - Change in `src/scripts/server-joiner.ts`:
```typescript
const PLACE_ID = '606849621'; // Roblox Jailbreak Place ID
```

## Build

```bash
bun run build
```

Output in `dist/` - deploy to Cloudflare Pages, Vercel, Netlify, etc.

## Credits

Server joining functionality based on work by [linsonder6](https://github.com/linsonder6/)
