import { createContext, useContext, useState, useEffect } from "react";
import { mockUser } from "../../../mock/mockuser";

type AuthContextType = {
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mock_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email: string, password: string) => {
    if (
      email === mockUser.email &&
      password === mockUser.password
    ) {
      const userData = { name: mockUser.name, email };
      setUser(userData);
      localStorage.setItem("mock_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mock_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
