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
  Picker,
} from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";
import {
  ehrList,
  listManufactor,
  listDeviceType,
  listProject,
  listWarranty,
  listCompany,
  addSiteSituation,
} from "../../api/workorder";

import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

const RecordScene = () => {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [form] = Form.useForm();
  const [peopleList, setpeopleList] = useState([]);
  const [manufactorList, setManufactorList] = useState([]);
  const [deviceTypeList, setDeviceTypeList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [warrantyList, setWarrantyList] = useState([]);
  const [companyList, setconpanyList] = useState([]);

  useEffect(() => {
    // getEhrList();
    getCompanyList();
    getListManufactor();
    getListDeviceType();
    getListProject();
    getListWarranty();
  }, []);

  const getCompanyList = async () => {
    let { data, success } = await listCompany({ id });
    if (success) {
      const newData = changeToPickerData(data);
      setconpanyList(newData);
    }
  };

  const getListManufactor = async () => {
    let { data, success } = await listManufactor();
    if (success) {
      const newData = changeToPickerData(data);
      setManufactorList(newData);
    }
  };
  const getListDeviceType = async () => {
    let { data, success } = await listDeviceType();
    if (success) {
      const newData = changeToPickerData(data);
      setDeviceTypeList(newData);
    }
  };
  const getListProject = async () => {
    let { data, success } = await listProject();
    if (success) {
      const newData = changeToPickerData(data);
      setProjectList(newData);
    }
  };
  const getListWarranty = async () => {
    let { data, success } = await listWarranty();
    if (success) {
      const newData = changeToPickerData(data);
      setWarrantyList(newData);
    }
  };
  // 处理数据
  const changeToPickerData = (list) => {
    const newData = list.map((item) => {
      return {
        value: item.id,
        label: item.name,
        key: item.id,
      };
    });
    return newData;
  };
  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    values.work_order_id = id;
    for (let item in values) {
      if (Array.isArray(values[item])) {
        values[item] = values[item][0];
      }
    }

    let { success } = await addSiteSituation(values);
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
  return (
    <div className="record-scene">
      <NavBar back="返回" onBack={back}></NavBar>
      <h2 style={{ textAlign: "center" }}>记录现场情况</h2>
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
        <Form.Item
          label="现场人公司"
          name="company_id"
          onClick={(e, PickerRef1) => {
            PickerRef1.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[companyList]}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>
        <Form.Item
          label="仪器厂家"
          name="manufactor_id"
          onClick={(e, PickerRef) => {
            PickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[manufactorList]}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>
        <Form.Header />
        <Form.Item
          label="仪器分类"
          name="device_id"
          onClick={(e, PickerRef) => {
            PickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[deviceTypeList]}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>
        <Form.Item label="仪器型号" name="device_type">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="质保情况"
          name="warranty_id"
          onClick={(e, PickerRef) => {
            PickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[warrantyList]}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>
        <Form.Item
          label="所属项目"
          name="project_id"
          onClick={(e, PickerRef) => {
            PickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[projectList]}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>
        <Form.Item label="站点信息" name="station">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="远程连接" name="remote_link">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecordScene;
