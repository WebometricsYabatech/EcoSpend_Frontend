import React from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaShare, FaAt } from "react-icons/fa6";
import ecoIcon from "../assets/eco-icon.svg";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#F7F9FB",
        borderTop: "1px solid rgba(191, 201, 189, 0.3)",
        padding: "48px 40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "30px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={ecoIcon}
              alt="EcoSpend"
              style={{
                width: "22px",
                height: "22px",
              }}
            />

            <span
              style={{
                color: "#004C22",
                fontSize: "20px",
                fontFamily: "Inter",
                fontWeight: 700,
                lineHeight: "28px",
              }}
            >
              EcoSpend
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              maxWidth: "320px",
              textAlign: "center",
              color: "#404940",
              fontSize: "14px",
              fontFamily: "Inter",
              lineHeight: "20px",
              margin: 0,
            }}
          >
            The world's first AI-powered platform for tracking your personal
            financial footprint.
          </p>

          {/* Social Icons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <a
              href="#"
              style={socialIconStyle}
            >
              <FaGlobe />
            </a>

            <a
              href="#"
              style={socialIconStyle}
            >
              <FaShare />
            </a>

            <a
              href="#"
              style={socialIconStyle}
            >
              <FaAt />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: "1px solid rgba(191, 201, 189, 0.3)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: "rgba(64,73,64,0.6)",
              fontSize: "14px",
              fontFamily: "Inter",
              margin: 0,
            }}
          >
            © 2026 EcoSpend. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "32px",
            }}
          >
            <Link
              to="/support"
              style={footerLinkStyle}
            >
              Support
            </Link>

            <Link
              to="/sitemap"
              style={footerLinkStyle}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialIconStyle = {
  width: "40px",
  height: "40px",
  background: "#ECEEF0",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#404940",
  textDecoration: "none",
  fontSize: "18px",
};

const footerLinkStyle = {
  color: "rgba(64,73,64,0.6)",
  textDecoration: "none",
  fontSize: "14px",
  fontFamily: "Inter",
};