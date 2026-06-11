import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

export default function CTASection() {
    return (
      <section
        style={{
          width: "100%",
          padding: "48px 40px",
          background: "#166534",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* decorative background shape */}
        <div
          style={{
            position: "absolute",
            top: "-90px",
            right: "-120px",
            width: "400px",
            height: "400px",
            background: "#93E0A2",
            opacity: 0.1,
            transform: "rotate(12deg)",
            borderRadius: "40px",
          }}
        />
  
        {/* content container */}
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          {/* TITLE */}
          <h2
            style={{
              margin: 0,
              textAlign: "center",
              color: "#93E0A2",
              fontSize: "48px",
              fontFamily: "Inter",
              fontWeight: 700,
              lineHeight: "56px",
            }}
          >
            Ready to change your spending habits?
          </h2>
  
          {/* DESCRIPTION */}
          <p
            style={{
              margin: 0,
              textAlign: "center",
              maxWidth: "672px",
              color: "#93E0A2",
              fontSize: "18px",
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: "28px",
              opacity: 0.9,
            }}
          >
            Join the movement today and start building a financial future that aligns
            with your environmental values. Simple, secure, and sustainable.
          </p>
  
          {/* BUTTON WRAPPER */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Link
  to="/SignupPage"
  className="signup-btn"
  style={{
    background: "#004C22",
    color: "white",
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: 600,
    padding: "16px 48px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    transition: "0.2s ease",
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.transform = "translateY(-2px)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.transform = "translateY(0px)")
  }
>
  Sign Up Now
</Link>
          </div>
        </div>
      </section>
    );
  }