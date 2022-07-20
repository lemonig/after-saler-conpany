import axios from "axios";
import { Button, Space, Toast } from "antd-mobile";

axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    };
    if (localStorage.getItem("token") || !!localStorage.getItem("token")) {
      config.headers["token"] = localStorage.getItem("token");
      // config.headers["token"] = "a0347583ef5e14675b59739b0c6a8f78d";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.data && response.status === 200) {
      if (response.data.error == "UNAUTHENTICATED") {
        // window.history.pushState('', null, '/login')
        window.location.href = "./load";
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  (error) => {
    if (error.response?.status) {
      switch (error.response.status) {
        case 401:
          break;
        case 403:
          Toast.show("403");
          localStorage.removeItem("token");
          setTimeout(() => {}, 1000);
          break;
        case 404:
          Toast.show("404");
          // message.error("404");
          break;
        case 504:
          Toast.show("504");
          // message.error("504");
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast.show(error.response.statusText);
        // message.error(error.response.statusText);
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 * @private
 */
export const _get = (url, params) => {
  return new Promise((rlv, rej) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        rlv(res.data);
      })
      .catch((err) => {
        rej(err.data);
      });
  });
};

/**
 * post
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 * @private
 */
export const _post = (url, params) => {
  return new Promise((rlv, rej) => {
    axios
      .post(url, params, {})
      .then((res) => {
        rlv(res.data);
      })
      .catch((err) => {
        rej(err.data);
      });
  });
};

export const _download = (url, data, title) => {
  let nowDate = new Date();
  let day = nowDate.getDate();
  let month = nowDate.getMonth() + 1;
  let year = nowDate.getFullYear();
  return axios({
    method: "post",
    url: url,
    data: data,
    responseType: "blob",
  }).then((res) => {
    let result = res.data;
    var blob = new Blob([result], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    var objectUrl = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");
    a.setAttribute("href", objectUrl);
    a.setAttribute("download", `${title}-${year}-${month}-${day}.xls`);
    a.click();
    URL.revokeObjectURL(objectUrl);
  });
};
