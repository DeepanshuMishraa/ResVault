import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 font-poppins right-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200"
        >
          ResVault
        </Link>
        <div className="space-x-6 flex items-center">
          <NavLink to="/explore" isActive={location.pathname === "/explore"}>
            Explore
          </NavLink>

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <Link to="/upload">Upload</Link>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </motion.button>
            </>
          ) : (
            <NavLink to="/login" isActive={location.pathname === "/login"}>
              Login
            </NavLink>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Github size={20} />
              <span className="font-medium">GitHub</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({
  to,
  children,
  isActive,
}: {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className={`text-base font-medium ${
        isActive
          ? "text-gray-800 border-b-2 border-gray-800"
          : "text-gray-600 hover:text-gray-800"
      } transition-colors duration-200`}
    >
      {children}
    </Link>
  </motion.div>
);

export default Navbar;
