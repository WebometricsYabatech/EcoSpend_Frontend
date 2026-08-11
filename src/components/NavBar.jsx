import React, { useState, useEffect } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHistory, FaSignOutAlt, FaTimes, FaBars, FaUser } from "react-icons/fa";
import dashboard from "../assets/dashboardIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import settingsIcon from "../assets/settings.svg";
import uploadIcon from "../assets/uploadIcon.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("avatarUrl") || null
  );
  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setNavOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen for avatar/name updates from ProfileSettings
  useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatarUrl(localStorage.getItem("avatarUrl") || null);
      setUserName(localStorage.getItem("userName") || "");
    };
    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    return () => window.removeEventListener("avatarUpdated", handleAvatarUpdate);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <img src={dashboard} alt="dashboard" style={{ width: 18, height: 18 }} /> },
    { name: "Upload Receipt", path: "/UploadReceipt", icon: <img src={uploadIcon} alt="upload" style={{ width: 18, height: 18 }} /> },
    { name: "Receipt History", path: "/ReceiptHistory", icon: <FaHistory /> },
    { name: "Profile", path: "/ProfileAndSettings", icon: <img src={profileIcon} alt="profile" style={{ width: 18, height: 18 }} /> },
    { name: "Settings", path: "/ProfileAndSettings", icon: <img src={settingsIcon} alt="settings" style={{ width: 18, height: 18 }} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("userName");
    navigate("/LoginPage");
  };

  const sidebarContent = (
    <div
  style={{
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
  }}
>
      <div>
        {/* Logo + close button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "Inter", fontSize: 20, fontWeight: 700, color: "#004C22", margin: 0 }}>
              EcoSpend
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(64,73,64,0.7)" }}>
              Sustainable Finance
            </p>
          </div>
          {!isDesktop && (
            <button
              onClick={() => setNavOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <FaTimes size={18} color="#404940" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => !isDesktop && setNavOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                background: isActive ? "#6BFF8F" : "transparent",
                color: isActive ? "#007432" : "#404940",
              })}
            >
              <span style={{ fontSize: 18, display: "flex" }}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ── BOTTOM: User card + Logout ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>

        {/* User card */}
        <div
          onClick={() => navigate("/ProfileAndSettings")}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            borderTop: "1px solid #BFC9BD",
            paddingTop: 16,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#E6E8EA"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          {/* Avatar */}
          <div style={{
            width: 36, height: 36, borderRadius: 9999,
            background: "#E6E8EA", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, border: "2px solid white",
          }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={() => {
                  setAvatarUrl(null);
                  localStorage.removeItem("avatarUrl");
                }}
              />
            ) : (
              <FaUser size={16} color="#BFC9BD" />
            )}
          </div>

          {/* Name */}
          <span style={{
            fontSize: 13, fontWeight: 600, color: "#191C1E",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            flex: 1,
          }}>
            {userName || "My Account"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 16px", borderRadius: 8,
            border: "none", background: "none",
            fontSize: 14, fontWeight: 600,
            color: "#BA1A1A", cursor: "pointer",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#FFDAD6"}
          onMouseLeave={(e) => e.currentTarget.style.background = "none"}
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  // ── DESKTOP: static sidebar ──
  if (isDesktop) {
    return (
      <aside
        style={{
          width: 256,
          height: "100vh",
          flexShrink: 0,
          background: "#F2F4F6",
          borderRight: "1px solid #BFC9BD",
          padding: 16,
          boxSizing: "border-box",
          overflow: "hidden",
          position: "sticky",
          top: 0,
        }}
      >
        {sidebarContent}
      </aside>
    );
  }

  // ── MOBILE: hamburger + sliding drawer ──
  return (
    <>
      {/* Top bar with hamburger */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "#F2F4F6",
        borderBottom: "1px solid #BFC9BD",
        zIndex: 1000,
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 700, color: "#004C22", margin: 0 }}>
            EcoSpend
          </h1>
        </div>
        <button
          onClick={() => setNavOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex" }}
        >
          <FaBars size={22} color="#004C22" />
        </button>
      </div>

      {/* Overlay */}
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1001,
          }}
        />
      )}

      {/* Sliding drawer */}
      <aside style={{
        position: "fixed",
        top: 0,
        left: navOpen ? 0 : "-260px",
        height: "100vh",
        width: 256,
        background: "#F2F4F6",
        borderRight: "1px solid #BFC9BD",
        padding: 16,
        zIndex: 1002,
        transition: "left 0.3s ease",
        boxSizing: "border-box",
      }}>
        {sidebarContent}
      </aside>
    </>
  );
}