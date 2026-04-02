/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  name: string;
  username: string;
}

export interface UserApiResponse {
  data: User;
  message: string;
}

export interface AdminUser {
  name: string;
  username: string;
  givenName: string;
  surname: string;
  role: AdminUserRoleEnum;
}

export interface AdminUserApiResponse {
  data: AdminUser;
  message: string;
}

export interface CreateScenarioDto {
  name: string;
  assistantId: string;
  description?: string | null;
  published?: boolean;
  imageId?: number | null;
}

export interface UpdateScenarioDto {
  name?: string;
  assistantId?: string;
  description?: string | null;
  published?: boolean;
  imageId?: number | null;
}

export interface CreateScenarioIntroTextDto {
  text: string;
  sortOrder: number;
}

export interface UpdateScenarioIntroTextDto {
  text?: string;
  sortOrder?: number;
}

export interface Image {
  name: string;
  filename: string;
  url: string;
  id: number;
  scenarios?: Scenario[];
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  createdAt: string;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  updatedAt: string;
}

export interface ImagesApiResponse {
  data: Image[];
  message: string;
}

export interface ImageApiResponse {
  data: Image;
  message: string;
}

export interface ImageDeleteApiResponse {
  data: boolean;
  message: string;
}

export interface Scenario {
  id: number;
  name: string;
  description?: string | null;
  assistantId: string;
  imageId: number | null;
  image?: Image;
  published: boolean;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  createdAt: string;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  updatedAt: string;
}

export interface ScenariosApiResponse {
  data: Scenario[];
  message: string;
}

export interface ScenarioApiResponse {
  data: Scenario;
  message: string;
}

export interface ScenarioDeleteApiResponse {
  data: boolean;
  message: string;
}

export interface ScenarioIntroText {
  id: number;
  text: string;
  sortOrder: number;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  createdAt: string;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  updatedAt: string;
}

export interface PublicScenarioIntroText {
  id: number;
  text: string;
  sortOrder: number;
}

export interface ScenarioIntroTextsApiResponse {
  data: ScenarioIntroText[];
  message: string;
}

export interface ScenarioIntroTextApiResponse {
  data: ScenarioIntroText;
  message: string;
}

export interface ScenarioIntroTextDeleteApiResponse {
  data: boolean;
  message: string;
}

export interface PublicScenarioIntroTextsApiResponse {
  data: PublicScenarioIntroText[];
  message: string;
}

export interface UpdateImageDto {
  name?: string;
}

export interface PublicImage {
  url: string;
}

export interface PublicScenario {
  id: number;
  name: string;
  description?: string | null;
  assistantId: string;
  image?: PublicImage;
}

export interface PublicScenariosApiResponse {
  data: PublicScenario[];
  message: string;
}

export interface PublicScenarioApiResponse {
  data: PublicScenario;
  message: string;
}

export interface ConversationRequestDto {
  assistant_id?: string;
  group_chat_id?: string;
  session_id?: string;
  question: string;
  stream?: boolean;
}

export interface AskResponse {
  session_id: string;
  question: string;
  answer: string;
}

export interface AzureToken {
  token: string;
  region: string;
}

export interface ApiResponseAzureToken {
  data: AzureToken;
  message: string;
}

export interface ExternalUser {
  id: number;
  name: string;
  org?: string;
  personNumber: string;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  createdAt: string;
  /** @pattern \d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z? */
  updatedAt: string;
}

export interface ExternalUsersApiResponse {
  data: ExternalUser[];
  message: string;
}

export interface ExternalUserApiResponse {
  data: ExternalUser;
  message: string;
}

export interface ExternalUserDeleteApiResponse {
  data: boolean;
  message: string;
}

export interface CreateExternalUserDto {
  name: string;
  org?: string;
  personNumber: string;
}

export interface UpdateExternalUserDto {
  org?: string;
}

export enum AdminUserRoleEnum {
  AppRead = 'app_read',
  AppAdmin = 'app_admin',
}
