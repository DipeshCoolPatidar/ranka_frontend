import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';  // Import the Navbar component

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main content rendered below the navbar */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
