import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FaBars } from "react-icons/fa";

export default function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Desktop sidebar — static, always visible on desktop */}
      {isDesktop && (
        <aside style={{
          width: 256,
          flexShrink: 0,
          minHeight: "100vh",
          background: "#F2F4F6",
          borderRight: "1px solid #BFC9BD",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}>
          <NavBar navOpen={true} onClose={() => {}} />
        </aside>
      )}

      {/* Mobile sliding sidebar */}
      {!isDesktop && (
        <NavBar navOpen={navOpen} onClose={() => setNavOpen(false)} />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Mobile top bar */}
        {!isDesktop && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "#F2F4F6",
            borderBottom: "1px solid #BFC9BD",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}>
            <h1 style={{
              fontFamily: "Inter", fontSize: 18,
              fontWeight: 700, color: "#004C22", margin: 0,
            }}>
              EcoSpend
            </h1>
            <button
              onClick={() => setNavOpen(true)}
              style={{
                background: "none", border: "none",
                cursor: "pointer", padding: 8,
                display: "flex", alignItems: "center",
              }}
            >
              <FaBars size={22} color="#004C22" />
            </button>
          </div>
        )}

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}