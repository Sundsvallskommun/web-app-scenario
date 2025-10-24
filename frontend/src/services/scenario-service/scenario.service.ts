import {
  PublicScenarioApiResponse,
  PublicScenariosApiResponse,
} from '@data-contracts/backend/data-contracts';
import { apiService } from '@services/api-service';

export const getScenarios: () => Promise<PublicScenariosApiResponse> =
  async () => {
    return apiService
      .get<PublicScenariosApiResponse>('scenarios')
      .then((res) => res.data);
  };

export const getScenario: (
  id: number
) => Promise<PublicScenarioApiResponse> = async (id) => {
  return apiService
    .get<PublicScenarioApiResponse>(`scenarios/${id}`)
    .then((res) => res.data);
};
