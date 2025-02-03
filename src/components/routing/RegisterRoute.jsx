import { useAuth } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export function RegisterRoute() {
  const { isNewlyRegistered } = useAuth();

  if (!isNewlyRegistered) return <Navigate to="/" replace />;

  return <Outlet />;
}
