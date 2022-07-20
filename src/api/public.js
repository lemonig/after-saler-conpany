import { _post, _get } from "../server/http";
// file
export const contactList = (file) => {
  return _post(`api/upload/file`, file);
};

export const cityList = () => {
  return _get(`api/faulttype/list`);
};
export const captcha = (params) => {
  return _post(`api/captcha`, params);
};
export const login = (params) => {
  return _post(`api/login`, params);
};
export const wxlogin = (params) => {
  return _post(`api/wx/doLogin`, params);
};
