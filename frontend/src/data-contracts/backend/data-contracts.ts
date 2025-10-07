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

export interface DatesAndId {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface ModelId {
  id: string;
}

export interface ToolAssistant {
  id: string;
  handle: string;
}

export interface UseTools {
  assistants: ToolAssistant[];
}

export interface ModelKwargs {
  temperature?: number | null;
  top_p?: number | null;
}

export interface PaginatedDefaults {
  count: number;
}

export interface PaginatedPermissionsDefaults {
  permissions?: PaginatedPermissionsDefaultsPermissionsEnum[];
  count: number;
}

export interface SecurityClassificationPublic {
  name: string;
  description: string | null;
  security_level: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface WebSearchResultPublic {
  id: string;
  title: string;
  url: string;
}

export interface ConversationRequestDto {
  assistant_id?: string;
  group_chat_id?: string;
  session_id?: string;
  question: string;
  files?: ModelId[];
  stream?: boolean;
  use_tools?: UseTools | null;
  use_web_search?: boolean;
}

export interface FilePublic {
  name: string;
  mimetype: string;
  size: number;
  transcription?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AcceptedFileType {
  mimetype: string;
  size_limit: number;
}

export interface Limit {
  max_files: number;
  max_size: number;
}

export interface FileRestrictions {
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
}

export interface PaginatedResponseFilePublic {
  items: FilePublic[];
  count: number;
}

export interface InfoBlobMetadata {
  url?: string | null;
  title?: string | null;
  embedding_model_id: string;
  size: number;
}

export interface InfoBlobPublicNoText {
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface InfoBlobPublic {
  text: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
}

export interface PaginatedResponseInfoBlobPublicNoText {
  items: InfoBlobPublicNoText[];
  count: number;
}

export interface PaginatedResponseInfoBlobPublic {
  items: InfoBlobPublic[];
  count: number;
}

export interface JobPublic {
  name?: string | null;
  status: JobPublicStatusEnum;
  task: JobPublicTaskEnum;
  result_location?: string | null;
  finished_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface EmbeddingModelPublic {
  name: string;
  family: EmbeddingModelPublicFamilyEnum;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability: EmbeddingModelPublicStabilityEnum;
  hosting: EmbeddingModelPublicHostingEnum;
  description?: string | null;
  org?: EmbeddingModelPublicOrgEnum;
  can_access: boolean;
  is_locked: boolean;
  is_org_enabled: boolean;
  security_classification?: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface TranscriptionModelPublic {
  id: string;
  name: string;
  nickname: string;
  family: TranscriptionModelPublicFamilyEnum;
  is_deprecated: boolean;
  stability: TranscriptionModelPublicStabilityEnum;
  hosting: TranscriptionModelPublicHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  hf_link?: string | null;
  org?: TranscriptionModelPublicOrgEnum;
  can_access?: boolean;
  is_locked?: boolean;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  security_classification?: SecurityClassificationPublic | null;
}

export interface EmbeddingModelPublicLegacy {
  name: string;
  family: EmbeddingModelPublicLegacyFamilyEnum;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability: EmbeddingModelPublicLegacyStabilityEnum;
  hosting: EmbeddingModelPublicLegacyHostingEnum;
  description?: string | null;
  org?: EmbeddingModelPublicLegacyOrgEnum;
  is_org_enabled?: boolean;
  can_access?: boolean;
  is_locked?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CompletionModelSparse {
  name: string;
  nickname: string;
  family: CompletionModelSparseFamilyEnum;
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: CompletionModelSparseStabilityEnum;
  hosting: CompletionModelSparseHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: CompletionModelSparseOrgEnum;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CompletionModel {
  is_org_enabled?: string;
  is_org_default?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname: string;
  family: CompletionModelFamilyEnum;
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: CompletionModelStabilityEnum;
  hosting: CompletionModelHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: CompletionModelOrgEnum;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
}

export interface CompletionModelPublic {
  can_access?: boolean;
  is_locked?: boolean;
  security_classification?: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname: string;
  family: CompletionModelPublicFamilyEnum;
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: CompletionModelPublicStabilityEnum;
  hosting: CompletionModelPublicHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: CompletionModelPublicOrgEnum;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
  is_org_enabled?: string;
  is_org_default?: boolean;
}

export interface InfoBlobAskAssistantPublic {
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  score: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AskResponse {
  session_id: string;
  question: string;
  answer: string;
  files: FilePublic[];
  generated_files: FilePublic[];
  references: InfoBlobAskAssistantPublic[];
  tools: UseTools;
  web_search_references: WebSearchResultPublic[];
  model?: CompletionModelPublic | null;
}

export interface AzureToken {
  token: string;
  region: string;
}

export interface ApiResponseAzureToken {
  data: AzureToken;
  message: string;
}

export enum AdminUserRoleEnum {
  AppRead = 'app_read',
  AppAdmin = 'app_admin',
}

export enum PaginatedPermissionsDefaultsPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum JobPublicStatusEnum {
  InProgress = 'in progress',
  Queued = 'queued',
  Complete = 'complete',
  Failed = 'failed',
  NotFound = 'not found',
}

export enum JobPublicTaskEnum {
  UploadInfoBlob = 'upload_info_blob',
  Transcription = 'transcription',
  Crawl = 'crawl',
  EmbedGroup = 'embed_group',
  CrawlAllWebsites = 'crawl_all_websites',
  RunApp = 'run_app',
  PullConfluenceContent = 'pull_confluence_content',
  PullSharepointContent = 'pull_sharepoint_content',
}

export enum EmbeddingModelPublicFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum EmbeddingModelPublicStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum EmbeddingModelPublicHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum EmbeddingModelPublicOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
  Berget = 'Berget',
}

export enum TranscriptionModelPublicFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum TranscriptionModelPublicStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum TranscriptionModelPublicHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum TranscriptionModelPublicOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
  Berget = 'Berget',
}

export enum EmbeddingModelPublicLegacyFamilyEnum {
  Openai = 'openai',
  MiniLm = 'mini_lm',
  E5 = 'e5',
}

export enum EmbeddingModelPublicLegacyStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum EmbeddingModelPublicLegacyHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum EmbeddingModelPublicLegacyOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
  Berget = 'Berget',
}

export enum CompletionModelSparseFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum CompletionModelSparseStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum CompletionModelSparseHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum CompletionModelSparseOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
  Berget = 'Berget',
}

export enum CompletionModelFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum CompletionModelStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum CompletionModelHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum CompletionModelOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
  Berget = 'Berget',
}

export enum CompletionModelPublicFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum CompletionModelPublicStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum CompletionModelPublicHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum CompletionModelPublicOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
  Berget = 'Berget',
}
