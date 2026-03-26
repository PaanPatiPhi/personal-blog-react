import UnauthenticatedApp from "./UnauthenticatedApp";
import AdminApp from "./AdminApp";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth } from "@/features/auth/contexts/auth-provider";

export default function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <UnauthenticatedApp />;
  }

  if (isAdmin) {
    return <AdminApp />;
  }

  return <AuthenticatedApp />;
}

