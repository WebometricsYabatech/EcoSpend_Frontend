import React from "react";
import '../App.css';

export default function SocialProof() {
    return (
      <section
        style={{
          width: "100%",
          padding: "32px 40px",
          background: "#F2F4F6",
          borderTop: "1px solid rgba(191, 201, 189, 0.30)",
          borderBottom: "1px solid rgba(191, 201, 189, 0.30)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              textAlign: "center",
              color: "#404940",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: "20px",
              letterSpacing: "1.4px",
              opacity: 0.8,
            }}
          >
            Trusted by industry leaders in sustainable finance
          </p>
        </div>
      </section>
    );
  }