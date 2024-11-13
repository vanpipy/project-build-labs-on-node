/* eslint-disable */
import { message as antMessage } from 'antd';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios, { AxiosError } from 'axios';
import { createAxiosPostFulfill, createAxiosPostReject } from '@merchant/auth-tools';

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'body' | 'params' | 'path' | 'responseType'> {
  /** 唤起安全控制器 */
  secure?: boolean;
  /** 请求地址 */
  path: string;
  /** 请求数据的媒体类型 */
  type?: ContentType;
  /** 返回数据的格式 (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** 查询参数 */
  query?: QueryParamsType;
  /** 请求荷载 */
  body?: unknown;
  /** 手动控制错误流程 */
  onError?: (err: unknown) => void;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;

  private securityData: SecurityDataType | null = null;

  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];

  private secure?: boolean;

  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      baseURL: axiosConfig.baseURL || '/',
      ...axiosConfig,
    });
    const currentEnv = process.env.NODE_ENV === 'development' ? 'test' : 'prod';
    this.instance.interceptors.response.use(
      createAxiosPostFulfill(currentEnv, '/login'),
      createAxiosPostReject(currentEnv, '/login'),
    );
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    }
    return `${formItem}`;
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    format,
    query,
    body,
    onError,
    ...params
  }: FullRequestParams): Promise<T | void> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.UrlEncoded && body && body !== null) {
      body = new URLSearchParams(body as Record<string, string>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        responseType: responseFormat,
        params: query,
        data: body,
        url: path,
      })
      .then(response => {
        const handleResponse = (response: AxiosResponse<T>): Promise<T | void> => {
          const { code } = (response.data as any) || {};
          if (code !== 0) {
            return Promise.reject(response.data);
          }
          return Promise.resolve(response.data);
        };
        if (Object.prototype.toString.call(response.data).slice(8, -1) === 'Blob') {
          if (response.data.type === ContentType.Json) {
            return (response.data as Blob)
              .text()
              .then(text => {
                const data = JSON.parse(text);
                response.data = data;
                return handleResponse(response);
              })
              .catch(err => Promise.reject(err));
          }
          return Promise.resolve({ headers: response.headers, data: response.data } as T);
        }
        return handleResponse(response);
      })
      .catch((err: unknown) => {
        console.error(err);

        let message = (err as { msg: string })?.msg;

        if (err instanceof AxiosError) {
          const { message: errMsg, msg } = err.response?.data || {};
          message = errMsg || msg;

          if ([401, 403].includes(err.response?.status)) {
            if (typeof onError === 'function') {
              onError?.(err);
              return;
            }
            antMessage.error(message, 2000, () => {
              window.location.replace('/login');
            });
            return;
          }
        }

        message = message ?? '请求失败，请联系管理员处理';

        if (typeof onError === 'function') {
          onError?.(err);
          return;
        }

        antMessage.error(message);

        throw new Error(err as string);
      });
  };
}
