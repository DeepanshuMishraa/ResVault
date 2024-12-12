import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@/lib/AuthContext";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        login(response.data.token);
        navigate("/explore");
      } else {
        toast({
          title: "Login Failed",
          description: response.data.message || "Unable to login",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-rubik">
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sm:mx-auto sm:w-full sm:max-w-md text-center"
        >
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign in
                    </>
                  )}
                </Button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                to="/register"
              >
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
