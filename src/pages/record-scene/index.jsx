import React, { useEffect, useState } from "react";
import { Toast, Button, NavBar, Form, Input, Picker } from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";
import {
  listManufactor,
  listDeviceType,
  listProject,
  listWarranty,
  listCompany,
  addSiteSituation,
} from "../../api/workorder";

import { useNavigate, useLocation } from "react-router-dom";
import Project from "./components/Project";
import Device from "./components/Device";
import Manufactor from "./components/Manufactor";
import People from "./components/People";

const RecordScene = () => {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  const [form] = Form.useForm();
  const [manufactorList, setManufactorList] = useState([]);
  const [deviceTypeList, setDeviceTypeList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [warrantyList, setWarrantyList] = useState([]);
  const [companyList, setconpanyList] = useState([]);
  const [showSearchPage, setShowSearchPage] = useState({
    main: true,
    device: false,
    manufactor: false,
    project: false,
    people: false,
  }); //页面显示
  const [searchCall, setSearchCall] = useState({
    device: "请选择",
    manufactor: "请选择",
    project: "请选择",
    people: "请选择",
  });

  useEffect(() => {
    // getEhrList();
    // getCompanyList();

    getListWarranty();
  }, []);

  const getCompanyList = async () => {
    let { data, success } = await listCompany({ id });
    if (success) {
      const newData = changeToPickerData(data);
      console.log(newData);
      setconpanyList(newData);
      form.setFieldsValue({
        // company_id: 1,
      });
    }
  };
  // 厂家
  const getListManufactor = async () => {
    let { data, success } = await listManufactor();
    if (success) {
      // const newData = changeToPickerData(data);
      setManufactorList(data);
    }
  };
  // 分类
  const getListDeviceType = async () => {
    let { data, success } = await listDeviceType();
    if (success) {
      // const newData = changeToPickerData(data);
      setDeviceTypeList(data);
    }
  };
  // 项目
  const getListProject = async () => {
    let { data, success } = await listProject();
    if (success) {
      // const newData = changeToPickerData(data);
      setProjectList(data);
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

  const projectCallback = (val) => {
    form.setFieldsValue({
      project_id: val.id,
    });
    setSearchCall({
      ...searchCall,
      project: val.name,
    });
    closePage();
  };
  const manufactorCallback = (val) => {
    form.setFieldsValue({
      manufactor_id: val.id,
    });
    setSearchCall({
      ...searchCall,
      manufactor: val.name,
    });
    closePage();
  };
  const deviceCallback = (val) => {
    form.setFieldsValue({
      device_id: val.id,
    });
    setSearchCall({
      ...searchCall,
      device: val.name,
    });
    closePage();
  };
  const peopleCallback = (val) => {
    form.setFieldsValue({
      company_id: val.id,
    });
    setSearchCall({
      ...searchCall,
      people: val.name,
    });
    closePage();
  };

  const closePage = () => {
    setShowSearchPage({
      main: true,
      device: false,
      manufactor: false,
      project: false,
      people: false,
    });
  };

  const getPageDom = () => {
    if (showSearchPage.device) {
      return <Device callback={deviceCallback} closePage={closePage} />;
    } else if (showSearchPage.manufactor) {
      return <Manufactor callback={manufactorCallback} closePage={closePage} />;
    } else if (showSearchPage.project) {
      return <Project callback={projectCallback} closePage={closePage} />;
    } else if (showSearchPage.people) {
      return <People callback={peopleCallback} closePage={closePage} id={id} />;
    }
  };

  return showSearchPage.main ? (
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
        initialValues={
          {
            // device_type: "11",
          }
        }
      >
        <Form.Item
          label="现场人公司"
          name="company_id"
          onClick={() =>
            setShowSearchPage({
              main: false,
              device: false,
              manufactor: false,
              project: false,
              people: true,
            })
          }
        >
          <p>{searchCall.people}</p>
        </Form.Item>
        <Form.Item
          label="仪器厂家"
          name="manufactor_id"
          onClick={() =>
            setShowSearchPage({
              main: false,
              device: false,
              manufactor: true,
              project: false,
              people: false,
            })
          }
        >
          <p>{searchCall.manufactor}</p>
        </Form.Item>
        <Form.Item
          label="仪器分类"
          name="device_id"
          onClick={() =>
            setShowSearchPage({
              main: false,
              device: true,
              manufactor: false,
              project: false,
              people: false,
            })
          }
        >
          <p>{searchCall.device}</p>
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
          onClick={() =>
            setShowSearchPage({
              main: false,
              device: false,
              manufactor: false,
              project: true,
              people: false,
            })
          }
        >
          <p>{searchCall.project}</p>
        </Form.Item>
        <Form.Item label="站点信息" name="station">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="远程连接" name="remote_link">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  ) : (
    getPageDom()
  );
};

export default RecordScene;
