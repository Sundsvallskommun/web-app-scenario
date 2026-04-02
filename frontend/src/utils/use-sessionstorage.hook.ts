import {
  PublicScenario,
  PublicScenarioIntroText,
} from '@data-contracts/backend/data-contracts';
import 'dotenv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

interface SessionStorage {
  sessionId: string;
  setSessionId: (id: string) => void;
  webMode: boolean;
  setWebMode: (webMode: boolean) => void;
  pwa: boolean;
  setPwa: (pwa: boolean) => void;
  scenario?: PublicScenario;
  setScenario: (scenario: PublicScenario) => void;
  scenarioIntroTexts: PublicScenarioIntroText[];
  setScenarioIntroTexts: (scenarioIntroTexts: PublicScenarioIntroText[]) => void;
}

export const useSessionStorage = createWithEqualityFn(
  persist<SessionStorage>(
    (set) => ({
      sessionId: '',
      setSessionId: (sessionId) => set(() => ({ sessionId })),
      webMode: false,
      setWebMode: (webMode) => set(() => ({ webMode })),
      pwa: false,
      setPwa: (pwa) => set(() => ({ pwa })),
      scenario: undefined,
      setScenario: (scenario) => set(() => ({ scenario })),
      scenarioIntroTexts: [],
      setScenarioIntroTexts: (scenarioIntroTexts) => set(() => ({ scenarioIntroTexts })),
    }),
    {
      name: `${process.env.NEXT_PUBLIC_APP_NAME}-store`,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
