import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/* ======================
   Types
====================== */

// โครงสร้างข้อมูลที่อยู่ใน JWT
interface JwtPayload {
  sub: string;        // user id
  email?: string;
  role?: string;      // ใช้สำหรับ role-based access
  exp?: number;       // token expiry
}

// ข้อมูล user แบบเต็ม (กรณีมี endpoint profile)
interface User {
  name: string;
  email: string;
  username: string;
}

// สถานะ auth หลักของระบบ
interface AuthState {
  loading: boolean;
  error: string | null;
  user: JwtPayload | null;  // user จาก JWT (source of truth)
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
}

interface AuthContextType {
  state: AuthState;
  user: User | null;

  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;

  isAuthenticated: boolean;   // เช็คว่า login แล้วหรือยัง
  isAdmin: boolean;           // เช็ค role admin

  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ======================
   Context
====================== */

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* ======================
   Provider
====================== */

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  // state หลักของ auth (ถือเป็น source of truth)
  const [state, setState] = useState<AuthState>({
    loading: false,
    error: null,
    user: null,
  });

  // optional: เก็บ user profile เต็ม
  const [user, setUser] = useState<User | null>(null);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  /* ======================
     Restore Token on Refresh
     - ทำให้ refresh แล้วไม่หลุด login
  ====================== */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        setState({
          loading: false,
          error: null,
          user: decoded,
        });
      } catch {
        // ถ้า token เสีย ให้ลบออก
        localStorage.removeItem("token");
      }
    }
  }, []);

  /* ======================
     Login
  ====================== */
  const login = async (data: LoginPayload) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const result = await axios.post(
        "http://localhost:4002/auth/login",
        data
      );

      const token = result.data.access_token;

      // เก็บ token ลง localStorage
      localStorage.setItem("token", token);

      // decode token เพื่อดึง role / id
      const decoded = jwtDecode<JwtPayload>(token);

      // อัปเดต state (source of truth)
      setState({
        loading: false,
        error: null,
        user: decoded,
      });

      // ปิด modal
      setLoginModalOpen(false);

      navigate("/");
    } catch (error) {
      console.log(error);

      setState({
        loading: false,
        error: "Login failed",
        user: null,
      });
    }
  };

  /* ======================
     Register
  ====================== */
  const register = async ({
    email,
    password,
    username,
    name,
  }: RegisterPayload) => {
    try {
      await axios.post(
        "http://localhost:4002/auth/register",
        { email, password, username, name }
      );

      alert("Sign up completed. Please verify email.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Sign up failed");
    }
  };

  /* ======================
     Logout
     - ลบ token
     - reset state
  ====================== */
  const logout = () => {
    localStorage.removeItem("token");

    setState({
      loading: false,
      error: null,
      user: null,
    });

    setUser(null);

    navigate("/");
  };

  /* ======================
     Derived State
     - คำนวณจาก state.user
  ====================== */

  // login แล้วหรือยัง
  const isAuthenticated = Boolean(state.user);

  // เช็ค role admin
  const isAdmin = state.user?.role === "admin";

  /* ======================
     Provider Value
  ====================== */
  return (
    <AuthContext.Provider
      value={{
        state,
        user,

        login,
        register,
        logout,

        isAuthenticated,
        isAdmin,

        loginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ======================
   Custom Hook
====================== */

const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
};

export { AuthProvider, useAuth };