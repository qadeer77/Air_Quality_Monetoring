import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User successfully signed up!", { position: "top-center" });
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed up with Google!", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: "top-center" });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/2157006/2157006-sd_640_360_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-semibold text-white mb-4 text-center uppercase tracking-wide">
            Sign Up
          </h1>
          <form onSubmit={e => e.preventDefault()}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-white mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="w-full p-2 bg-indigo-600 text-white rounded-md font-medium text-sm hover:bg-indigo-700 transition duration-300 mb-3"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>

            {/* Google Sign-up Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full p-2 bg-white text-gray-700 rounded-md font-medium text-sm hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </form>
          <div className="mt-4 text-center text-white">
            Already have an account?{" "}
            <Link to="/login">
              <button className="text-white hover:text-gray-300 font-medium focus:outline-none">
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
