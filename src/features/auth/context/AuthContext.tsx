import { createContext, useContext, useEffect, useState } from "react";
import { mockLogin } from "../../../mock/mockAuthService";

export type User = {
  name: string;
  email: string;
  image?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isAuthenticated = !!user;

  // ✅ โหลด user จาก localStorage (ปลอดภัยขึ้น)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser) as User);
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  // ✅ login แบบ throw error
  const login = async (email: string, password: string) => {
    const result = await mockLogin(email, password); // ถ้าผิด -> throw

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    setUser(result.user);
    setLoginModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
