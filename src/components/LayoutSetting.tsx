import * as React from 'react';
import { ComponentsState } from 'piral';
import WindowLayout from './WindowLayout';
import { MenuContainer } from './Menu';
import { ErrorInfo } from './Error';

const DashboardContainer: ComponentsState['DashboardContainer'] = ({ children }) => (
  <div className="dashboard-container">{children}</div>
);

const LoadingIndicator: ComponentsState['LoadingIndicator'] = () => <div className="loading-indicator">loading</div>;

export const LayoutSetting: Partial<ComponentsState> = {
  Layout: WindowLayout,
  DashboardContainer,
  MenuContainer,
  LoadingIndicator,
  ErrorInfo,
};
