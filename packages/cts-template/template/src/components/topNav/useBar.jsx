import React, { useState, useEffect } from "react";
import { Modal, Avatar, Menu, Switch } from "antd";
import BellOutlined from "@ant-design/icons/BellOutlined";
import "./style.less";

const { confirm } = Modal;

const DEFAULTTHEME = localStorage.getItem("ui-theme-mode") || 'light';

const UseBar= (props) => {
  const [theme, changeThemeMode] = useState(DEFAULTTHEME)

  useEffect(() => {
    applyThemeMode(theme);
  }, [theme])

  function onLogout() {
    confirm({
      title: "注销",
      content: "是否要退出当前账号？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        localStorage.removeItem("token");
      },
      onCancel() { },
    });
  }

  function applyThemeMode(theme) {
    const htmlNode = document.querySelector("html");
    htmlNode.setAttribute(
      "ui-theme-mode",
      theme,
    );
    localStorage.setItem("ui-theme-mode", theme);
  }

  function onChange(checked) {
    const theme = checked ? "light" : "dark";
    changeThemeMode(theme);
  }

  return (
    <Menu className="yux-usebar f-fr">
      <Menu.Item>
        <a className="use-item logout" onClick={onLogout}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="use-item message">
          <BellOutlined />
        </a>
      </Menu.Item>
      <Menu.Item>
        <a className="use-item message">
          <Switch
            size="small"
            onChange={onChange}
            checkedChildren="亮"
            unCheckedChildren="暗"
            checked={theme === 'light'}
          />
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default UseBar;