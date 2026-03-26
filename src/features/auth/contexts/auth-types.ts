import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  user_metadata: {
    username: string;
    name: string;
    role?: string;
  };
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;  // user จาก Supabase
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface AuthContextType {
  state: AuthState;
  user: UserProfile | null;

  userLogin: (data: LoginPayload) => Promise<void>;  
  adminLogin: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;

  isAuthenticated: boolean;   // เช็คว่า login แล้วหรือยัง
  isAdmin: boolean;           // เช็คว่า admin หรือไม่
  
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
