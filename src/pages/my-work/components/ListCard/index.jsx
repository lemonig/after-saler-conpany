import React from "react";
import { Card, Toast, Button, NavBar, Space, Modal, Tag } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { orderStatus } from "../../../../utils/constant";
import moment from "moment";
import { workOrderAccepted } from "../../../../api/workorder";

function ListCard({ msg, refresh, gotoName }) {
  let navigate = useNavigate();

  const gotoLookupProgress = (id) => {
    navigate({
      pathname: `/${gotoName}`,
      search: `?id=${id}`,
    });
  };

  const receiveOrder = async (id) => {
    let { success } = await workOrderAccepted({ id });
    if (success) {
      Toast.show({
        content: "接单成功",
        afterClose: () => {
          console.log("after");
        },
      });
      refresh(true);
    }
  };

  return (
    <Card style={{ borderRadius: "6px" }} className="list-card">
      <div className="head">
        <Tag color="default">{msg.fault_type}</Tag>
        <Tag color="#2db7f5">{orderStatus(msg.status)}</Tag>
      </div>
      <div className="content">
        <p>服务单号 {msg.service_code}</p>
        <p>提交日期 {moment(msg.gmt_create).format("YYYY-MM-DD")}</p>
        <p className="desc">描述 {msg.describe}</p>
        <p>
          {msg.submitter} {msg.cityName}
        </p>
      </div>
      <div className="footer" onClick={(e) => e.stopPropagation()}>
        <Space>
          <Button
            color="primary"
            fill="outline"
            onClick={() => gotoLookupProgress(msg.id)}
            size="mini"
          >
            进度查询
          </Button>

          {msg.status === 1 || msg.status === 2 ? (
            <Button
              color="primary"
              fill="outline"
              onClick={() => receiveOrder(msg.id)}
              size="mini"
            >
              接收工单
            </Button>
          ) : // <span onClick={() => gotoEnvalute(msg.id)}>
          //   <EditSOutline color="var(--adm-color-primary)" />
          //   去评价
          // </span>
          null}
        </Space>

        {/* <span onClick={() => gotoLookupProgress(msg.id)}>
          进度查询
        </span> */}
      </div>
    </Card>
  );
}

export default ListCard;
