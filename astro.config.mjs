// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // URL pública (Firebase Hosting); se usa para canonical y hreflang. Cámbiala si conectas un dominio propio.
  site: 'https://juandiegodiaz-dev.web.app',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'always' },
});
