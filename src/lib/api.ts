import axios from "axios";

/**
 * สร้าง axios instance กลาง
 * ทุก request จะผ่านตัวนี้
 */
export const api = axios.create({
  baseURL: "http://localhost:4002",
});


/**
 * Interceptor:
 * - ดึง token จาก localStorage
 * - แนบ Authorization header ทุกครั้งก่อนยิง request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ถ้ามี token ให้แนบไป
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
