import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Home from "./pages/Home";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/explore" />} />
      <Route path="*" element={<Navigate to="/explore" />} />
    </Routes>
  );
};

export default AppRoutes;
