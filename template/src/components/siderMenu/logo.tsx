/** @format */

import React from "react";

export interface iProps {
  collapsed: boolean;
}
export default function Logo({
  collapsed,
}: iProps): JSX.Element {
  return (
    <div className="logo">
      {collapsed ? "Leek" : "Leek Box"}
    </div>
  );
}
