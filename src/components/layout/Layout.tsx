import React from "react";
import NavBar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <NavBar />

      {/* Main content wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Panel */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
