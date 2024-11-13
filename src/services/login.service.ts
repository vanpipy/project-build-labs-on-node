import { LoginService as AuthService } from '@merchant/auth-tools';
import { memorizeRequestController, queryCurrentEnv } from '@/utils';
import { ContentType, HttpClient, RequestParams } from '@/utils/request';
import { CommonResponse, getErpCenterBaseUrl } from './utils';

export interface LoginServiceSendPhoneCodeParams {
  phone: string;
  vcode: string;
}

export interface UserInfo {
  id: string;
  authKey: string[];
  bindShopCode: string;
  bindShopOrgId: string;
  merchant: Record<string, string>;
  name: string;
  shopList: Record<string, string>[];
  token: string;
}

export class LoginService<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  sendPhoneCode = (data: LoginServiceSendPhoneCodeParams, params: RequestParams = {}) =>
    this.request<CommonResponse<null>>({
      path: '/login/send/sms',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });

  loginWithPhoneCode = (data: LoginServiceSendPhoneCodeParams, params: RequestParams = {}) =>
    this.request<CommonResponse<UserInfo>>({
      path: '/login/sms',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

const baseURL = getErpCenterBaseUrl();

export const createLoginService = memorizeRequestController<LoginService>(
  async () => new LoginService({ baseURL, headers: { 'x-xf-plat': 'xf_pop' } }),
  'LoginService',
);

export const LOGIN_PATHNAME = '/login';

const currentEnv = queryCurrentEnv();
const authService = new AuthService({
  env: currentEnv,
  merchantApp: window.origin,
  baseUrl: baseURL,
  loginPagePathname: LOGIN_PATHNAME,
});

export const getAuthService = () => authService;
