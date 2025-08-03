import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!user.isAdmin) return <Navigate to="/customer/dashboard" replace />;
  
  return <Outlet />;
}