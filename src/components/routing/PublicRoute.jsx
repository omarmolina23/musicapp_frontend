import { useAuth } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
