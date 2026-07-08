import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Mobile overlay */}
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar — hidden on mobile, slides in when open */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        height: "100vh", zIndex: 50,
        transform: navOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
      }}
        className="lg:static lg:translate-x-0 lg:transition-none"
      >
        <NavBar onClose={() => setNavOpen(false)} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Mobile top bar */}
        <div
          className="lg:hidden"
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "#F2F4F6",
            borderBottom: "1px solid #BFC9BD",
            position: "sticky", top: 0, zIndex: 30,
          }}
        >
          <h1 style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 700, color: "#004C22", margin: 0 }}>
            EcoSpend
          </h1>
          <button
            onClick={() => setNavOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaBars size={20} color="#004C22" />
          </button>
        </div>

        {/* Page content */}
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}