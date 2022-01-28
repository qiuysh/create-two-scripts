/** @format */

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
} from "axios";
import { message } from "antd";

const isMock = process.env.FIRST_ENV === 'mock';

console.log(process)

export default function request(
  url: string,
  options: AxiosRequestConfig = {},
): AxiosPromise {
  // 请求拦截器
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token: string | null = localStorage.getItem(
        "token",
      );
      if (token) {
        config.headers.Authorization = token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      }
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
  // 使用由库提供的配置的默认值来创建实例
  return axios({
    url,
    baseURL: isMock ? '/mock' : '',
    method: "get", // 默认值
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
    timeout: 5000,
    ...options,
  })
    .then((res: any) => {
      const { status } = res;
      const successed: boolean = checkRspStatus(status);

      if (successed) {
        return Promise.resolve({
          ...res.data,
        });
      }

      // 错误提示
      tipError(res);

      const error = {
        name: "http error",
        message: "http response status error",
        config: options,
        code: `${status}`,
      };
      return Promise.reject(error);
    })
    .catch(error => {
      const { response } = error;

      // 错误提示
      tipError(
        response || {
          ...error,
          status: 600,
        },
      );

      let msg: string;
      let statusCode: number;

      if (response && response instanceof Object) {
        const { statusText } = response;
        statusCode = response.status;
        msg = response.data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || "Network Error";
      }

      return Promise.resolve({
        ...response,
        success: false,
        status: statusCode,
        message: msg,
      });
    });
}

function checkRspStatus(status: number) {
  if (status >= 200 && status < 300) {
    return true;
  }
  return false;
}

function tipError(res: AxiosResponse) {
  const { status } = res;

  switch (status) {
    case 401:
      // storage.clear();
      message.error("登录过期，请重新登录");
      window.location.href = "/login";
      break;

    case 400:
      message.error("请求错误，请检查参数");
      break;

    default:
      if (status >= 500) {
        message.error("网络错误，请刷新重试");
      }
      // 注意：其他错误的错误提示需要在业务内自行处理
      break;
  }
  console.error(
    "http返回结果的 status 码错误，错误信息是:",
    res,
  );
}
