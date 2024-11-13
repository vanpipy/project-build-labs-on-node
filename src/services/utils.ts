import { MERCHANT_TOKEN_KEY } from '@merchant/auth-tools';

export interface CommonResponse<T> {
  code: number;
  data: T;
  msg: string;
  tid: string;
  timestamp: number;
}
export interface CommonPageResponse<T> {
  code: number;
  data: {
    list: T[];
    count: number;
  };
  msg: string;
  tid: string;
  timestamp: number;
}

export const createJWTNoBearer = () => {
  try {
    const token = JSON.parse(window.localStorage.getItem(MERCHANT_TOKEN_KEY));
    return { Authorization: `${token.data}` };
  } catch (_err) {
    return { Authorization: '' };
  }
};

export const getErpCenterBaseUrl = () =>
  process.env.NODE_ENV === 'development' ? '/erp' : 'https://erp-api.xunfeng.cn/erp';
