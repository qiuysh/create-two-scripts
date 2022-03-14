import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import RootRouter from "./routers";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <RootRouter />
  </ConfigProvider>,
  document.getElementById("root")
)

