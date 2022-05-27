import { updateChain } from "immutability-helper-x";

export const initialState = {
  menuList: [
    {
      id: 1,
      pid: 0,
      name: '引导',
      code: 'guide',
      url: 'index',
      icon: '',
      desc: '',
      create_time: '',
      modified_time: ''
    },
  ],
};

export const globalReducer = (
  state,
  action,
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
