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
  Form,
  Input,
  ImageUploader,
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
import { addHandleProcess } from "../../api/workorder";
import Item from "antd-mobile/es/components/dropdown/item";
import { orderStatus } from "../../utils/constant";
import moment from "moment";
import IconFont from "../../components/IconFont";
import {
  demoSrc,
  mockUpload,
  mockUploadFail,
  beforeUpload,
} from "../../utils/imgUpload";
import Map from "../map";

function RecordProgress() {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [mapAddr, setMapAddr] = useState(null); //地图选择
  const formRule = [{ required: true }];

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    values.work_order_id = id;
    if (mapAddr) {
      values.coordinate1 = mapAddr.lnglat.lng;
      values.coordinate2 = mapAddr.lnglat.lat;
    }

    if (Array.isArray(values.photo)) {
      values.photo = values.photo.map((item) => {
        return item.url;
      });
    }
    let { success } = await addHandleProcess(values);
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
      back();
    } else {
      Toast.show({
        icon: "fail",
        content: "失败",
      });
    }
  };
  const back = () => {
    navigate(-1, { replace: true });
  };
  const gotoLocation = () => {
    setShowMap(true);
    // navigate("/map");
  };
  // 地图返回
  const handleMapBack = () => {
    setShowMap(false);
  };
  // 地图选择
  const handkeSeleteAddr = (val) => {
    setShowMap(false);
    setMapAddr(val);
    form.setFieldsValue({
      address:
        val?.address?.city +
        val?.address?.district +
        val?.address?.street +
        val?.address?.township,
      detailed_address: val.poi.name,
    });
  };

  return showMap ? (
    <Map handleMapBack={handleMapBack} handkeSeleteAddr={handkeSeleteAddr} />
  ) : (
    <div className="record-progress">
      <TitleBar title="" />
      <h2 style={{ textAlign: "center" }}>记录处理过程</h2>

      <Form
        layout="horizontal"
        mode="card"
        form={form}
        footer={
          <Button block color="primary" onClick={onSubmit} size="large">
            提交
          </Button>
        }
      >
        <Form.Item label="处理描述" name="describe" rules={formRule}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="address"
          label="所在地区"
          extra={
            <div onClick={gotoLocation}>
              <IconFont iconName="dingwei" className="" />
            </div>
          }
        >
          <Input placeholder="请输入" />
          {/* <p>
            {mapAddr?.address?.city}
            {mapAddr?.address?.district}
            {mapAddr?.address?.township}
            {mapAddr?.address?.street}
          </p> */}
        </Form.Item>
        <Form.Item label="照片" layout="vertical" name="photo">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            maxCount={3}
            beforeUpload={beforeUpload}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default RecordProgress;
