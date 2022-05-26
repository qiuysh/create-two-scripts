import React, { useEffect } from "react";
import { Menu, Layout } from "antd";
import DotChartOutlined from "@ant-design/icons/DotChartOutlined";
import Logo from "./logo";
import "./style";

const { Sider } = Layout;

const SiderMenu = props => {
  const { history, collapsed, menuList } = props;
  const { location, push } = history;
  const { pathname } = location;
  const [activeKey, setActive] = React.useState("");

  useEffect(() => {
    initialActiveKey();
  }, []);

  // 初始化
  const initialActiveKey = () => {
    if (menuList && menuList.length) {
      const firstActiveMenu =
        pathname === "/"
          ? menuList[0]
          : {
            code: pathname.replace("/", ""),
          };
      setActive(firstActiveMenu.code);
    }
  };

  const handleClick = (e) => {
    const { key } = e;
    const targetMenu =
      menuList.find((o) => key === o.code) || null;
    if (targetMenu && targetMenu.url) {
      setActive(key);
      push(targetMenu.url);
    }
  };

  return (
    <Sider
      className="yux-sider"
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <Logo collapsed={collapsed} />
      <Menu
        mode="inline"
        data-testid="test-sider-nav"
        onClick={handleClick}
        selectedKeys={[activeKey]}>
        {menuList.map(
          (item) => {
            return (
              <Menu.Item key={item.code}>
                <DotChartOutlined />
                <span>{item.name}</span>
              </Menu.Item>
            );
          },
        )}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
