import { useAuth } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { user } = useAuth();

  console.log("user", user);

  if (!user) return <Navigate to="/login" />;

     
  return <Outlet />;
}
