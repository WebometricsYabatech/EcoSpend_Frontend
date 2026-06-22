import React, { useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaCalendarAlt,
  FaDownload,
  FaEdit,
  FaChevronRight,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

// Impact grade color helper
const getImpactColor = (grade) => {
  if (!grade) return "#404940";
  if (grade.startsWith("A")) return "#006E2F";
  if (grade.startsWith("B")) return "#4CAF50";
  if (grade.startsWith("C")) return "#F59E0B";
  return "#BA1A1A";
};

const getItemBg = (grade) => {
  if (!grade) return "#E6E8EA";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#8BD79B";
  return "#E6E8EA";
};

const getItemIconColor = (grade) => {
  if (!grade) return "#404940";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#004C22";
  return "#404940";
};

export default function ReceiptDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  // Data passed from ReviewReceipt after confirmation
  const receiptData = location.state?.confirmedData || {
    store: "Whole Foods Market",
    location: "San Francisco, CA",
    date: "Oct 24, 2023 • 14:32",
    total: "$42.85",
    ecoScore: 84,
    ecoLabel: "High Impact",
    ecoMessage: "Excellent choice! 85% of items are organic.",
    goalProgress: 78,
    goalMessage:
      'This purchase contributes 12% to your "Sustainable Groceries" monthly goal. You\'ve avoided 4.2kg of CO2 today!',
    items: [
      {
        name: "Organic Spinach (5oz)",
        category: "Produce",
        tag: "High Sustainability",
        price: "$4.99",
        grade: "A+",
      },
      {
        name: "Almond Milk (Unsweetened)",
        category: "Dairy Alt",
        tag: "Low Water Waste",
        price: "$5.50",
        grade: "A",
      },
      {
        name: "Paper Towels (6 pack)",
        category: "Household",
        tag: "Plastic Packaging",
        price: "$12.99",
        grade: "C-",
      },
      {
        name: "Avocado (Organic Bag)",
        category: "Produce",
        tag: "Ethically Sourced",
        price: "$6.49",
        grade: "A+",
      },
      {
        name: "Fair Trade Coffee",
        category: "Beverages",
        tag: "Ethical Sourcing",
        price: "$12.50",
        grade: "B+",
      },
    ],
  };

  const visibleItems = showAllItems
    ? receiptData.items
    : receiptData.items.slice(0, 4);

  // Eco score circle
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (receiptData.ecoScore / 100) * circumference;

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "96px 40px 48px",
        fontFamily: "Inter",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        {/* Left: back icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              border: "1px solid #E6E8EA",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaLeaf color="#004C22" size={16} />
          </button>
          <div>
            <h1
              style={{
                fontFamily: "inter",
                fontSize: 32,
                fontWeight: 700,
                color: "#191C1E",
                margin: 0,
                lineHeight: "40px",
              }}
            >
              Receipt Details
            </h1>
            <p
              style={{
                margin: 0,
                color: "#404940",
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              Review your transaction and sustainability impact
            </p>
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #BFC9BD",
              background: "white",
              fontSize: 14,
              fontWeight: 600,
              color: "#404940",
              cursor: "pointer",
            }}
          >
            <FaDownload size={13} />
            Download PDF
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: "#004C22",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <FaEdit size={13} />
            Edit Receipt
          </button>
        </div>
      </div>

      {/* ── MAIN GRID: left col + right col ── */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* ── LEFT COLUMN: scanned receipt image ── */}
        <div style={{ width: "35%", flexShrink: 0 }}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #E6E8EA",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Image header */}
            <div
              style={{
                padding: 16,
                background: "#F2F4F6",
                borderBottom: "1px solid #E0E3E5",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#191C1E" }}>
                Scanned Receipt View
              </span>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#404940",
                }}
              >
                {expanded ? <FaCompress size={16} /> : <FaExpand size={16} />}
              </button>
            </div>

            {/* Receipt image */}
            <div
              style={{
                background: "#ECEEF0",
                position: "relative",
                height: expanded ? "auto" : 503,
                overflow: "hidden",
              }}
            >
              <img
                src="https://placehold.co/400x600"
                alt="Scanned receipt"
                style={{
                  width: "100%",
                  display: "block",
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ── MERCHANT + SUMMARY CARD ── */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #E6E8EA",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Merchant */}
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#404940",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                MERCHANT
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#F2F4F6",
                    borderRadius: 12,
                    border: "1px solid #E0E3E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaLeaf color="#006E2F" size={20} />
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "DM Sans",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#191C1E",
                      lineHeight: "28px",
                    }}
                  >
                    {receiptData.store}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "#404940",
                      lineHeight: "20px",
                    }}
                  >
                    {receiptData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#404940",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                DATE & TIME
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <FaCalendarAlt color="#404940" size={18} />
                <span style={{ fontSize: 16, color: "#191C1E" }}>
                  {receiptData.date}
                </span>
              </div>
            </div>

            {/* Total */}
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#404940",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                TOTAL AMOUNT
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "inter",
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#004C22",
                  lineHeight: "56px",
                }}
              >
                {receiptData.total}
              </p>
            </div>

            {/* Eco Score */}
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#404940",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                ECO-SCORE
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* SVG circle */}
                <svg width={64} height={64}>
                  <circle
                    cx={32}
                    cy={32}
                    r={radius}
                    fill="none"
                    stroke="#E6E8EA"
                    strokeWidth={6}
                  />
                  <circle
                    cx={32}
                    cy={32}
                    r={radius}
                    fill="none"
                    stroke="#006E2F"
                    strokeWidth={6}
                    strokeDasharray={`${strokeDash} ${circumference}`}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize={16}
                    fontWeight={700}
                    fill="#191C1E"
                    fontFamily="Inter"
                  >
                    {receiptData.ecoScore}
                  </text>
                </svg>

                <div>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#6BFF8F",
                      color: "#007432",
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "3px 8px",
                      borderRadius: 4,
                      marginBottom: 6,
                    }}
                  >
                    {receiptData.ecoLabel}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "#404940",
                      lineHeight: "20px",
                    }}
                  >
                    {receiptData.ecoMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── ITEMIZED BREAKDOWN ── */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #E6E8EA",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: 24,
                borderBottom: "1px solid #E6E8EA",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontFamily: "inter",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#191C1E",
                }}
              >
                Itemized Breakdown
              </h2>
              <span
                style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}
              >
                {receiptData.items.length} Items
              </span>
            </div>

            {/* Item rows */}
            {visibleItems.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: 16,
                  borderTop: index === 0 ? "none" : "1px solid #E6E8EA",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Left: icon + name */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: getItemBg(item.grade),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaLeaf color={getItemIconColor(item.grade)} size={16} />
                  </div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#191C1E",
                        lineHeight: "20px",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: "#404940",
                        lineHeight: "20px",
                      }}
                    >
                      {item.category} • {item.tag}
                    </p>
                  </div>
                </div>

                {/* Right: price + grade */}
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#191C1E",
                        lineHeight: "20px",
                      }}
                    >
                      {item.price}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 500,
                        color: getImpactColor(item.grade),
                        lineHeight: "16px",
                      }}
                    >
                      {item.grade} Impact
                    </p>
                  </div>
                  <FaChevronRight color="#404940" size={10} opacity={0} />
                </div>
              </div>
            ))}

            {/* View all toggle */}
            {receiptData.items.length > 4 && (
              <button
                onClick={() => setShowAllItems(!showAllItems)}
                style={{
                  width: "100%",
                  padding: "18px 16px",
                  background: "white",
                  border: "none",
                  borderTop: "1px solid #E6E8EA",
                  color: "#004C22",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {showAllItems
                  ? "Show less"
                  : `View all ${receiptData.items.length} items`}
              </button>
            )}
          </div>

          {/* ── GOAL PROGRESS CARD ── */}
          <div
            style={{
              background: "#166534",
              borderRadius: 12,
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative bg shape */}
            <div
              style={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 120,
                height: 100,
                background: "#93E0A2",
                opacity: 0.1,
                borderRadius: 8,
              }}
            />

            {/* Left text */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <FaLeaf color="#93E0A2" size={16} />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "inter",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#93E0A2",
                  }}
                >
                  Goal Progress
                </h3>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  color: "#93E0A2",
                  opacity: 0.9,
                  lineHeight: "24px",
                }}
              >
                {receiptData.goalMessage}
              </p>
            </div>

            {/* Right progress widget */}
            <div
              style={{
                width: 192,
                padding: 16,
                background: "rgba(255,255,255,0.10)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.20)",
                backdropFilter: "blur(2px)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 500, color: "#93E0A2" }}
                >
                  Monthly Goal
                </span>
                <span
                  style={{ fontSize: 12, fontWeight: 500, color: "#93E0A2" }}
                >
                  {receiptData.goalProgress}%
                </span>
              </div>

              <div
                style={{
                  height: 8,
                  background: "rgba(255,255,255,0.20)",
                  borderRadius: 9999,
                  overflow: "hidden",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${receiptData.goalProgress}%`,
                    background: "#6BFF8F",
                    borderRadius: 9999,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>

              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#93E0A2",
                }}
              >
                Almost there!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}