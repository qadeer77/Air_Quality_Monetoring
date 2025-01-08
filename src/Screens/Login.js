import React, { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login pressed");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot Password pressed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Log in to access your personalized dashboard
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="mr-2 h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline focus:outline-none"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="button"
            className="w-full p-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-md font-medium text-sm hover:opacity-90 transition duration-300"
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup">
            <button
              className="text-gray-800 hover:text-gray-900 font-medium focus:outline-none"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
