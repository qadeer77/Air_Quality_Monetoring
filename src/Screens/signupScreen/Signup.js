import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Ensure this is your firebase configuration file
import "tailwindcss/tailwind.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      // Create a new user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User successfully signed up!", { position: "top-center" });

      // Redirect user to the home page after successful signup
      navigate("/"); // Navigate to home page after signup
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: "top-center" });
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center uppercase tracking-wide">
            Sign Up
          </h1>
          <form onSubmit={e => e.preventDefault()}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="w-full p-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-md font-medium text-sm hover:opacity-90 transition duration-300 flex items-center justify-center"
              onClick={handleSignup}
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login">
              <button className="text-gray-800 hover:text-gray-900 font-medium focus:outline-none">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
