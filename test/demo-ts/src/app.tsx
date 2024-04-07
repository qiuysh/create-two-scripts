import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, Typography } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import "../public/styles/global.less";

const { Title } = Typography;

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Title style={{textAlign: "center", paddingTop: 200}}>hello world</Title>
  </ConfigProvider>,
  document.getElementById("root")
)

