import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaPhoneAlt,      // Icon for Agenda Call
  FaClipboardList, // Icon for Message Logs
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // Tracks active link

  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <h1>Ranka</h1>
        </div>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Left side of Navbar: Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/home"
            onClick={() => setActiveLink("home")}
            className={`text-gray-800 hover:text-gray-500 transition-all flex items-center ${
              activeLink === "home" && "font-bold border-b-2 border-blue-500"
            }`}
          >
            <FaHome className="mr-2" /> Home
          </Link>

          <Link
            to="/about"
            onClick={() => setActiveLink("about")}
            className={`text-gray-800 hover:text-gray-500 transition-all flex items-center ${
              activeLink === "about" && "font-bold border-b-2 border-blue-500"
            }`}
          >
            <FaInfoCircle className="mr-2" /> About
          </Link>

          {isAuthenticated && userRole === "Admin" && (
            <Link
              to="/admin-panel"
              onClick={() => setActiveLink("admin")}
              className={`text-gray-800 hover:text-gray-500 transition-all inline-flex items-center ${
                activeLink === "admin" && "font-bold border-b-2 border-blue-500"
              }`}
            >
              <FaUser className="mr-2" /> Admin Panel
            </Link>
          )}

          {/* Agenda Call Tab */}
          {isAuthenticated && (
            <Link
              to="/agentcall"
              onClick={() => setActiveLink("agentcall")}
              className={`text-gray-800 hover:text-gray-500 transition-all flex items-center ${
                activeLink === "agentcall" && "font-bold border-b-2 border-blue-500"
              }`}
             >
              <FaPhoneAlt className="mr-2" /> Agent Call
            </Link>
          )}

          {/* Message Logs Tab */}
          {isAuthenticated && (
            <Link
              to="/messageLogs"
              onClick={() => setActiveLink("logs")}
              className={`text-gray-800 hover:text-gray-500 transition-all flex items-center ${
                activeLink === "logs" && "font-bold border-b-2 border-blue-500"
              }`}
             >
              <FaClipboardList className="mr-2" /> Message Logs
            </Link>
          )}
        </div>

        {/* Right side of Navbar: Login/Register or Logout */}
        <div className="hidden md:flex space-x-6">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-red-500 transition-all flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-500 transition-all"
              >
                <FaUser /> Login
              </Link>
              <Link
                to="/register"
                className="text-gray-800 hover:text-gray-500 transition-all"
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 p-4 mt-2 rounded-lg shadow-lg">
          <Link
            to="/home"
            className={`block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all ${
              activeLink === "home" && "font-bold border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setActiveLink("home");
              setMenuOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all ${
              activeLink === "about" && "font-bold border-b-2 border-blue-500"
            }`}
            onClick={() => {
              setActiveLink("about");
              setMenuOpen(false);
            }}
          >
            About
          </Link>

          {isAuthenticated && userRole === "Admin" && (
            <Link
              to="/admin-panel"
              className={`block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all ${
                activeLink === "admin" && "font-bold border-b-2 border-blue-500"
              }`}
              onClick={() => {
                setActiveLink("admin");
                setMenuOpen(false);
              }}
            >
              Admin Panel
            </Link>
          )}

          {/* Agenda Call Tab for Mobile */}
          {isAuthenticated && (
            <Link
              to="/agendacall"
              className={`block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all ${
                activeLink === "agendacall" && "font-bold border-b-2 border-blue-500"
              }`}
              onClick={() => {
                setActiveLink("agendacall");
                setMenuOpen(false);
              }}
            >
              Agent Call
            </Link>
          )}

          {/* Message Logs Tab for Mobile */}
          {isAuthenticated && (
            <Link
              to="/messageLogs"
              className={`block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all ${
                activeLink === "logs" && "font-bold border-b-2 border-blue-500"
              }`}
              onClick={() => {
                setActiveLink("logs");
                setMenuOpen(false);
              }}
            >
              Message Logs
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-red-500 hover:bg-gray-200 rounded-md transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
