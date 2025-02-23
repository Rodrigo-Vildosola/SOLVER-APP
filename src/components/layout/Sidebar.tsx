import React from "react";

const Sidebar: React.FC = () => {
  // Later you can wire up navigation to your main content
  const navItems = [
    { label: "Calculator", path: "calculator" },
    { label: "Variables", path: "variables" },
    { label: "Functions", path: "functions" },
    { label: "Constants", path: "constants" },
  ];

  return (
    <nav className="w-48 bg-gray-100 p-4 border-r border-gray-200">
      <ul className="space-y-2">
        {navItems.map(item => (
          <li
            key={item.label}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
