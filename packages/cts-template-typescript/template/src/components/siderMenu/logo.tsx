import React from "react";

export interface iProps {
  collapsed: boolean;
}
export default function Logo({
  collapsed,
}: iProps): JSX.Element {
  return (
    <div className="logo">
      {collapsed ? "two" : "create two"}
    </div>
  );
}
