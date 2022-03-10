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
import "antd/es/";
import "public/styles/global.less";

const { Content } = Layout;

const TITLE: string = "Leekbox workbench";

const contentStyle: { [key: string]: any } = {
  margin: "24px 24px 0",
  minHeight: getViewPortHeight() - 154,
};

const BaseLayout: React.FC<any> = props => {
  const { children, history, location } = props;
  const [collapsed, changeCollapse] =
    useState<boolean>(false);
  const [state, dispatch] = useReducer(
    globalReducer,
    initialState,
  );
  const { menuList } = state as GLOBAL.storeProps;

  useEffect(() => {
    // getMenuList();
  }, []);

  const getMenuList = async () => {
    const res: any = await ajax.getNavigation();
    if (res.result) {
      dispatch({
        type: "global/menus",
        payload: res.data,
      });
    }
  };

  return (
    <>
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
    </>
  );
};
export default withRouter(BaseLayout);
