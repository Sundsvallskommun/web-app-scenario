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
    'h-[50dvh]',
    'h-[33dvh]',
    'h-[25dvh]',
    'h-[22dvh]',
    'h-[67dvh]',
    'h-[34dvh]',
    'h-[max(50dvh,180px)]',
    'h-[max(33dvh,180px)]',
    'h-[max(25dvh,180px)]',
    'h-[max(22dvh,180px)]',
    'h-[max(67dvh,180px)]',
    'h-[max(34dvh,180px)]',
    'h-[max(50dvh,200px)]',
    'h-[max(33dvh,200px)]',
    'h-[max(25dvh,200px)]',
    'h-[max(22dvh,200px)]',
    'h-[max(67dvh,200px)]',
    'h-[max(34dvh,200px)]',
    'h-[max(50dvh,250px)]',
    'h-[max(33dvh,250px)]',
    'h-[max(25dvh,250px)]',
    'h-[max(22dvh,250px)]',
    'h-[max(67dvh,250px)]',
    'h-[max(34dvh,250px)]',
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
