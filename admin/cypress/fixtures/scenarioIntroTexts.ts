import {
  CreateScenarioIntroTextDto,
  ScenarioIntroText,
  ScenarioIntroTextApiResponse,
  ScenarioIntroTextsApiResponse,
} from '../../src/data-contracts/backend/data-contracts';

export const scenarioIntroText1: ScenarioIntroText = {
  id: 1,
  text: '\u00D6vningarna liknar verkliga situationer och visar vilka beslut och konsekvenser som kan uppst\u00E5 vid sv\u00E5ra val.',
  sortOrder: 1,
  createdAt: '2026-03-25T10:00:00.000Z',
  updatedAt: '2026-03-25T10:00:00.000Z',
};

export const scenarioIntroText2: ScenarioIntroText = {
  id: 2,
  text: '\u00C4ven om \u00F6vningarna inte \u00E4r verkliga s\u00E5 liknar de h\u00E4ndelser och utmaningar ungdomar kan st\u00E4llas inf\u00F6r.',
  sortOrder: 2,
  createdAt: '2026-03-25T10:00:00.000Z',
  updatedAt: '2026-03-25T10:00:00.000Z',
};

export const scenarioIntroText3: ScenarioIntroText = {
  id: 3,
  text: 'Vi vet att inneh\u00E5llet kan k\u00E4nnas jobbigt f\u00F6r vissa deltagare.',
  sortOrder: 3,
  createdAt: '2026-03-25T10:00:00.000Z',
  updatedAt: '2026-03-25T10:00:00.000Z',
};

export const newScenarioIntroTextData: CreateScenarioIntroTextDto = {
  text: 'Ny introtext f\u00F6r redakt\u00F6rer.',
  sortOrder: 4,
};

export const newScenarioIntroText: ScenarioIntroTextApiResponse = {
  data: {
    id: 4,
    createdAt: '2026-03-25T10:00:00.000Z',
    updatedAt: '2026-03-25T10:00:00.000Z',
    ...newScenarioIntroTextData,
  },
  message: 'success',
};

export const oneScenarioIntroText: ScenarioIntroTextApiResponse = {
  data: scenarioIntroText1,
  message: 'success',
};

export const scenarioIntroTexts: ScenarioIntroTextsApiResponse = {
  data: [scenarioIntroText1, scenarioIntroText2, scenarioIntroText3],
  message: 'success',
};

export const scenarioIntroTextsWithNew: ScenarioIntroTextsApiResponse = {
  data: [scenarioIntroText1, scenarioIntroText2, scenarioIntroText3, newScenarioIntroText.data],
  message: 'success',
};
