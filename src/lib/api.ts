import axios from "axios";
import { supabase } from "./supabase";

/**
 * สร้าง axios instance กลาง
 * ทุก request จะผ่านตัวนี้
 */
export const api = axios.create({
  baseURL: "https://blog-api-six-chi.vercel.app",
});
// baseURL: "https://blog-api-six-chi.vercel.app",

/**
 * Interceptor:
 * - ดึง session จาก Supabase
 * - แนบ Authorization header ทุกครั้งก่อนยิง request
 */
api.interceptors.request.use(
  async (config) => {
    try {
      console.log('API Interceptor - Getting session...');
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log('API Interceptor - Session:', session ? 'Found' : 'Not found');
      
      // ถ้ามี session ให้แนบ JWT token ไป
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
        // Also set in common headers for axios
        api.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
        console.log('API Interceptor - Token attached to both config and common');
      } else {
        console.warn('API Interceptor - No session found');
      }
    } catch (error) {
      console.error('API Interceptor - Error getting session:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
