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
  role: 'app_read' | 'app_admin';
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

export interface UpdateImageDto {
  name?: string;
}
