/** @format */

import { updateChain } from "immutability-helper-x";

export const initialState: GLOBAL.storeProps = {
  menuList: [],
};

export const globalReducer = (
  state: any,
  action: { type: string; payload: { [key: string]: any } },
) => {
  const { type, payload } = action;
  switch (type) {
    case "global/menus": {
      return updateChain(state)
        .$set("menuList", payload)
        .value();
    }
    default:
      return state;
  }
};
