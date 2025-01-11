import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-10 w-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <div className="ml-4 font-bold text-2xl text-black">
              Air Quality Monitoring
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="relative">
                <input
                  className="px-4 py-2 rounded-full bg-black bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-black focus:bg-opacity-70 transition duration-300 ease-in-out w-64"
                  type="text"
                  placeholder="Search..."
                />
                <svg
                  className="h-5 w-5 text-white absolute right-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <a
                href="#"
                className="text-black hover:bg-black hover:text-white hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-black hover:bg-black hover:text-white hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                Reports
              </a>
              <a
                href="#"
                className="text-black hover:bg-black hover:text-white hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                About
              </a>
              <a
                href="#"
                className="text-black hover:bg-black hover:text-white hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-black hover:bg-opacity-80 focus:outline-black   focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg">
          <div className="relative mx-2 mb-4">
            <input
              className="block w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition duration-300 ease-in-out"
              type="text"
              placeholder="Search..."
            />
            <svg
              className="h-5 w-5 text-black absolute right-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <a
            href="#"
            className="text-white hover:bg-black hover:bg-opacity-50 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-white hover:bg-black hover:bg-opacity-50 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
          >
            Reports
          </a>
          <a
            href="#"
            className="text-white hover:bg-black hover:bg-opacity-50 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:bg-black hover:bg-opacity-50 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
