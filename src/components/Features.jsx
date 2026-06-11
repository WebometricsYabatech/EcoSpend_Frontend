import React from "react";
import '../App.css';


import {
    FaCamera,
    FaChartLine,
    FaLightbulb,
    FaChartBar,
  } from "react-icons/fa";
  
  export default function Features() {
    const features = [
      {
        title: "AI Receipt Scanning",
        desc:
          "Snap a photo and let our AI instantly categorize items and calculate carbon impact.",
        icon: <FaCamera />,
        bg: "rgba(22, 101, 52, 0.10)",
        color: "#004C22",
      },
      {
        title: "Personalized Eco Score",
        desc:
          "Get a real-time metric that reflects your spending habits and footprint.",
        icon: <FaChartLine />,
        bg: "rgba(107, 255, 143, 0.20)",
        color: "#006E2F",
      },
      {
        title: "Actionable Insights",
        desc:
          "AI-driven suggestions tailored to reduce your carbon footprint.",
        icon: <FaLightbulb />,
        bg: "rgba(212, 228, 250, 1)",
        color: "#39485A",
      },
      {
        title: "Historical Trends",
        desc:
          "Track financial and environmental progress over time with clear charts.",
        icon: <FaChartBar />,
        bg: "rgba(224, 227, 229, 1)",
        color: "#404940",
      },
    ];
  
    return (
      <section
        style={{
          width: "100%",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
          background: "#FFFFFF",
        }}
      >
        {/* HEADER */}
        <div style={{ maxWidth: "720px", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "32px",
              fontFamily: "Inter",
              fontWeight: 700,
              color: "#191C1E",
              marginBottom: "8px",
            }}
          >
            Built for the Conscious Consumer
          </h2>
  
          <p
            style={{
              fontSize: "16px",
              fontFamily: "Inter",
              color: "#404940",
              lineHeight: "24px",
            }}
          >
            We bridge the gap between your wallet and the world, helping you make
            impactful financial decisions.
          </p>
        </div>
  
        {/* GRID */}
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                border: "1px solid rgba(191,201,189,0.2)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </span>
              </div>
  
              {/* TITLE */}
              <h3
                style={{
                  fontSize: "20px",
                  fontFamily: "Inter",
                  fontWeight: 600,
                  color: "#191C1E",
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
  
              {/* DESC */}
              <p
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  color: "#404940",
                  lineHeight: "20px",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }