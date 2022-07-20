import React, { useEffect, useState } from "react";
import { Tabs, NavBar } from "antd-mobile";

import Serve from "./components/Serve";
import Evaluted from "./components/Evaluted";
import Process from "./components/Process";
import TitleBar from "@Components/TitleBar";
import "./index.less";

function MyWork() {
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setName(user.name);
  }, []);
  // const [key, setKey] = useState();
  const [name, setName] = useState("");
  // const handleTabChange = (key) => {
  //   setKey(key);
  // };
  return (
    <div className="my-work">
      {/* <TitleBar  title="刘杰-我的派单" />
       */}
      <NavBar back={null}>{name}-我的派单</NavBar>
      <Tabs>
        <Tabs.Tab title="待接单" key="1" destroyOnClose>
          <Serve />
        </Tabs.Tab>
        <Tabs.Tab title="待完工" key="2" destroyOnClose>
          <Process></Process>
        </Tabs.Tab>
        <Tabs.Tab title="已完成" key="3" destroyOnClose>
          <Evaluted></Evaluted>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default MyWork;
