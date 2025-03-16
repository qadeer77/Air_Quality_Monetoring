import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <nav className=" backdrop-blur-sm rounded-xl py-5 px-5 animate-fadeIn flex justify-between items-center shadow-md mt-0 mb-5">
      {/* Left Side - User Info */}
      <div className="flex items-center gap-3">
        {user && (
          <>
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-500"
            />
            <span className="text-gray-100 drop-shadow-xl font-semibold">
              {user.displayName}
            </span>
          </>
        )}
      </div>

      {/* Center - App Logo and Name */}
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-100 drop-shadow-xl text-center">
          🌍 Air Quality Dashboard
        </h1>
      </div>

      {/* Right Side - Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
