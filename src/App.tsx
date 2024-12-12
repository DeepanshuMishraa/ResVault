import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import { Toaster } from "./components/ui/toaster";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <AppRoutes />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>       
  );
}

export default App;
