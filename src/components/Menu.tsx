import * as React from 'react';
import { ComponentsState } from 'piral';
import { Menu } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { isArray, split } from 'lodash';
import { getAuthService } from '../services/login.service';

const pickMetas = (childNodes: React.ReactNode[]) => {
  const metas: any[] = [];
  childNodes.forEach((node: any) => {
    const { meta } = node.props || {};
    metas.push(meta);
  });
  return metas;
};

const filterByAuthKeys = (menus: any[], authKeys: string[]) => {
  const result = [];
  let i = 0;
  while (i < menus.length) {
    const menu = menus[i];
    const { code } = menu || {};
    if (authKeys.includes(code)) {
      result.push(menu);
    }
    i += 1;
  }
  return result;
};

const restructMenuItems = (items: any[]) =>
  items.reduce((result: any[], item) => {
    const { key, label } = item;
    const paths = split(key, '/');
    const labels = split(label, '/');
    const [_, one, two, three] = paths;
    const menu = [];
    if (three) {
      menu.push({
        key: `/${one}/${two}/${three}`,
        label: labels[3],
      });
      result.push(menu);
      return result;
    }
    if (two) {
      const root = { key: `/${one}`, label: labels[1] };
      const hasIndex = menu.findIndex((m: any) => m.key === root.key);
      if (hasIndex > -1) {
        const existed = menu[hasIndex];
        if (existed) {
          const { children } = existed;
          (children as Array<any>).push({ key: `/${one}/${two}`, label: labels[2] });
        }
      } else {
        menu.push({
          key: `/${one}`,
          label: labels[1],
          children: [
            {
              key: `/${one}/${two}`,
              label: labels[2],
            },
          ],
        });
      }
      result.push(menu);
      return result;
    }
    if (one) {
      menu.push({ key: `/${one}`, label: labels[1] });
      result.push(menu);
      return result;
    }
    return result;
  }, []);

export const MenuContainer: ComponentsState['MenuContainer'] = props => {
  const { children } = props;
  const [items, setItems] = React.useState([]);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = window.location;
  const selectedKeys = pathname.length > 1 ? [pathname] : [];
  const openKeys = selectedKeys.length > 0 ? [`/${selectedKeys[0].split('/')[1]}`] : [];
  const metas = pickMetas(children as React.ReactNode[]);
  const onClickMenu = (menu: any) => {
    const { key } = menu;
    history.push(key);
  };
  const updateMenu = () => {
    const authService = getAuthService();
    const authKeys = authService.queryAuthKeys();
    let newItems = filterByAuthKeys(metas, authKeys);
    newItems = restructMenuItems(newItems);
    setItems(newItems);
  };
  React.useEffect(() => {
    updateMenu();
  }, [location]);
  return (
    <div className="menu-container">
      <Menu
        style={{ border: 0, paddingInlineStart: 8, paddingBlockStart: 8 }}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={items}
        onClick={onClickMenu}
      />
    </div>
  );
};
