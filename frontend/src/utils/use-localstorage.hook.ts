import { LocalStorage } from '@interfaces/localstorage.interface';
import { ColorSchemeMode } from '@sk-web-gui/react';
import 'dotenv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const getInitialHighContrast = () => {
  if (
    typeof globalThis === 'undefined' ||
    typeof globalThis.matchMedia !== 'function'
  ) {
    return false;
  }

  return (
    globalThis.matchMedia('(prefers-contrast: more)').matches ||
    globalThis.matchMedia('(-ms-high-contrast: active)').matches
  );
};

const getInitialReducedMotion = () => {
  if (
    typeof globalThis === 'undefined' ||
    typeof globalThis.matchMedia !== 'function'
  ) {
    return false;
  }

  return globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useLocalStorage = create(
  persist<LocalStorage>(
    (set) => ({
      colorScheme: ColorSchemeMode.Dark,
      setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
      highcontrast: getInitialHighContrast(),
      setHighContrast: (highcontrast) =>
        set(() => ({ highcontrast, hasManuallySetHighContrast: true })),
      hasManuallySetHighContrast: false,
      reducedMotion: getInitialReducedMotion(),
      setReducedMotion: (reducedMotion) =>
        set(() => ({ reducedMotion, hasManuallySetReducedMotion: true })),
      hasManuallySetReducedMotion: false,
    }),
    {
      merge: (persistedState, currentState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return currentState;
        }

        const storedState = persistedState as Partial<LocalStorage>;
        const hasStoredHighContrast = 'highcontrast' in storedState;
        const hasStoredReducedMotion = 'reducedMotion' in storedState;

        return {
          ...currentState,
          ...storedState,
          hasManuallySetHighContrast:
            storedState.hasManuallySetHighContrast ?? hasStoredHighContrast,
          hasManuallySetReducedMotion:
            storedState.hasManuallySetReducedMotion ?? hasStoredReducedMotion,
        };
      },
      name: `${process.env.NEXT_PUBLIC_APP_NAME}-store`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
