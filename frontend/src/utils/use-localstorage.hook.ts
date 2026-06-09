import { LocalStorage } from '@interfaces/localstorage.interface';
import { ColorSchemeMode } from '@sk-web-gui/react';
import 'dotenv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useLocalStorage = create(
  persist<LocalStorage>(
    (set) => ({
      colorScheme: ColorSchemeMode.Dark,
      setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
      highcontrast: false,
      setHighContrast: (highcontrast) => set(() => ({ highcontrast })),
      reducedMotion: false,
      setReducedMotion: (reducedMotion) => set(() => ({ reducedMotion })),
    }),
    {
      name: `${process.env.NEXT_PUBLIC_APP_NAME}-store`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
