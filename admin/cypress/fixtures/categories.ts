import { CategoriesApiResponse, Category, CategoryApiResponse } from '../../src/data-contracts/backend/data-contracts';
import { image1, image2 } from './images';

export const category1: Category = {
  id: 1,
  name: 'Category 1',
  imageId: 1,
  image: image1,
  adGroups: ['group-a', 'group-b'],
  createdAt: '2025-09-10T14:24:46.527Z',
  updatedAt: '2025-09-20T14:24:46.527Z',
};

export const category2: Category = {
  id: 2,
  name: 'Category 2',
  imageId: 2,
  image: image2,
  adGroups: ['group-c'],
  createdAt: '2025-09-11T14:24:46.527Z',
  updatedAt: '2025-09-16T14:24:46.527Z',
};

export const category3: Category = {
  id: 3,
  name: 'Category 3',
  imageId: null,
  adGroups: [],
  createdAt: '2025-09-12T14:24:46.527Z',
  updatedAt: '2025-09-18T14:24:46.527Z',
};

export const category4: Category = {
  id: 4,
  name: 'Category 4',
  imageId: null,
  adGroups: ['group-d'],
  createdAt: '2025-09-22T14:24:46.527Z',
  updatedAt: '2025-09-22T14:24:46.527Z',
};

export const oneCategory: CategoryApiResponse = {
  message: 'success',
  data: category1,
};

export const newCategory: CategoryApiResponse = {
  message: 'success',
  data: category4,
};

export const categories: CategoriesApiResponse = {
  data: [category1, category2, category3],
  message: 'success',
};

export const categoriesWithNew: CategoriesApiResponse = {
  data: [category1, category2, category3, category4],
  message: 'success',
};
