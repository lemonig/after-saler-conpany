import React, { useEffect, useState } from "react";
import { Tabs, NavBar } from "antd-mobile";

import Serve from "./components/Serve";
import Evaluted from "./components/Evaluted";
import Process from "./components/Process";
import TitleBar from "@Components/TitleBar";
import "./index.less";
import { connect } from "react-redux";
import { tabAction } from "@Store/actions/tab-action";
import store from "@Store";

function MyWork({ tab }) {
  let user = JSON.parse(localStorage.getItem("user"));

  const handleTabChange = (key) => {
    store.dispatch(tabAction.selectTab(key));
  };
  return (
    <div className="my-work">
      <NavBar back={null}>{user.name}-我的派单</NavBar>
      <Tabs onChange={handleTabChange} activeKey={tab.value}>
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

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MyWork);
