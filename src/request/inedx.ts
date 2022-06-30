import axios from "axios";

const service = axios.create({
  baseURL: "https://mock.apifox.cn/m1/426358-0-default/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
  },
});

// service.interceptors.request.use((config) => {
//   config.headers = config.headers || {};
//   if (localStorage.getItem("token")) {
//     config.headers.token = localStorage.getItem("token") || "";
//   }
//   return config;
// }, (err) => {
//   return Promise.reject(err);
// });

service.interceptors.response.use((res) => {
  const code: number = res.data.code;
  if (code != 200) {
    return Promise.reject(res.data);
  }
  return res.data;
}, (err) => {
  return Promise.reject(err);
});

export default service;
