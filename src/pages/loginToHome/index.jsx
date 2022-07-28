import React, { useState, useEffect } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { wxlogin } from "../../api/public";
import "./index.less";

const LoginToHome = () => {
  let navigate = useNavigate();
  useEffect(() => {
    // let href = window.location.href; // 完整的url路径
    // let search = location.search; // 获取从？开始的部分
    // let url = decodeURI(search);
    // let code = url.split("&")[0].split("=")[1];

    let code = getParam("code");
    if (code) {
      getTicket({ code });
    } else {
      navigate("/error");
      // getTicket({ workCode: 1004 });
    }
    // else {
    //   getTicket({ workCode: 1004 });
    // }
  }, []);

  const getParam = (name, defaultValue) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === name) {
        return pair[1];
      }
    }
    return defaultValue === undefined ? null : defaultValue;
  };
  const getTicket = async (ticket) => {
    let { success, data } = await wxlogin(ticket);
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/", { replace: true });
    } else {
      navigate("/errorOther");
    }
  };

  return (
    <div className="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoginToHome;
