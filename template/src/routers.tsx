import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// 基本布局
import BaseLayout from "./layout";

// 根路由
const BasicRouter = (): JSX.Element => (
  <Router>
    <Switch>
      <BaseLayout>
      </BaseLayout>
    </Switch>
  </Router>
);

export default BasicRouter;
