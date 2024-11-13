import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInstance, Piral, createStandardApi } from 'piral';
import { createVue3Api } from 'piral-vue-3';
import { setup } from '@merchant/mui-auth';
import { LayoutSetting } from './components/LayoutSetting';
import { NotFound } from './components/Error';

const instance = createInstance({
  state: {
    components: LayoutSetting,
    errorComponents: {
      not_found: NotFound,
    },
  },
  plugins: [...createStandardApi(), createVue3Api()],
  availablePilets: [
    {
      name: 'merchant-mui-auth',
      version: '0.1.8',
      spec: 'v2',
      link: '',
      dependencies: {},
      basePath: '/',
      config: {},
      setup,
    },
  ],
});

instance.root.registerMenu('wuxia', () => <span />, {
  type: 'general',
  key: '/wuxia/reserved-funding',
  label: '/巽风无叚/买酒备付款',
  priority: 2,
  code: 'goods_center',
});

const root = createRoot(document.querySelector('#app'));

root.render(<Piral instance={instance} />);
