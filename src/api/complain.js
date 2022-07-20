import { _post, _get } from "../server/http";
export const complaintAdd = (params) => {
  return _post(`api/Complaint/add`, params);
};
