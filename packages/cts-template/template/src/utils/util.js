/**
 * 验证是否登录
 * @param nextState
 * @param replace
 */
export function isLogined(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: "/login",
    });
  }
}

export function loggedIn() {
  return !!localStorage.token;
}

/**
 * 获取内容高度
 */
export function getViewPortHeight() {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
}
