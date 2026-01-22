import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginModalOpen: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // init from localStorage (mock)
  useEffect(() => {
    const rawUser = localStorage.getItem("mock_user");
    const rawToken = localStorage.getItem("mock_token");
    if (rawUser) setUser(JSON.parse(rawUser));
    if (rawToken) setToken(rawToken);
  }, []);

  useEffect(() => {
    if (token) {
      // optional: set axios header if you use axios
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // mock login: accept any credentials, persist to localStorage
  const login = async (email: string, _password: string) => {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 500));
    const mockUser: User = {
      id: 1,
      name: email.split("@")[0] ?? email,
      email,
      avatar: undefined,
    };
    const mockToken = "mock-token-123";
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem("mock_user", JSON.stringify(mockUser));
    localStorage.setItem("mock_token", mockToken);
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mock_user");
    localStorage.removeItem("mock_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        login,
        logout,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
        loginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}