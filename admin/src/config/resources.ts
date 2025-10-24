import { Api } from '@data-contracts/backend/Api';
import {
  CreateScenarioDto,
  Image,
  Scenario,
  UpdateImageDto,
  UpdateScenarioDto,
} from '@data-contracts/backend/data-contracts';
import { Resource } from '@interfaces/resource';

const apiService = new Api({ baseURL: process.env.NEXT_PUBLIC_API_URL, withCredentials: true });

const scenarios: Resource<Scenario, CreateScenarioDto, UpdateScenarioDto> = {
  name: 'scenarios',
  getOne: apiService.adminScenarioControllerGetScenario,
  getMany: apiService.adminScenarioControllerGetScenarios,
  create: apiService.adminScenarioControllerCreateScenario,
  update: apiService.adminScenarioControllerUpdateScenario,
  remove: apiService.adminScenarioControllerDeleteScenario,

  defaultValues: {
    name: '',
    description: '',
    assistantId: '',
    published: false,
  },
  requiredFields: ['name', 'assistantId'],
};

const emptyFile = new File([], '');
const images: Resource<Image, { image: File }, UpdateImageDto> = {
  name: 'images',
  getOne: apiService.adminImageControllerGetImage,
  getMany: apiService.adminImageControllerGetImages,
  create: apiService.adminImageControllerCreateImage,
  update: apiService.adminImageControllerUpdateImage,
  remove: apiService.adminImageControllerDeleteImage,

  defaultValues: {
    image: emptyFile,
  },
  requiredFields: ['image'],
};

const resources = { scenarios, images };

export default resources;
