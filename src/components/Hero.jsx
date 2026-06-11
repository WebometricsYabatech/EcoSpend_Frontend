import React from "react";
import { Link } from "react-router-dom";
import Lushforest from "../assets/Lush-forest.png";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
        background: "#F7F9FB",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={Lushforest}
        alt="background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* OVERLAY (FIXED - DOES NOT BLOCK CLICKS) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(247, 249, 251, 0.15) 0%, #F7F9FB 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* BADGE */}
        <div
          style={{
            display: "inline-flex",
            padding: "4px 12px",
            borderRadius: "999px",
            background: "#D1FAE5",
            width: "fit-content",
          }}
        >
          <span
            style={{
              color: "#007432",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: 600,
            }}
          >
            Sustainability meets FinTech
          </span>
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "48px",
            fontFamily: "DM Sans",
            fontWeight: 700,
            lineHeight: "60px",
            margin: 0,
          }}
        >
          <span style={{ color: "#191C1E" }}>Track what you spend.</span>
          <br />
          <span style={{ color: "#004C22" }}>
            See what it costs the planet.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          style={{
            color: "#404940",
            fontSize: "18px",
            fontFamily: "Inter",
            fontWeight: 400,
            lineHeight: "28px",
            maxWidth: "600px",
            margin: 0,
          }}
        >
          EcoSpend uses proprietary AI to transform your everyday receipts into
          a detailed carbon footprint analysis. Take control of your financial
          health and environmental legacy in one clean interface.
        </p>

        {/* BUTTON */}
        <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
          <Link
            to="/SignupPage"
            style={{
              background: "#004C22",
              color: "white",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: 600,
              padding: "16px 48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              transition: "0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            Start Tracking for Free
            <FaArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}