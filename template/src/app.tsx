/** @format */
import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import RootRouter from "./routers";

const App = hot(() => (
  <ConfigProvider locale={zhCN}>
    <RootRouter />
  </ConfigProvider>
));

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
