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
  safelist: [
    'h-[max(50dvh,200px)]',
    'h-[max(45dvh,200px)]',
    'h-[max(55dvh,200px)]',
    'h-[max(33dvh,200px)]',
    'h-[max(34dvh,200px)]',
    'h-[max(32dvh,200px)]',
    'h-[max(36dvh,200px)]',
    'h-[max(25dvh,200px)]',
    'h-[max(24dvh,200px)]',
    'h-[max(28dvh,200px)]',
  ],
  theme: {
    extend: {
      transitionProperty: {
        opacity: 'opacity',
      },
      height: {
        stretch: 'stretch',
      },
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  presets: [preset()],
} satisfies Config;
