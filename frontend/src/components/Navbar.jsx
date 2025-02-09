import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import axios from 'axios';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const handleLogout = async () => {
    try {
      await axios.get('/api/v1/user/logout', {}, { withCredentials: true });
      console.log('Logout successful');

      // Clear any local state or data if necessary
      // localStorage.removeItem('user');  // Optionally, clear user data from localStorage

      // Redirect to login page after logout
      return window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // const navLinks = [
  //   { href: '#features', text: 'Features' },
  //   { href: '#roles', text: 'Roles' },
  //   { href: '#benefits', text: 'Benefits' },
  //   { href: '/register', text: 'Register' },
  // ];

  // const NavLink = ({ href, children }) => (
  //   <a
  //     href={href}
  //     className="text-gray-100 hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-blue-700"
  //   >
  //     {children}
  //   </a>
  // );

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
            {/* {navLinks.map((link) => (
              <NavLink key={link.text} href={link.href}>
                {link.text}
              </NavLink>
            ))} */}
            <a
              href="/login"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full 
              text-blue-600 bg-white hover:bg-blue-50 transition duration-300 shadow-lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </a>
            <button
              className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleLogout}
            >Logout
            </button>
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
              {/* {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-gray-100 hover:text-white block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {link.text}
                </a>
              ))} */}
              <a
                href="/login"
                className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </a>
              <button
                className="flex items-center px-3 py-2 text-gray-100 hover:text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleLogout}
              >Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;