<<<<<<< HEAD
import React, { useState } from "react";
import { Menu, X, LogIn, Bell, HelpCircle, CheckSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
=======
import React, { useState } from 'react';
import { Menu, X, LogIn, Bell, HelpCircle, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.post(
        "/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      // Call logout regardless of the API response to ensure local state is cleared
=======
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {}, { withCredentials: true });
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
      logout();
      window.location.href = "/login";
    } catch (err) {
<<<<<<< HEAD
      console.error("Logout error:", err);
      // Still logout locally even if the API call fails
=======
      console.error('Logout error:', err);
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
      logout();
      window.location.href = "/login";
    }
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button onClick={() => navigate('/')} className="flex items-center">
              <span className="text-white text-xl font-bold">ProjectTrack</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
<<<<<<< HEAD
            <Link
              to="/faq"
=======
            <button
              onClick={() => navigate('/faq')}
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
              className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </button>
            {isAuthenticated && (
              <>
<<<<<<< HEAD
                <Link
                  to="/notifications"
=======
                <button
                  onClick={() => navigate('/notifications')}
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
                  className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
<<<<<<< HEAD
                </Link>
                <Link
                  to="/task"
                  className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Tasks
                </Link>
=======
                </button>
                <button
                  onClick={() => navigate('/student/studentProfile')}
                  className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </button>
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
              </>
            )}
            {!isAuthenticated ? (
              <button
                onClick={() => navigate('/login')}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 transition duration-300 shadow-lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-100 hover:text-white hover:bg-blue-700"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => navigate('/faq')}
                className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </button>
              {isAuthenticated && (
                <>
<<<<<<< HEAD
                  <Link
                    to="/notifications"
=======
                  <button
                    onClick={() => navigate('/notifications')}
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
                    className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
<<<<<<< HEAD
                  </Link>
                  <Link
                    to="/tasks"
                    className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Tasks
                  </Link>
=======
                  </button>
                  <button
                    onClick={goToProfile}
                    className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </button>
>>>>>>> ae556d35c1fec0cb434647189ce229e6c6a6240a
                </>
              )}
              {!isAuthenticated ? (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
