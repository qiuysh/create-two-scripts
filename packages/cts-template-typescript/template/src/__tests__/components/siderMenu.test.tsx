import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import SiderMenu from "@/components/siderMenu";

const defaultProps = {
  collapsed: false,
  history: {
    location: {
      pathname: "/",
    },
  },
  menuList: [
    {
      id: 1,
      pid: 0,
      name: "工具栏",
      type: 1,
      icon: "icondashboard",
      url: "/dashboard",
      code: "dashboard",
      desc: null,
      create_time: "2021-03-10T10:47:52.000Z",
      modified_time: null,
    },
  ],
};

afterEach(cleanup);


describe("test siderMenu", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<SiderMenu {...defaultProps} />);
  });

  it("test siderMenu -- click event", () => {
    const menu = wrapper.getByTestId("test-sider-nav");
    const handleClick = jest.fn();
    fireEvent.click(menu);
    expect(handleClick).toHaveBeenCalled();
  });


  it("test siderMenu -- snapshot", () => {
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
