import axios from "axios";

// 创建 axios 实例
const API = axios.create({
  // baseURL: "http://127.0.0.1:6927/blog",
  baseURL: "你的服务器地址",
  timeout: 60000,
  changeOrigin: true,
});

export default API;
