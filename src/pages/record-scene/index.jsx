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
  getSiteSituation,
} from "../../api/workorder";

import { useNavigate, useLocation } from "react-router-dom";
import Project from "./components/Project";
import Device from "./components/Device";
import Manufactor from "./components/Manufactor";
import People from "./components/People";

const RecordScene = () => {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");
  let sceneId = new URLSearchParams(useLocation().search).get("sceneId");
  const [form] = Form.useForm();
  const [pagedata, setPagedata] = useState({});
  const [loading, setLoading] = useState(false);
  const [warrantyList, setWarrantyList] = useState([
    { label: "质保1:", value: 1 },
    { label: "质保2", value: 2 },
  ]);
  const [showSearchPage, setShowSearchPage] = useState({
    main: true,
    device: false,
    manufactor: false,
    project: false,
    people: false,
  }); //页面显示
  const [searchCall, setSearchCall] = useState({
    device: "",
    manufactor: "",
    project: "",
    people: "",
  });

  useEffect(() => {
    // getEhrList();
    // getCompanyList();

    getListWarranty();
  }, []);

  const getPageData = async () => {
    let { data, success } = await getSiteSituation({ id: sceneId });
    if (success) {
      setPagedata(data);
      setSearchCall({
        device: data.device_name,
        manufactor: data.manufactor_name,
        project: data.project_name,
        people: data.company_name,
      });
      // form.setFieldsValue(data);
      form.setFieldsValue({
        ...data,
        warranty_id: [data.warranty_id],
      });
    }
  };

  const getListWarranty = async () => {
    let { data, success } = await listWarranty();
    if (success) {
      const newData = changeToPickerData(data);
      setWarrantyList(newData);
    }
    console.log(sceneId);
    if (!!sceneId) {
      getPageData();
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
    setLoading(true);
    const values = form.getFieldsValue();
    values.work_order_id = id;
    for (let item in values) {
      if (Array.isArray(values[item])) {
        values[item] = values[item][0];
      }
    }

    let { success } = await addSiteSituation(values);
    setLoading(false);
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
          <Button
            block
            color="primary"
            onClick={onSubmit}
            size="large"
            loading={loading}
          >
            提交
          </Button>
        }
      >
        <Form.Item
          label="工单所属公司"
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
          rules={[{ required: true, message: "请选择" }]}
        >
          <p>
            {searchCall.people ? (
              searchCall.people
            ) : (
              <span className="placer-hoder-text">请选择</span>
            )}
          </p>
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
          <p>
            {searchCall.manufactor ? (
              searchCall.manufactor
            ) : (
              <span className="placer-hoder-text">请选择</span>
            )}
          </p>
        </Form.Item>
        <Form.Item
          label="设备类别"
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
          <p>
            {searchCall.device ? (
              searchCall.device
            ) : (
              <span className="placer-hoder-text">请选择</span>
            )}
          </p>
        </Form.Item>
        <Form.Item label="设备型号" name="device_type">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="设备编号" name="device_code">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="质保情况"
          name="warranty_id"
          onClick={(e, PickerRef) => {
            PickerRef.current?.open();
          }}
          trigger="onConfirm"
          // initialValue={{
          //   warranty_id: 2,
          // }}
        >
          <Picker columns={[warrantyList]}>
            {([value]) =>
              value ? (
                value.label
              ) : (
                <span className="placer-hoder-text">请选择</span>
              )
            }
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
