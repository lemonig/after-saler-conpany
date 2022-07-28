import React from "react";
import { ErrorBlock, Space } from "antd-mobile";
import "./index.less";
function Error() {
  return (
    <div className="error-page">
      <ErrorBlock
        status="empty"
        description="请在企业微信环境下登录"
        title=""
      />
    </div>
  );
}

export default Error;
