/** @format */
import * as React from "react";
import { Result } from "antd";
import { isEqual } from "lodash-es";

interface IStates {
  hasError: boolean;
}
export default class ErrorBoundary extends React.Component<
  any,
  IStates
> {
  state: IStates = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: { location: any }) {
    const { hasError } = this.state;
    const { location } = this.props;
    if (
      hasError &&
      !isEqual(
        location.pathname,
        prevProps.location.pathname,
      )
    ) {
      this.setState({
        hasError: false,
      });
    }
  }

  // componentDidCatch(error: unknown, errorInfo: unknown) {
  // 你同样可以将错误日志上报给服务器
  //   console.log(error, errorInfo);
  // }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <Result
          status="error"
          title="程序出错"
          subTitle="请联系技术支持！"
        />
      );
    }

    return children;
  }
}
