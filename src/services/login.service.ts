import { LoginService as AuthService } from '@merchant/auth-tools';
import { queryCurrentEnv } from '../utils';
import { getErpCenterBaseUrl } from './utils';

const baseURL = getErpCenterBaseUrl();

const LOGIN_PATHNAME = '/login';

const currentEnv = queryCurrentEnv();
const authService = new AuthService({
  env: currentEnv,
  merchantApp: window.origin,
  baseUrl: baseURL,
  loginPagePathname: LOGIN_PATHNAME,
});

export const getAuthService = () => authService;
