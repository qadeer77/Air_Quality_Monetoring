import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/1644693/1644693-sd_640_360_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 animate-fadeIn">
          Welcome to Air Quality Monitoring
        </h1>
        <p className="text-lg mb-8 text-center max-w-2xl animate-fadeIn delay-1s">
          Our website provides real-time air quality information for various
          cities around the world. Stay informed about the air quality in your
          area and take necessary precautions to protect your health.
        </p>
        <div className="flex space-x-4 animate-fadeIn delay-2s">
          <Link to="/signup">
            <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
