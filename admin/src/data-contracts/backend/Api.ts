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

import {
  AdminUserApiResponse,
  CreateScenarioDto,
  ImageApiResponse,
  ImageDeleteApiResponse,
  ImagesApiResponse,
  ScenarioApiResponse,
  ScenarioDeleteApiResponse,
  ScenariosApiResponse,
  UpdateImageDto,
  UpdateScenarioDto,
  UserApiResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Index
   * @name IndexControllerIndex
   * @summary Index
   * @request GET:/api/
   */
  indexControllerIndex = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetUser
   * @summary Return current user
   * @request GET:/api/me
   */
  userControllerGetUser = (params: RequestParams = {}) =>
    this.request<UserApiResponse, any>({
      path: `/api/me`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerUp
   * @summary Return health check
   * @request GET:/api/health/up
   */
  healthControllerUp = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/health/up`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin User
   * @name AdminUserControllerGetUser
   * @summary Return current user
   * @request GET:/api/admin/me
   */
  adminUserControllerGetUser = (params: RequestParams = {}) =>
    this.request<AdminUserApiResponse, any>({
      path: `/api/admin/me`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Scenario
   * @name AdminScenarioControllerGetScenarios
   * @summary Get scenarios
   * @request GET:/api/admin/scenarios
   */
  adminScenarioControllerGetScenarios = (params: RequestParams = {}) =>
    this.request<ScenariosApiResponse, any>({
      path: `/api/admin/scenarios`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Scenario
   * @name AdminScenarioControllerCreateScenario
   * @summary Create scenario
   * @request POST:/api/admin/scenarios
   */
  adminScenarioControllerCreateScenario = (data?: CreateScenarioDto, params: RequestParams = {}) =>
    this.request<ScenarioApiResponse, any>({
      path: `/api/admin/scenarios`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Scenario
   * @name AdminScenarioControllerGetScenario
   * @summary Get scenario
   * @request GET:/api/admin/scenarios/{id}
   */
  adminScenarioControllerGetScenario = (id: number, params: RequestParams = {}) =>
    this.request<ScenarioApiResponse, any>({
      path: `/api/admin/scenarios/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Scenario
   * @name AdminScenarioControllerUpdateScenario
   * @summary Update scenario
   * @request PATCH:/api/admin/scenarios/{id}
   */
  adminScenarioControllerUpdateScenario = (id: number, data?: UpdateScenarioDto, params: RequestParams = {}) =>
    this.request<ScenarioApiResponse, any>({
      path: `/api/admin/scenarios/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Scenario
   * @name AdminScenarioControllerDeleteScenario
   * @summary Delete scenario
   * @request DELETE:/api/admin/scenarios/{id}
   */
  adminScenarioControllerDeleteScenario = (id: number, params: RequestParams = {}) =>
    this.request<ScenarioDeleteApiResponse, any>({
      path: `/api/admin/scenarios/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Image
   * @name AdminImageControllerGetImages
   * @summary Get images
   * @request GET:/api/admin/images
   */
  adminImageControllerGetImages = (params: RequestParams = {}) =>
    this.request<ImagesApiResponse, any>({
      path: `/api/admin/images`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Image
   * @name AdminImageControllerCreateImage
   * @summary Create image
   * @request POST:/api/admin/images
   */
  adminImageControllerCreateImage = (
    data: {
      /** @format binary */
      image: File;
    },
    params: RequestParams = {}
  ) =>
    this.request<ImageApiResponse, any>({
      path: `/api/admin/images`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Image
   * @name AdminImageControllerGetImage
   * @summary Get image
   * @request GET:/api/admin/images/{id}
   */
  adminImageControllerGetImage = (id: number, params: RequestParams = {}) =>
    this.request<ImageApiResponse, any>({
      path: `/api/admin/images/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Image
   * @name AdminImageControllerUpdateImage
   * @summary Update image
   * @request PATCH:/api/admin/images/{id}
   */
  adminImageControllerUpdateImage = (id: number, data?: UpdateImageDto, params: RequestParams = {}) =>
    this.request<ImageApiResponse, any>({
      path: `/api/admin/images/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Image
   * @name AdminImageControllerDeleteImage
   * @summary Delete image
   * @request DELETE:/api/admin/images/{id}
   */
  adminImageControllerDeleteImage = (id: number, params: RequestParams = {}) =>
    this.request<ImageDeleteApiResponse, any>({
      path: `/api/admin/images/${id}`,
      method: 'DELETE',
      ...params,
    });
}
