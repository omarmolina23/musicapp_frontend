import { useAuth } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
