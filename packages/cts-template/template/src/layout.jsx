import React, {
  useState,
  useEffect,
  useReducer,
} from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import classnames from "classnames";
import TopNav from "@/components/topNav";
import SiderMenu from "@/components/siderMenu";
import Footer from "@/components/footer";
import ErrorBoundary from "@/components/errorBoundary";
import { getViewPortHeight } from "@/utils/util";
import { initialState, globalReducer } from "./stores";
import * as ajax from "./services";
import "public/styles/global.less";

const { Content } = Layout;

const TITLE = "create two";

const contentStyle = {
  margin: "1.7143rem 1.7143rem 0",
  minHeight: getViewPortHeight() - 154,
};

const BaseLayout = props => {
  const { children, history, location } = props;
  const [collapsed, changeCollapse] =
    useState(false);
  const [state, dispatch] = useReducer(
    globalReducer,
    initialState,
  );
  const { menuList } = state;

  useEffect(() => {
    // getMenuList();
  }, []);

  const getMenuList = async () => {
    const res = await ajax.getNavigation();
    if (res.code) {
      dispatch({
        type: "global/menus",
        payload: res.data,
      });
    }
  };

  return (
    <DocumentTitle title={TITLE}>
      <Layout
        className={classnames("", {
          "layout-fixed": true,
        })}>
        <SiderMenu
          collapsed={collapsed}
          history={history}
          menuList={menuList}
        />
        <Layout className="yux-content">
          <TopNav
            collapsed={collapsed}
            changeCollapse={changeCollapse}
          />
          <Content style={contentStyle}>
            <ErrorBoundary location={location}>
              {children}
            </ErrorBoundary>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </DocumentTitle>
  );
};
export default withRouter(BaseLayout);
