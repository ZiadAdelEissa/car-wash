import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function CustomerRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (!user || user.role !== 'customer') {
    return <Navigate to="/login" replace />;
  }

  return children;
}