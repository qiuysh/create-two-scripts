import React, { lazy, Suspense } from "react";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const loading: JSX.Element = (
  <div className="page-loading">
    <LoadingOutlined
      style={{
        fontSize: 72,
      }}
    />
  </div>
);

// 基本布局
import BaseLayout from "./layout";

const Exception = lazy(() => import("./pages"));

// 根路由
const BasicRouter = (): JSX.Element => (
  <Router>
    <BaseLayout>
      <Suspense fallback={loading}>
        <Route
          path="/index"
          exact
          component={Exception}
        />
      </Suspense>
    </BaseLayout>
  </Router>
);

export default BasicRouter;
