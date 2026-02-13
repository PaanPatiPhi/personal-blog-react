import { useAuth } from "@/features/auth/context/authentication";
import UnauthenticatedApp from "./UnauthenticatedApp";
import AdminApp from "./AdminApp";
import AuthenticatedApp from "./AuthenticatedApp";

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

