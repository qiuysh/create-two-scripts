import React from "react";
import { Layout } from "antd";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import UseBar from "./useBar";
import "./style.less";

const { Header } = Layout;


const TopNav = props => {
  const { collapsed = false, changeCollapse } = props;
  const trigger = collapsed ? (
    <MenuFoldOutlined />
  ) : (
    <MenuUnfoldOutlined />
  );
  return (
    <Header className="yux-header">
      <a
        className="trigger"
        onClick={() => changeCollapse(!collapsed)}>
        {trigger}
      </a>
      <UseBar />
    </Header>
  );
};

export default TopNav;
