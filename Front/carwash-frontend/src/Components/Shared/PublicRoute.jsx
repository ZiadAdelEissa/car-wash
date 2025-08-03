import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.role === 'super-admin' ? "/AdminDashboard" : "/profile"} replace />;
  }

  return children;
}