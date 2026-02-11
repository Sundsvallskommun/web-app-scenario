import { preset } from '@sk-web-gui/core';
import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/services/**/*.{js,ts,jsx,tsx}',
    './node_modules/@sk-web-gui/*/dist/**/*.js',
  ],
  theme: {
    extend: {
      transitionProperty: {
        opacity: 'opacity',
      },
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  presets: [preset()],
} satisfies Config;
