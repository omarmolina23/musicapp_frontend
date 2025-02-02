import { useAuth } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const { user, isNewlyRegistered } = useAuth();

  if (user && !isNewlyRegistered) return <Navigate to="/" replace />;

  return <Outlet />;
}
