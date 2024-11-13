import * as React from 'react';
import { ComponentsState, SwitchErrorInfo } from 'piral';
import { Link } from 'react-router-dom';
import { Result } from 'antd';

export const ErrorInfo: ComponentsState['ErrorInfo'] = props => (
  <div className="window-error-info">
    <SwitchErrorInfo {...props} />
  </div>
);

export const NotFound = () => (
  <div>
    <Result
      status="404"
      title="404"
      subTitle="您访问的页面不存在"
      extra={
        <p>
          返回 <Link to="/">主页</Link>.
        </p>
      }
    />
  </div>
);
