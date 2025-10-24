import { Scenario, ScenarioApiResponse, ScenariosApiResponse } from '../../src/data-contracts/backend/data-contracts';
import { image1, image2 } from './images';

export const scenario1: Scenario = {
  id: 1,
  assistantId: '1234-2345-3456-4567',
  name: 'Scenario 1',
  description: '',
  published: true,
  imageId: 1,
  createdAt: '2025-09-10T14:33:13.035Z',
  updatedAt: '2025-09-18T07:32:02.619Z',
  image: image1,
};

export const scenario2: Scenario = {
  id: 2,
  assistantId: '4234-2345-3456-4567',
  name: 'Scenario 2',
  description: '',
  published: true,
  imageId: 1,
  createdAt: '2025-09-11T14:33:13.035Z',
  updatedAt: '2025-09-16T07:32:02.619Z',
  image: image1,
};

export const scenario3: Scenario = {
  id: 3,
  assistantId: 'f234-2345-3456-4567',
  name: 'Scenario 3',
  description: '',
  published: true,
  imageId: 2,
  createdAt: '2025-09-12T14:33:13.035Z',
  updatedAt: '2025-09-18T07:32:02.619Z',
  image: image2,
};

export const scenario4: Scenario = {
  id: 4,
  assistantId: 'fff4-2345-3456-4567',
  name: 'Scenario 4',
  description: 'Detta är en beskrivning',
  published: true,
  imageId: null,
  createdAt: '2025-09-20T14:33:13.035Z',
  updatedAt: '2025-09-20T14:33:13.035Z',
};

export const oneScenario: ScenarioApiResponse = {
  data: scenario1,
  message: 'success',
};
export const newScenario: ScenarioApiResponse = {
  data: scenario4,
  message: 'success',
};
export const scenarios: ScenariosApiResponse = {
  data: [scenario1, scenario2, scenario3],
  message: 'success',
};
export const scenariosWithNew: ScenariosApiResponse = {
  data: [scenario1, scenario2, scenario3, scenario4],
  message: 'success',
};
