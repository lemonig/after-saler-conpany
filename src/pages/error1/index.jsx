import React from "react";
import { ErrorBlock, Space } from "antd-mobile";
import "./index.less";
function Error() {
  return (
    <div className="error-page">
      <ErrorBlock
        status="empty"
        description="请先联系管理员添加您为售后人员"
        title="仅限售后人员使用"
      />
    </div>
  );
}

export default Error;
