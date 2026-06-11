import React from "react";
import "../App.css";
import ecoIcon from "../assets/eco-icon.svg";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "70px",
        padding: "0 40px",
        background: "#F8FAFC",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* LEFT: LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ width: 24, height: 24 }}>
          <img
            src={ecoIcon}
            alt="EcoSpend Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#004C22",
            fontFamily: "DM Sans",
          }}
        >
          EcoSpend
        </div>
      </div>

      {/* RIGHT: BUTTONS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Link
          to="/LoginPage"
          className="login-btn"
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#404940",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "inter",
          }}
        >
          Login
        </Link>

        <Link
          to="/SignupPage"
          className="signup-btn"
          style={{
            padding: "8px 24px",
            background: "#004C22",
            borderRadius: "8px",
            textDecoration: "none",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "inter",
          }}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}