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
import { useNavigate } from "react-router-dom";

const conpanyList = [];
const OverForm = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    // let { success } = await workOrderAdd(values);
    // if (success) {
    //   Toast.show({
    //     icon: "success",
    //     content: "提交成功",
    //   });
    //   back();
    // } else {
    //   Toast.show({
    //     icon: "fail",
    //     content: "失败",
    //   });
    // }
  };
  return (
    <div className="record-scene">
      <NavBar back="返回" onBack={back}></NavBar>
      <h2>记录现场情况</h2>
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
          name="cityCode"
          onClick={(e, provincePickerRef) => {
            provincePickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[conpanyList]}>
            {([value]) => (value ? value.label : "请选择")}
          </Picker>
        </Form.Item>
        <Form.Item label="仪器厂家">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Header />
        <Form.Item label="仪器分类">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="仪器型号">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="质保情况">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="所属项目">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="站点信息">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="远程连接">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OverForm;
