import React from "react";

export default function Logo({
  collapsed,
}) {
  return (
    <div className="logo">
      {collapsed ? "two" : "create two"}
    </div>
  );
}
