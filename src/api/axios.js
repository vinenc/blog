import axios from "axios";
import secret from "./secret";

// 创建 axios 实例
const API = axios.create({
  baseURL: secret.baseURL, // 这里修改服务器地址
  timeout: 60000,
  changeOrigin: true,
});

export default API;
