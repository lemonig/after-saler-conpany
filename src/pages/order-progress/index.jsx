import React, { useEffect, useState } from "react";
import {
  Card,
  Toast,
  Button,
  NavBar,
  Steps,
  Avatar,
  List,
  Space,
  Image,
  ImageViewer,
  Divider,
  Modal,
  Picker,
} from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";
import {
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
  AddOutline,
} from "antd-mobile-icons";
import headimg from "../../assets/img/head.jpg";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  workOrderDetail,
  companyAfterSaleList,
  workOrdereReassignment,
} from "../../api/workorder";
import Item from "antd-mobile/es/components/dropdown/item";
import { orderStatus } from "../../utils/constant";
import moment from "moment";
import IconFont from "../../components/IconFont";

const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60";
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
    getUserList();
    getPageData();
  }, []);
  const getUserList = async () => {
    let { data, success } = await companyAfterSaleList();
    if (success) {
      const newData = data.map((item) => {
        return {
          value: item.workCode,
          label: item.name,
          key: item.workCode,
        };
      });
      setPeopleList(newData);
    }
  };
  const getPageData = async () => {
    let { data } = await workOrderDetail({ id: id });
    setPageData(data);
  };

  const back = () => {
    navigate(-1, { replace: true });
  };

  const previewImg = () => {
    console.log(!!pageData.wechat_url);
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
  const handlePickerConfirm = (value) => {
    Modal.confirm({
      title: "提示",
      content: "服务单将由转派人处理",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: async () => {
        console.log("Confirmed");
        let params = {
          work_order_id: id,
          workCode: value[0],
        };
        let { success } = await workOrdereReassignment(params);
        if (success) {
          Toast.show({
            icon: "success",
            content: "",
          });
          back();
        }
        getPageData();
      },
      onCancel: () => {
        console.log("Confirmed");
      },
    });
  };

  const handleOver = () => {
    // TODO 去完工页面
    navigate({
      pathname: "/recorOver",
      search: `?id=${id}`,
    });
  };
  // 处理过程
  const handleRecordProgress = (first) => {
    navigate({
      pathname: "/recordProgress",
      search: `?id=${id}`,
    });
  };
  // 处理过程
  const handleRecorScene = (first) => {
    if (pageData?.siteSituations[0]?.id) {
      navigate({
        pathname: "/recorScene",
        search: `?id=${id}&sceneId=${pageData?.siteSituations[0]?.id}`,
      });
    } else {
      navigate({
        pathname: "/recorScene",
        search: `?id=${id}`,
      });
    }
  };

  const $historyScene = () => {
    return pageData?.handleProcessList.map((item) => {
      return (
        <Card key={item.id} className="progress-card">
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
    <div className="progress-wrap">
      <TitleBar title="进度查询" />
      <Card className="progress-card card-margin">
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
      <Card className="progress-card card-margin">
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

      <div className="flex-wrap btn-wrap">
        <Button color="warning" onClick={handleTransmit}>
          转派
        </Button>
        <Button color="primary" onClick={handleOver}>
          完工
        </Button>
      </div>

      <p className="color-greay ">以下部分不会被现场用户看到</p>
      <Divider />
      <div onClick={handleRecordProgress}>
        <AddOutline /> 记录处理过程
      </div>
      <Divider />
      {pageData.handleProcessList && $historyScene()}
      <Divider />
      <div onClick={handleRecorScene}>
        <AddOutline /> 记录现场情况
      </div>
      <Divider />
      {pageData?.siteSituations?.length ? (
        <Card className="progress-card card-margin">
          <List className="my-list">
            <List.Item prefix={"现场人员公司"}>
              {pageData?.siteSituations[0]?.company_name ?? "--"}
            </List.Item>
            <List.Item prefix={"仪器厂家"}>
              {pageData?.siteSituations[0]?.manufactor_name ?? "--"}
            </List.Item>
            <List.Item prefix={"设备类别"}>
              {pageData?.siteSituations[0]?.device_name ?? "--"}
            </List.Item>
            <List.Item prefix={"仪器型号"}>
              {pageData?.siteSituations[0]?.device_type ?? "--"}
            </List.Item>
            <List.Item prefix={"质保情况"}>
              {pageData?.siteSituations[0]?.warranty_name ?? "--"}
            </List.Item>

            <List.Item prefix={"所属项目"}>
              {pageData?.siteSituations[0]?.project_name ?? "--"}
            </List.Item>
            <List.Item prefix={"站点信息"}>
              {pageData?.siteSituations[0]?.station ?? "--"}
            </List.Item>
            <List.Item prefix={"远程连接"}>
              {pageData?.siteSituations[0]?.remote_link ?? "--"}
            </List.Item>
          </List>
        </Card>
      ) : null}

      {/* {pageData.siteSituations &&
        pageData?.siteSituations.map((item,idx) => (
          <Card className="progress-card card-margin" key={item.id}>
            <List className="my-list">
              <List.Item prefix={"仪器信息"}>{item?.device_name}</List.Item>
              <List.Item prefix={"质保情况"}>{item?.warranty_name}</List.Item>
              <List.Item prefix={"远程连接"}>{item?.remote_link}</List.Item>
              <List.Item prefix={"项目信息"}>{item?.project_name}</List.Item>
              <List.Item prefix={"站点信息"}>{item?.station}</List.Item>
            </List>
          </Card>
        ))} */}

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
