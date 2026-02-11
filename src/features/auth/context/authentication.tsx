import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/* ======================
   Types
====================== */

// interface JwtPayload {
//   sub: string;
//   email?: string;
//   role?: string;
//   exp?: number;
// }

interface User {
  name: string;
  email: string;
  username: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  user: JwtPayload | null;
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

  isAuthenticated: boolean;

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
  const [state, setState] = useState<AuthState>({
    loading: false,
    error: null,
    user: null,
  });

  const [user, setUser] = useState<User | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  /* -------- login -------- */
  const login = async (data: LoginPayload) => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const result = await axios.post(
        "http://localhost:4002/auth/login",
        data
      );

      const token = result.data.access_token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      setState({
        loading: false,
        error: null,
        user: decoded,
      });

      setUser(user);
      setLoginModalOpen(false);
      navigate("/");
    } catch(error) {
      console.log(error)
      setState({
        loading: false,
        error: "Login failed",
        user: null,
      });
    }
  };

  /* -------- register -------- */
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
    } catch(error) {
        console.log(error)
      alert("Sign up failed");
    }
  };

  /* -------- logout -------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setState({
      loading: false,
      error: null,
      user: null,
    });

    setUser(null);
    navigate("/");
  };

  const isAuthenticated = Boolean(
    localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider
      value={{
        state,
        user,

        login,
        register,
        logout,
        isAuthenticated,

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
   Hook
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
