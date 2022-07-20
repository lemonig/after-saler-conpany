import React from "react";
import { Tabs, NavBar } from "antd-mobile";

import { useNavigate } from "react-router-dom";
function TitleBar({ title }) {
  let navigate = useNavigate();
  const back = () => {
    navigate(-1, { replace: true });
  };
  return (
    <NavBar back="返回" onBack={back}>
      {title}
    </NavBar>
  );
}

export default TitleBar;
