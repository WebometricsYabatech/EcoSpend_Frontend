import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaHistory,
  FaFileUpload,
  FaUserEdit,
} from "react-icons/fa";
import dashboard from "../assets/dashboardicon.svg";
import profileIcon from "../assets/profileIcon.svg";
import settingsIcon from "../assets/settings.svg";
import uploadIcon from "../assets/uploadIcon.svg";
export default function NavBar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <img src={dashboard}/>,
    },
    {
      name: "Upload Receipt",
      path: "/UploadReceipt",
      icon: <img src={uploadIcon}/>,
    },
    {
      name: "Receipt History",
      path: "/ReceiptHistory",
      icon: <FaHistory />,
    },
    {
      name: "Profile",
      path: "/ProfileAndSettings",
      icon: <img src={profileIcon} />,
    },
    {
      name: "Settings",
      path: "/ProfileAndSettings",
      icon: <img src={settingsIcon}/>,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#F2F4F6] border-r border-[#BFC9BD] p-4">
      {/* Logo Section */}
      <div className="pb-6">
        <h1 className="font-['inter'] text-xl font-bold text-[#004C22]">
          EcoSpend
        </h1>

        <p className="mt-1 text-xs font-medium text-[#404940]/70">
          Sustainable Finance
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#6BFF8F] text-[#007432]"
                  : "text-[#404940] hover:bg-[#6BFF8F]"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}