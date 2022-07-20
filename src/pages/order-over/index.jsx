import React, { useEffect, useState } from "react";
import {
  Card,
  Toast,
  Steps,
  Avatar,
  List,
  Space,
  Image,
  ImageViewer,
  Modal,
  Picker,
} from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";

import headimg from "../../assets/img/head.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { workOrderDetail } from "../../api/workorder";
import Item from "antd-mobile/es/components/dropdown/item";
import { orderStatus } from "../../utils/constant";
import moment from "moment";

const { Step } = Steps;

const orderStatusList = ["待受理", "受理", "转派", "接单", "完工", "评价"];
function ProgressOn() {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [imgVisible, setImgVisible] = useState(false);
  const [pageData, setPageData] = useState({});
  const [peopleList, setPeopleList] = useState([]); //
  const [transmitPeople, setTransmitPeople] = useState();
  const [peoplePickerVis, setPeoplePickerVis] = useState(false);

  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    let { data } = await workOrderDetail({ id: id });
    setPageData(data);
  };

  const previewImg = () => {
    if (!pageData.wechat_url) {
      Toast.show({
        content: "二维码未上传",
        afterClose: () => {},
      });
      return;
    }
    setImgVisible(true);
  };

  const handleTransmit = () => {
    setPeoplePickerVis(true);
  };
  const handlePickerConfirm = (v) => {
    Modal.confirm({
      title: "提示",
      content: "服务单将由转派人处理",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: () => {
        console.log("Confirmed");
        // let { success } = contactDelete({ id: id });
        // if (success) {
        //   Toast.show({
        //     icon: "success",
        //     content: "删除成功",
        //   });
        // }
        // getPageData();
      },
      onCancel: () => {
        console.log("Confirmed");
      },
    });
  };

  const $historyScene = () => {
    return pageData?.handleProcessList.map((item) => {
      return (
        <Card key={item.id} className="over-card">
          <div className="history-card">
            <p className="head">
              <span>{item.user_name}</span>
              <span>{moment(item.gmt_create).format("YYYY-MM-DD HH:mm")}</span>
            </p>
            <p className="descript">{item.describe}</p>
            <p className="photo">
              {item?.photo?.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width={64}
                  height={64}
                  fit="cover"
                  style={{ borderRadius: 4 }}
                />
              ))}
            </p>
            <p className="color-greay">{item.address}</p>
          </div>
        </Card>
      );
    });
  };

  return (
    <div className="order-over">
      <TitleBar title="进度查询" />
      <Card className="over-card card-margin ">
        <div className="head">
          <Avatar src={pageData?.wechat_url} />
          <p>{pageData.workOrder?.submitter}</p>
          <p>{pageData.workOrder?.submitter_company}</p>
        </div>
        <div className="content">
          联系人 {pageData.workOrder?.linkman_name}&nbsp;&nbsp;
          {pageData.workOrder?.linkman_mobile}
        </div>
        <p>{pageData.workOrder?.linkman_address}</p>
      </Card>
      <Card className="over-card card-margin">
        <List className="my-list">
          <List.Item prefix={"服务单号"}>
            {pageData.workOrder?.service_code}
          </List.Item>
          <List.Item prefix={"描述"}>{pageData.workOrder?.describe}</List.Item>
          <List.Item prefix={"产品型号"}>{pageData.workOrder?.model}</List.Item>

          <List.Item prefix={"照片"}>
            <Space wrap>
              {pageData.workOrder?.photo?.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width={64}
                  height={64}
                  fit="cover"
                  style={{ borderRadius: 4 }}
                />
              ))}
            </Space>
          </List.Item>
        </List>
      </Card>

      <p className="color-greay">以下部分不会被现场用户看到</p>
      {/*  */}
      {pageData.handleProcessList && $historyScene()}
      {pageData.siteSituations &&
        pageData?.siteSituations.map((item) => (
          <Card className="over-card card-margin" key={item.id}>
            <List className="my-list">
              <List.Item prefix={"仪器信息"}>{item?.device_name}</List.Item>
              <List.Item prefix={"质保情况"}>{item?.warranty_name}</List.Item>
              <List.Item prefix={"远程连接"}>{item?.remote_link}</List.Item>
              <List.Item prefix={"项目信息"}>{item?.project_name}</List.Item>
              <List.Item prefix={"站点信息"}>{item?.station}</List.Item>
            </List>
          </Card>
        ))}
      <ImageViewer
        image={pageData.wechat_url}
        visible={imgVisible}
        onClose={() => {
          setImgVisible(false);
        }}
      />
      <Picker
        columns={[peopleList]}
        onConfirm={(v) => {
          handlePickerConfirm(v);
        }}
        visible={peoplePickerVis}
        onClose={() => {
          setPeoplePickerVis(false);
        }}
        value={transmitPeople}
      ></Picker>
    </div>
  );
}

export default ProgressOn;
