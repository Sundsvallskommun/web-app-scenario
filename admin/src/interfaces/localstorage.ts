import { ColorSchemeMode } from '@sk-web-gui/react';
import { ResourceName } from './resource-name';

export type TableProperty = string;

export type Headers = Partial<Record<ResourceName, Array<TableProperty>>>;

export interface DataStorage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>[];
  loaded: boolean;
  loading: boolean;
}

export type ResourceData = Partial<Record<ResourceName, DataStorage>>;

export interface LocalStorage {
  colorScheme: ColorSchemeMode;
  setColorScheme: (color: ColorSchemeMode) => void;
  headers: Headers;
  setHeaders: (headers: Headers) => void;
  resourceData: ResourceData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: (resource: ResourceName, data: Record<string, any>[]) => void;
  setLoaded: (resource: ResourceName, loaded: boolean) => void;
  setLoading: (resource: ResourceName, loading: boolean) => void;
}
