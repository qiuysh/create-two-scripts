import requset from "@/utils/request";
// import { stringify } from "qs";

export async function getNavigation(params) {
  return requset("/api/v1/menu/list", {
    method: "GET",
    params,
  });
}
