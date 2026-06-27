// @ts-check
import { defineConfig } from 'astro/config';
import { transformSync } from 'esbuild';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

function jsxTypeScript() {
  return {
    name: 'jsx-typescript',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.jsx')) {
        return null;
      }

      const result = transformSync(code, {
        loader: 'tsx',
        jsx: 'automatic',
        sourcefile: id,
        sourcemap: true,
      });

      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://symbolbuddy.com',

  vite: {
    plugins: [jsxTypeScript(), tailwindcss()],
  },

  integrations: [react()],
});
