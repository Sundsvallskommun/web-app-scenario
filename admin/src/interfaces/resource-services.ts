import { RequestParams } from '@data-contracts/backend/http-client';

export type ID = string | number;
export type GetOne<TResponse> = (id: number, params?: RequestParams) => TResponse;
export type GetMany<TResponse> = (params?: RequestParams) => TResponse;
export type Create<TData, TResponse> = (data: TData, params?: RequestParams) => TResponse;
export type Update<TData, TResponse> = (id: number, data: TData, params?: RequestParams) => TResponse;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Remove<T = any> = (id: number, params?: RequestParams) => T;
