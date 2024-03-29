import React, { lazy, Suspense } from "react";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const loading = (
  <div className="page-loading">
    <LoadingOutlined
      style={{
        fontSize: 72,
      }}
    />
  </div>
);

import BaseLayout from "./layout";

const Guide = lazy(() => import("./pages"));

const BasicRouter = () => (
  <Router>
    <BaseLayout>
      <Suspense fallback={loading}>
        <Route
          path="/index"
          exact
          component={(props) => <Guide {...props} />}
        />
      </Suspense>
    </BaseLayout>
  </Router>
);

export default BasicRouter;
