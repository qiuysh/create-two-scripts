import React from "react";
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


  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Result
          status="error"
          title="code error"
        />
      );
    }

    return children;
  }
}
