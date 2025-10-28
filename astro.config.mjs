// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tracker.jailbreakchangelogs.xyz',
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.jailbreakchangelogs.xyz',
      },
    ],
  },
});
