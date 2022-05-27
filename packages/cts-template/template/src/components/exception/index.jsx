import React from "react";
import { Result, Button } from "antd";


const PageException = props => {
  const { match } = props;
  const { params } = match;
  const resultProps = getExceptionStatus(
    params,
  );
  return <Result {...resultProps} />;
};

function getExceptionStatus(param) {
  const { code } = param;
  const result = {
    status: "404",
    title: "",
    subTitle: "",
    extra: "",
  };
  switch (code) {
    case "404": {
      result.status = code;
      result.title = code;
      result.subTitle = "请求的资源不存在～";
      result.extra = <Button type="link">返回主页</Button>;
      break;
    }
    default:
      result;
  }
  return result;
}

export default PageException;
