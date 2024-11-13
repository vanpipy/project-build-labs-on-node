import * as React from 'react';
import type { PiletApi } from '@merchant/mui';
import { detectLoginStatus } from '@/pages/Login';

const Login = React.lazy(() => import('@/pages/Login'));

export const setup = async (app: PiletApi) => {
  app.registerPage('/login', Login);
  await detectLoginStatus();
};
