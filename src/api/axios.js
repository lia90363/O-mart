import axios from "axios";

const apiClient = axios.create({
  // 建議 baseURL 直接寫到 data 層級，避免路徑出錯
  baseURL: 'http://localhost:5173',
  timeout: 5000,
});

export default apiClient;

