import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PUBLIC_ROUTES = ['/', '/login', '/register'];

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
