import { _post, _get } from "../server/http";

export const workOrderList = (params) => {
  return _post(`api/WorkOrder/list`, params);
};
export const workOrderAdd = (params) => {
  return _post(`/api/WorkOrder/add`, params);
};

// 工单类型
export const faulttypeList = () => {
  return _get(`api/faulttype/list`);
};
//接收工单
export const workOrderAccepted = (params) => {
  return _post(`/api/WorkOrder/accepted`, params);
};
//带接收
export const workOrderNotAccepted = (params) => {
  return _post(`/api/WorkOrder/notAccepted`, params);
};
//待完工
export const workOrderNotFinished = (params) => {
  return _post(`/api/WorkOrder/notFinished`, params);
};
//已经完工
export const workOrderFinished = (params) => {
  return _post(`/api/WorkOrder/finished`, params);
};
//添加处理过程
export const addHandleProcess = (params) => {
  return _post(`api/HandleProcess/add `, params);
};
//售后人员
export const companyAfterSaleList = (params) => {
  return _get(`api/CompanyAfterSale/list`, params);
};
//转派
export const workOrdereReassignment = (params) => {
  return _post(`api/WorkOrder/reassignment `, params);
};
//故障分类
export const faultType = (params) => {
  return _get(`api/finished/faultType`, params);
};
//售后类别
export const afterSaleType = (params) => {
  return _get(`/api/finished/afterSaleType`, params);
};
//售后方式
export const afterSaleMode = (params) => {
  return _get(`api/finished/afterSaleMode`, params);
};
//工单完成
export const addFinished = (params) => {
  return _post(`api/finished/add`, params);
};
//工单详情
export const workOrderDetail = (params) => {
  return _post(`api/WorkOrder/detail`, params);
};
//仪器厂家
export const listManufactor = (params) => {
  return _get(`/api/SiteSituation/listManufactor`, params);
};
//仪器类别
export const listDeviceType = (params) => {
  return _get(`/api/SiteSituation/listDeviceType`, params);
};
//仪器厂家
export const listProject = (params) => {
  return _get(`api/SiteSituation/listProject`, params);
};
//质保列表
export const listWarranty = (params) => {
  return _get(`api/SiteSituation/listWarranty`, params);
};
//现场人公司
export const listCompany = (params) => {
  return _post(`api/SiteSituation/listCompany`, params);
};
//添加现场情况
export const addSiteSituation = (params) => {
  return _post(`api/SiteSituation/add`, params);
};
