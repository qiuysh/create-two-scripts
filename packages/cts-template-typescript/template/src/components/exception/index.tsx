import React from "react";
import { Result, Button } from "antd";
import { ResultProps } from "antd/lib/result";

type IMatchParamsProps = {
  code?: string | undefined;
  [key: string]: any;
};

type IMatchProps = {
  isExact: boolean;
  params: IMatchParamsProps;
  path: string;
  url: string;
};

type IExceptionProps = {
  history: any;
  match: IMatchProps;
  location: any;
  staticContext: any;
};

const PageException: React.FC<IExceptionProps> = props => {
  const { match } = props;
  const { params } = match;
  const resultProps: ResultProps = getExceptionStatus(
    params,
  );
  return <Result {...resultProps} />;
};

function getExceptionStatus(param: IMatchParamsProps) {
  const { code } = param;
  const result: ResultProps = {
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
