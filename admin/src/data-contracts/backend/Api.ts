/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
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
  ApiResponseAzureToken,
  AskResponse,
  ConversationRequestDto,
  CreateExternalUserDto,
  CreateScenarioDto,
  ExternalUserApiResponse,
  ExternalUserDeleteApiResponse,
  ExternalUsersApiResponse,
  ImageApiResponse,
  ImageDeleteApiResponse,
  ImagesApiResponse,
  PublicScenarioApiResponse,
  PublicScenariosApiResponse,
  ScenarioApiResponse,
  ScenarioDeleteApiResponse,
  ScenariosApiResponse,
  UpdateExternalUserDto,
  UpdateImageDto,
  UpdateScenarioDto,
  UserApiResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
      method: "GET",
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
      method: "GET",
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
      method: "GET",
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
      method: "GET",
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
      method: "GET",
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
  adminScenarioControllerCreateScenario = (
    data?: CreateScenarioDto,
    params: RequestParams = {},
  ) =>
    this.request<ScenarioApiResponse, any>({
      path: `/api/admin/scenarios`,
      method: "POST",
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
  adminScenarioControllerGetScenario = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<ScenarioApiResponse, any>({
      path: `/api/admin/scenarios/${id}`,
      method: "GET",
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
  adminScenarioControllerUpdateScenario = (
    id: number,
    data?: UpdateScenarioDto,
    params: RequestParams = {},
  ) =>
    this.request<ScenarioApiResponse, any>({
      path: `/api/admin/scenarios/${id}`,
      method: "PATCH",
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
  adminScenarioControllerDeleteScenario = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<ScenarioDeleteApiResponse, any>({
      path: `/api/admin/scenarios/${id}`,
      method: "DELETE",
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
      method: "GET",
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
    params: RequestParams = {},
  ) =>
    this.request<ImageApiResponse, any>({
      path: `/api/admin/images`,
      method: "POST",
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
      method: "GET",
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
  adminImageControllerUpdateImage = (
    id: number,
    data?: UpdateImageDto,
    params: RequestParams = {},
  ) =>
    this.request<ImageApiResponse, any>({
      path: `/api/admin/images/${id}`,
      method: "PATCH",
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
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Scenario
   * @name ScenarioControllerGetScenarios
   * @summary Get scenarios
   * @request GET:/api/scenarios
   */
  scenarioControllerGetScenarios = (params: RequestParams = {}) =>
    this.request<PublicScenariosApiResponse, any>({
      path: `/api/scenarios`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Scenario
   * @name ScenarioControllerGetScenario
   * @summary Get scenario
   * @request GET:/api/scenarios/{id}
   */
  scenarioControllerGetScenario = (id: number, params: RequestParams = {}) =>
    this.request<PublicScenarioApiResponse, any>({
      path: `/api/scenarios/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Provide either an assistant_id or a group_chat_id to start a new conversation with an assistant or group chat. Provide session_id to continue a conversation.
   *
   * @tags Conversation
   * @name ConversationControllerConversation
   * @summary Chat with an assistant or group chat
   * @request POST:/api/conversations
   */
  conversationControllerConversation = (
    data?: ConversationRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AskResponse, any>({
      path: `/api/conversations`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Azure
   * @name AzureControllerGetAzureToken
   * @summary Get auth token for Azure Speech services
   * @request GET:/api/azure/login
   */
  azureControllerGetAzureToken = (params: RequestParams = {}) =>
    this.request<ApiResponseAzureToken, any>({
      path: `/api/azure/login`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin External User
   * @name AdminExternalUserControllerGetExternalUsers
   * @summary Get external users
   * @request GET:/api/admin/external-users
   */
  adminExternalUserControllerGetExternalUsers = (params: RequestParams = {}) =>
    this.request<ExternalUsersApiResponse, any>({
      path: `/api/admin/external-users`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin External User
   * @name AdminExternalUserControllerGetExternalUser
   * @summary Get external user
   * @request GET:/api/admin/external-user/{id}
   */
  adminExternalUserControllerGetExternalUser = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<ExternalUserApiResponse, any>({
      path: `/api/admin/external-user/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin External User
   * @name AdminExternalUserControllerUpdateExternalUser
   * @summary Update external user
   * @request PATCH:/api/admin/external-user/{id}
   */
  adminExternalUserControllerUpdateExternalUser = (
    id: number,
    data?: UpdateExternalUserDto,
    params: RequestParams = {},
  ) =>
    this.request<ExternalUserApiResponse, any>({
      path: `/api/admin/external-user/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin External User
   * @name AdminExternalUserControllerDeleteExternalUser
   * @summary Delete external user
   * @request DELETE:/api/admin/external-user/{id}
   */
  adminExternalUserControllerDeleteExternalUser = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<ExternalUserDeleteApiResponse, any>({
      path: `/api/admin/external-user/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin External User
   * @name AdminExternalUserControllerAddExternalUser
   * @summary Add external user
   * @request POST:/api/admin/external-user
   */
  adminExternalUserControllerAddExternalUser = (
    data?: CreateExternalUserDto,
    params: RequestParams = {},
  ) =>
    this.request<ExternalUserApiResponse, any>({
      path: `/api/admin/external-user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
