/** @format */

import * as React from "react";
import { Modal, Avatar, Menu, Switch } from "antd";
import BellOutlined from "@ant-design/icons/BellOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import "./style.less";

const { confirm } = Modal;

const UseBar: React.FC<{}> = () => {
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
            defaultChecked
          />
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default UseBar;

function onChange(checked: boolean): void {
  const htmlNode: any = document.querySelector("html");
  htmlNode.setAttribute(
    "ui-theme-mode",
    checked ? "light" : "dark",
  );
}

function onLogout() {
  confirm({
    title: "注销",
    content: "是否要退出当前账号？",
    okText: "确认",
    cancelText: "取消",
    onOk: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
    onCancel() {},
  });
}
