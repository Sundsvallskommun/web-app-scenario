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
  safelist: ['h-[50%]', 'h-[33%]', 'h-[25%]', 'h-[22%]', 'h-[67%]', 'h-[34%]'],
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
