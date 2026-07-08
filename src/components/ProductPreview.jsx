import React from "react";
import '../App.css';
import EcoDashboard from "../assets/EcoSpend-Dashboard-Preview.png";
import { FaCheckCircle } from "react-icons/fa";

export default function ProductPreview() {
    return (
      <section
        style={{
          width: "100%",
          padding: "48px 40px",
          background: "#ECEEF0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "48px",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* TITLE */}
            <h2
              style={{
                margin: 0,
                color: "#191C1E",
                fontSize: "32px",
                fontFamily: "Inter",
                fontWeight: 700,
                lineHeight: "40px",
              }}
            >
              Your Sustainable Journey,
              <br />
              Visualized.
            </h2>
  
            {/* DESCRIPTION */}
            <p
              style={{
                margin: 0,
                color: "#404940",
                fontSize: "18px",
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: "28px",
              }}
            >
              We&apos;ve designed an interface that prioritizes clarity over clutter.
              <br />
              Every data point is an opportunity to learn, grow, and contribute to
              <br />
              a healthier planet.
            </p>
  
            {/* FEATURE LIST */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "8px",
              }}
            >
              {/* ITEM 1 */}
              <div style={{ display: "flex", gap: "12px" }}>
                <FaCheckCircle
                  style={{
                    width: 20,
                    height: 20,
                    background: "#f8fafc",
                    borderRadius: 4,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                />
  
                <div>
                  <div
                    style={{
                      color: "#191C1E",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: 600,
                      lineHeight: "20px",
                      letterSpacing: "0.14px",
                    }}
                  >
                    Comprehensive Dashboard
                  </div>
  
                  <div
                    style={{
                      color: "#404940",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Overview of your eco-balance and savings in one place.
                  </div>
                </div>
              </div>
  
              {/* ITEM 2 */}
              <div style={{ display: "flex", gap: "12px" }}>
                <FaCheckCircle
                  style={{
                    width: 20,
                    height: 20,
                    background: "#f8fafc",
                    borderRadius: 4,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                />
  
                <div>
                  <div
                    style={{
                      color: "#191C1E",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: 600,
                      lineHeight: "20px",
                      letterSpacing: "0.14px",
                    }}
                  >
                    Category Breakdown
                  </div>
  
                  <div
                    style={{
                      color: "#404940",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    See exactly which spending habits contribute most to your footprint.
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* RIGHT SIDE IMAGE */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* glow */}
            <div
              style={{
                position: "absolute",
                width: 380,
                height: 380,
                background: "rgba(0, 76, 34, 0.10)",
                filter: "blur(60px)",
                borderRadius: 32,
              }}
            />
  
            {/* image */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: "#fff",
                borderRadius: 16,
                padding: 6,
                boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
                width: "100%",
                maxWidth: 520,
              }}
            >
              <img
                src={EcoDashboard}
                alt="product preview"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }