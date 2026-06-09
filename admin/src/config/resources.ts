import { Api } from '@data-contracts/backend/Api';
import {
  Category,
  CreateCategoryDto,
  CreateExternalUserDto,
  CreateScenarioDto,
  CreateScenarioIntroTextDto,
  ExternalUser,
  Image,
  Scenario,
  ScenarioIntroText,
  UpdateCategoryDto,
  UpdateExternalUserDto,
  UpdateImageDto,
  UpdateScenarioDto,
  UpdateScenarioIntroTextDto,
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
    categoryId: null,
  },
  requiredFields: ['name', 'assistantId'],
};

const categories: Resource<Category, CreateCategoryDto, UpdateCategoryDto> = {
  name: 'categories',
  getOne: apiService.adminCategoryControllerGetCategory,
  getMany: apiService.adminCategoryControllerGetCategories,
  create: apiService.adminCategoryControllerCreateCategory,
  update: apiService.adminCategoryControllerUpdateCategory,
  remove: apiService.adminCategoryControllerDeleteCategory,

  defaultValues: {
    name: '',
    imageId: null,
    adGroups: [],
  },
  requiredFields: ['name'],
};

const scenarioIntroTexts: Resource<ScenarioIntroText, CreateScenarioIntroTextDto, UpdateScenarioIntroTextDto> = {
  name: 'scenarioIntroTexts',
  getOne: apiService.adminScenarioIntroTextControllerGetScenarioIntroText,
  getMany: apiService.adminScenarioIntroTextControllerGetScenarioIntroTexts,
  create: apiService.adminScenarioIntroTextControllerCreateScenarioIntroText,
  update: apiService.adminScenarioIntroTextControllerUpdateScenarioIntroText,
  remove: apiService.adminScenarioIntroTextControllerDeleteScenarioIntroText,

  defaultValues: {
    text: '',
    sortOrder: 1,
  },
  requiredFields: ['text', 'sortOrder'],
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

const externalUsers: Resource<ExternalUser, CreateExternalUserDto, UpdateExternalUserDto> = {
  name: 'externalUsers',
  getOne: apiService.adminExternalUserControllerGetExternalUser,
  getMany: apiService.adminExternalUserControllerGetExternalUsers,
  create: apiService.adminExternalUserControllerAddExternalUser,
  update: apiService.adminExternalUserControllerUpdateExternalUser,
  remove: apiService.adminExternalUserControllerDeleteExternalUser,

  defaultValues: {
    name: '',
    org: '',
    personNumber: '',
    categoryIds: [],
  },
  requiredFields: ['name', 'personNumber'],
};

const resources = { scenarios, categories, scenarioIntroTexts, images, externalUsers };

export default resources;
