/** @format */
import React from "react";
import { render, cleanup, RenderResult } from "@testing-library/react";
import Footer from "@components/footer";

afterEach(cleanup);

describe("test siderMenu", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<Footer />);
  });


  // it("test footer", () => {
  //   const footer = wrapper.getByText('Copyright © 9102 wolin 3C');
  //   expect(footer).toBeInTheDocument();
  // });

  it("test footer -- snapshot", () => {
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

});

