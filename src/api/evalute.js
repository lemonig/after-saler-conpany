import { _post, _get } from "../server/http";
export const evaluate = (params) => {
  return _post(`api/WorkOrder/evaluate`, params);
};
