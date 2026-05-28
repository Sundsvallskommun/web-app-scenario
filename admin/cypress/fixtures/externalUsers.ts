import {
  CategorySummary,
  ExternalUser,
  ExternalUserApiResponse,
  ExternalUsersApiResponse,
} from '../../src/data-contracts/backend/data-contracts';

const category1: CategorySummary = {
  id: 1,
  name: 'Category 1',
  imageId: 1,
};

const category2: CategorySummary = {
  id: 2,
  name: 'Category 2',
  imageId: 2,
};

export const externalUser1: ExternalUser = {
  id: 1,
  name: 'Test Testsson 1',
  org: 'Sundsvalls kommun',
  personNumber: '199001012385',
  categories: [category1],
  createdAt: '2026-01-31T14:33:13.035Z',
  updatedAt: '2026-01-31T07:32:02.619Z',
};

export const externalUser2: ExternalUser = {
  id: 2,
  name: 'Test Testsson 2',
  org: 'Timrå kommun',
  personNumber: '199001012385',
  categories: [],
  createdAt: '2026-02-01T14:33:13.035Z',
  updatedAt: '2025-02-01T07:32:02.619Z',
};

export const externalUser3: ExternalUser = {
  id: 3,
  name: 'Test Testsson 3',
  org: 'Ånge kommun',
  personNumber: '199001012385',
  categories: [category2],
  createdAt: '2026-02-02T14:33:13.035Z',
  updatedAt: '2026-02-02T07:32:02.619Z',
};

export const newExternalUser: ExternalUser = {
  id: 4,
  name: 'Test Testsson 4',
  org: 'Sundsvalls kommun',
  personNumber: '199001012385',
  categories: [category1, category2],
  createdAt: '2026-02-02T14:33:13.035Z',
  updatedAt: '2026-02-02T07:32:02.619Z',
};

export const oneExternalUser: ExternalUserApiResponse = {
  data: externalUser1,
  message: 'success',
};

export const externalUsers: ExternalUsersApiResponse = {
  data: [externalUser1, externalUser2, externalUser3],
  message: 'success',
};

export const externalUsersWithNew: ExternalUsersApiResponse = {
  data: [externalUser1, externalUser2, externalUser3, newExternalUser],
  message: 'success',
};
