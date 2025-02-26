import React, { useState } from 'react';
import { Menu, X, LogIn, Bell } from 'lucide-react'; // Import Bell icon
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Add this import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Add this line

  const handleLogout = async () => {
    try {
      await axios.get('/api/v1/user/logout', {}, { withCredentials: true });
      console.log('Logout successful');
      logout(); // Update auth state
      return window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-white text-xl font-bold">ProjectTrack</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <a href="/notifications" className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </a>
            {!isAuthenticated && (
              <a href="/login" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 transition duration-300 shadow-lg">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </a>
            )}
            {isAuthenticated && (
              <button className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors" onClick={handleLogout}>
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
              <a href="/notifications" className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </a>
              {!isAuthenticated && (
                <a href="/login" className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </a>
              )}
              {isAuthenticated && (
                <button className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors" onClick={handleLogout}>
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