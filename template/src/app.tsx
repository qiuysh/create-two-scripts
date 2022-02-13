/** @format */
import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import RootRouter from "./routers";

const renderApp = (Component: any) => {
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Component />
    </ConfigProvider>,
    document.getElementById("root")
  )
};

renderApp(RootRouter);

if ((module as any).hot) {
  (module as any).hot.accept(['./routers'], () => {
    const NewRoute = require('./routers').default;
    renderApp(NewRoute)
  })
}
