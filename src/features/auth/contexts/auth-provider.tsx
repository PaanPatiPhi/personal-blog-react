import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import SignupSuccess from "../components/SignupSuccess";
import { supabaseAuth } from "@/lib/supabaseAuth";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import type {
  UserProfile,
  AuthState,
  LoginPayload,
  RegisterPayload,
  AuthContextType,
  AuthProviderProps,
} from "./auth-types";

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  

  /* ======================
     Restore Session on Refresh
     - ทำให้ refresh แล้วไม่หลุด Login
     ====================== */
useEffect(() => {
  const restoreUser = async () => {
    try {
      const session = await supabaseAuth.getCurrentSession();
      
      if (session?.user) {
        const userProfile: UserProfile = {
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: {
            ...session.user.user_metadata,
            // Add default role if not present
            role: (session.user.user_metadata as { role?: string })?.role || 'user'
          } as UserProfile['user_metadata'],
        };
        
        setState({
          loading: false,
          error: null,
          user: session.user,
        });
        
        setUser(userProfile);
      } else {
        setState({
          loading: false,
          error: null,
          user: null,
        });
      }
    } catch (error) {
      console.error(error);
      setState({
        loading: false,
        error: null,
        user: null,
      });
    }
  };

  restoreUser();

  // Set up auth state listener
  const { data: { subscription } } = supabaseAuth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const userProfile: UserProfile = {
        id: session.user.id,
        email: session.user.email || '',
        user_metadata: session.user.user_metadata as UserProfile['user_metadata'],
      };
      
      setState({
        loading: false,
        error: null,
        user: session.user,
      });
      
      setUser(userProfile);
    } else {
      setState({
        loading: false,
        error: null,
        user: null,
      });
      setUser(null);
    }
  });

  return () => subscription.unsubscribe();
}, []);

  /* ======================
     Login
     ====================== */
  const userLogin = async (data: LoginPayload) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const result = await supabaseAuth.signIn(data.email, data.password);
      
      if (result.user) {
        const userProfile: UserProfile = {
          id: result.user.id,
          email: result.user.email || '',
          user_metadata: result.user.user_metadata as UserProfile['user_metadata'],
        };
        
        setState({
          loading: false,
          error: null,
          user: result.user,
        });
        
        setUser(userProfile);
        
        // ✅ Success toast สำหรับ user login
        toast.success("Login successful! Welcome back!");

        // ปิด modal
        setLoginModalOpen(false);
        navigate("/");
      } else {
        // ❌ ถ้าไม่มี user แสดงว่า login ไม่สำเร็จ
        throw new Error("Invalid email or password");
      }
    } catch (error: unknown) {
      console.error(error);

      setState({
        loading: false,
        error: "Login failed",
        user: null,
      });
      
      // ❌ Error toast สำหรับ login failed - รองรับ error message จาก Supabase
      const errorMessage = (error as any)?.message || (error as any)?.error_description || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      
      // ❌ Re-throw error ให้ LoginPage จับได้
      throw error;
    }
  };

  const adminLogin = async (data: LoginPayload): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const result = await supabaseAuth.signIn(data.email, data.password);
    
      if (result.user) {
        const userProfile: UserProfile = {
          id: result.user.id,
          email: result.user.email || '',
          user_metadata: {
            ...result.user.user_metadata,
            // Add default role if not present
            role: (result.user.user_metadata as { role?: string })?.role || 'user'
          } as UserProfile['user_metadata'],
        };
      
        // Check if user has admin role
        if (userProfile.user_metadata.role !== 'admin') {
          throw new Error('Access denied. Admin privileges required.');
        }
      
        setState({
          loading: false,
          error: null,
          user: result.user,
        });
      
        setUser(userProfile);
      
        // ✅ Success toast สำหรับ admin login
        toast.success("Admin login successful! Welcome to dashboard.");
      }
    } catch (error: unknown) {
      setState({
        loading: false,
        error: "Login failed",
        user: null,
      });

      // ❌ Error toast สำหรับ admin login failed - รองรับ error message จาก Supabase
      const errorMessage = (error as any)?.message || (error as any)?.error_description || "Admin login failed. Please check your credentials and admin privileges.";
      toast.error(errorMessage);

      throw error;
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
      await supabaseAuth.signUp(email, password, username, name);
      
      // ✅ Success toast สำหรับ registration
      toast.success("Registration successful! Please check your email to verify your account.");
      
      <SignupSuccess />
    } catch (error) {
      console.error(error);
      
      // ❌ Error toast สำหรับ registration failed
      toast.error("Registration failed. Please try again.");
    }
  };

  /* ======================
     Logout
     - ลบ session
     - reset state
     ====================== */
  const logout = async () => {
    try {
      await supabaseAuth.signOut();
      
      // ✅ Success toast สำหรับ logout
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error('Logout error:', error);
    }

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

  // เช็คว่า admin
  const isAdmin = Boolean(user?.user_metadata?.role === "admin");
  
  // ถ้าไม่มี role ใน metadata ให้ตรวจสอบผ่าน API
  const [isAdminFromAPI, setIsAdminFromAPI] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAdminRole = async () => {
      if (user?.id && !user?.user_metadata?.role) {
        try {
          const response = await api.get(`/users/${user.id}/role`);
          const userRole = response.data?.role;
          setIsAdminFromAPI(userRole === 'admin');
        } catch (error) {
          setIsAdminFromAPI(false);
          console.error(error)
        }
      } else if (user?.user_metadata?.role) {
        // มี role ใน metadata ใช้เลย
        setIsAdminFromAPI(user?.user_metadata?.role === 'admin');
      }
    };
    
    checkAdminRole();
  }, [user?.id, user?.user_metadata?.role]);
  
  // ใช้ค่าจาก API ถ้ามี ไม่ใช้ค่าจาก metadata
  const finalIsAdmin = isAdminFromAPI !== null ? isAdminFromAPI : isAdmin;
  /* ======================
     Provider Value
     ====================== */
  return (
    <AuthContext.Provider
      value={{
        state,
        user,

        userLogin,
        adminLogin,
        register,
        logout,

        isAuthenticated,
        isAdmin: finalIsAdmin, // ใช้ค่าจาก API หรือ metadata
        
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
