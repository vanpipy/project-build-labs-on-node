import * as React from 'react';
import { ComponentsState, ExtensionSlot, Menu } from 'piral';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const WindowLayout: ComponentsState['Layout'] = ({ children }) => {
  const fullscreenPaths = ['/login'];
  const { pathname } = window.location;
  if (fullscreenPaths.includes(pathname)) {
    return <div>{children}</div>;
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="window-layout">
        <Layout.Sider className="window-layout__menu" width={220}>
          <Menu type="general" />
        </Layout.Sider>
        <Layout className="window-layout__content" style={{ marginInlineStart: 220 }}>
          <Layout.Header className="window-layout__header">
            <img
              alt="巽风"
              src="https://yewuzhongtai-test-cdn.xunfeng.cn/bucket_yewuzhongtai-test/platform-gateway/universal/1854051127250341889/logo.png"
              className="w-[28px] h-[28px]"
            />
            <div className="window-layout__header-addon">
              <ExtensionSlot
                name="layout-header-addon"
                render={nodes => React.createElement('div', {}, nodes[nodes.length - 1])}
              />
            </div>
          </Layout.Header>
          <Layout.Header className="window-layout__header window-layout__header--empty" />
          <Layout>
            <Layout.Content className="window-layout__container">{children}</Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default WindowLayout;
