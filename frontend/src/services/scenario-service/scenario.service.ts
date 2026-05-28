import {
  PublicScenarioApiResponse,
  PublicScenariosApiResponse,
  PublicScenarioIntroTextsApiResponse,
} from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api-service';

export const getCategoryScenarios: (categoryId: number) => Promise<PublicScenariosApiResponse> = async (categoryId) => {
  return apiService.get<PublicScenariosApiResponse>(`categories/${categoryId}/scenarios`).then((res) => res.data);
};

export const getCategoryScenario: (categoryId: number, id: number) => Promise<PublicScenarioApiResponse> = async (
  categoryId,
  id
) => {
  return apiService.get<PublicScenarioApiResponse>(`categories/${categoryId}/scenarios/${id}`).then((res) => res.data);
};

export const getScenarioIntroTexts: () => Promise<PublicScenarioIntroTextsApiResponse> = async () => {
  return apiService.get<PublicScenarioIntroTextsApiResponse>('scenario-intro-texts').then((res) => res.data);
};
