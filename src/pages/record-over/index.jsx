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
  DatePicker,
  TextArea,
} from "antd-mobile";
import "./index.less";
import TitleBar from "@Components/TitleBar";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faultType,
  afterSaleType,
  afterSaleMode,
  addFinished,
} from "../../api/workorder";
import dayjs from "dayjs";

const returnVistList = [
  "使用正规购买配件",
  "使用流出配件",
  "使用第三方配件",
  "其它",
];

const conpanyList = [];
const RecordOver = () => {
  let navigate = useNavigate();
  let id = new URLSearchParams(useLocation().search).get("id");

  const [form] = Form.useForm();
  const [faultTypeList, setFaultTypeList] = useState([]);
  const [afterSaleTypeList, setAfterSaleTypeList] = useState([]);
  const [afterSaleModeList, setAfterSaleModeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFailType();
    getAfterSaleType();
    getAfterSaleMode();
  }, []);
  const getFailType = async () => {
    let { data, success } = await faultType();
    if (success) {
      const newData = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          key: item.id,
        };
      });
      setFaultTypeList(newData);
    }
  };
  const getAfterSaleType = async () => {
    let { data, success } = await afterSaleType();
    if (success) {
      const newData = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          key: item.id,
        };
      });
      setAfterSaleTypeList(newData);
    }
  };
  const getAfterSaleMode = async () => {
    let { data, success } = await afterSaleMode();
    if (success) {
      const newData = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          key: item.id,
        };
      });
      setAfterSaleModeList(newData);
    }
  };

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    let params = {
      ...values,
      work_order_id: id,
      fault_type_id: values.fault_type_id[0],
      after_sale_type_id: values.after_sale_type_id[0],
      after_sale_mode_id: values.after_sale_mode_id[0],
      trouble_key_components_check: values.trouble_key_components_check
        ? values.trouble_key_components_check[0]
        : undefined,
      finish_time: dayjs(values.finish_time).format("YYYY-MM-DD HH"),
      conclusion: values.conclusion,
    };
    setLoading(true);
    let { success, message } = await addFinished(params);
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
      navigate("/");
    } else {
      Toast.show({
        icon: "fail",
        content: message,
      });
      setLoading(false);
    }
  };
  return (
    <div className="record-scene">
      <TitleBar title="完工" />
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
          label="故障分类"
          name="fault_type_id"
          onClick={(e, failePickerRef) => {
            failePickerRef.current?.open();
          }}
          trigger="onConfirm"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Picker columns={[faultTypeList]}>
            {([value]) =>
              value ? (
                value.label
              ) : (
                <span className="placer-hoder-text">请选择</span>
              )
            }
          </Picker>
        </Form.Item>

        <Form.Header />
        <Form.Item
          label="完工时间"
          name="finish_time"
          onClick={(e, datePickerRef) => {
            datePickerRef.current?.open();
          }}
          trigger="onConfirm"
          rules={[{ required: true, message: "请选择" }]}
        >
          <DatePicker precision="hour">
            {(value) =>
              value ? (
                dayjs(value).format("YYYY-MM-DD HH")
              ) : (
                <span className="placer-hoder-text">请选择日期</span>
              )
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          label="售后类型"
          name="after_sale_type_id"
          onClick={(e, PickerRef1) => {
            PickerRef1.current?.open();
          }}
          trigger="onConfirm"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Picker columns={[afterSaleTypeList]}>
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
          label="售后方式"
          name="after_sale_mode_id"
          onClick={(e, PickerRef2) => {
            PickerRef2.current?.open();
          }}
          trigger="onConfirm"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Picker columns={[afterSaleModeList]}>
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
          label="处理过程和结果"
          name="conclusion"
          rules={[{ required: true, message: "请输入" }]}
        >
          <TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item label="故障关键元器件" name="trouble_key_components">
          <TextArea placeholder="请输入" maxLength={200} />
        </Form.Item>
        <Form.Item
          label="回访结果"
          name="trouble_key_components_check"
          onClick={(e, PickerRef3) => {
            PickerRef3.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker
            columns={[
              returnVistList.map((item) => ({ label: item, value: item })),
            ]}
          >
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
          label="处理过程和结果"
          name="trouble_key_components_check_description"
        >
          <TextArea placeholder="回访备注" maxLength={200} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecordOver;
