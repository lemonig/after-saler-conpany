import { _post, _get } from "../server/http";
// 联系人
export const contactList = () => {
  return _get(`/api/LinkMan/list`);
};
// 联系人新增
export const contactAdd = (params) => {
  return _post(`/api/LinkMan/add`, params);
};
// 联系人编辑
export const contactEdit = (params) => {
  return _post(`/api/LinkMan/update`, params);
};
// 联系人删
export const contactDelete = (params) => {
  return _post(`/api/LinkMan/delete`, params);
};
// 联系人
export const contactGetId = (params) => {
  return _post(`/api/LinkMan/getById`, params);
};
