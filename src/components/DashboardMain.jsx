import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaUpload,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { FiTrendingUp, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

// ── CATEGORY STYLES ──
const CATEGORY_STYLES = {
  FOOD: { bg: "#6BFF8F", color: "#007432" },
  ELECTRONICS: { bg: "#FFDAD6", color: "#93000A" },
  TRANSPORT: { bg: "#FEF3C7", color: "#92400E" },
  CLOTHING: { bg: "#F3E8FF", color: "#6B21A8" },
  HEALTHCARE: { bg: "#DBEAFE", color: "#1E40AF" },
  ENTERTAINMENT: { bg: "#CCFBF1", color: "#0F766E" },
  OTHER: { bg: "#E6E8EA", color: "#404940" },
};

const IMPACT_STYLES = {
  High: { color: "#006E2F" },
  Med: { color: "#D97706" },
  Low: { color: "#BA1A1A" },
};

// ── DONUT CHART ──
function DonutChart({ data, total }) {
  const size = 192;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = data.map((item) => {
    const dash = (item.percent / 100) * circumference;
    const gap = circumference - dash;
    const seg = { ...item, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E6E8EA" strokeWidth={strokeWidth} />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.dash} ${seg.gap}`}
          strokeDashoffset={-seg.offset}
        />
      ))}
      {/* Center label */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fill="#404940"
        fontFamily="Inter"
        style={{ transform: "rotate(90deg)", transformOrigin: `${cx}px ${cy}px` }}
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={16}
        fontWeight={600}
        fill="#191C1E"
        fontFamily="DM Sans"
        style={{ transform: "rotate(90deg)", transformOrigin: `${cx}px ${cy}px` }}
      >
        {total}
      </text>
    </svg>
  );
}

// ── LINE CHART ──
function EcoScoreLineChart({ data }) {
  const width = 500;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 30 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minVal = Math.min(...data.map((d) => d.score)) - 10;
  const maxVal = Math.max(...data.map((d) => d.score)) + 10;

  const x = (i) => padding.left + (i / (data.length - 1)) * chartW;
  const y = (val) => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.score)}`).join(" ");
  const areaD = `${pathD} L ${x(data.length - 1)} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#006E2F" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#006E2F" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((val) => (
        <line
          key={val}
          x1={padding.left}
          x2={padding.left + chartW}
          y1={y(val)}
          y2={y(val)}
          stroke="#E6E8EA"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      ))}

      {/* Area fill */}
      <path d={areaD} fill="url(#areaGradient)" />

      {/* Line */}
      <path d={pathD} fill="none" stroke="#006E2F" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots */}
      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.score)} r={4} fill="#006E2F" />
      ))}

      {/* X labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={x(i)}
          y={height - 6}
          textAnchor="middle"
          fontSize={12}
          fill="#404940"
          fontFamily="Inter"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

// ── MOCK DATA ──
const MOCK_DATA = {
  ecoScore: 74,
  ecoScoreChange: 5,
  totalSpent: "$1,240.50",
  budgetUsed: 78,
  receiptsUploaded: 14,
  spendingByCategory: [
    { name: "Food", color: "#006E2F", percent: 35 },
    { name: "Transport", color: "#F59E0B", percent: 20 },
    { name: "Electronics", color: "#BA1A1A", percent: 18 },
    { name: "Clothing", color: "#9333EA", percent: 12 },
    { name: "Healthcare", color: "#3B82F6", percent: 8 },
    { name: "Entertainment", color: "#0D9488", percent: 7 },
  ],
  ecoTrends: [
    { month: "Jan", score: 58 },
    { month: "Feb", score: 62 },
    { month: "Mar", score: 60 },
    { month: "Apr", score: 67 },
    { month: "May", score: 70 },
    { month: "Jun", score: 74 },
  ],
  insights: [
    {
      type: "positive",
      label: "Great Work!",
      message: "You've reduced your carbon footprint by 12% by choosing local produce more often this month.",
    },
    {
      type: "warning",
      label: "Opportunity",
      message: "Digital electronics spending is up. Consider purchasing refurbished items to lower your hardware impact score.",
    },
    {
      type: "positive",
      label: "Sustainable Shift",
      message: "Switching to the metro for your commute saved an estimated 45kg of CO2 this billing cycle.",
    },
  ],
  recentReceipts: [
    { initials: "WF", store: "Whole Foods", date: "Oct 24, 2023", total: "$84.20", category: "FOOD", impact: "High" },
    { initials: "AP", store: "Apple Store", date: "Oct 22, 2023", total: "$1,099.00", category: "ELECTRONICS", impact: "Low" },
    { initials: "UB", store: "Uber", date: "Oct 21, 2023", total: "$24.50", category: "TRANSPORT", impact: "Med" },
    { initials: "PA", store: "Patagonia", date: "Oct 19, 2023", total: "$125.00", category: "CLOTHING", impact: "High" },
  ],
};

export default function DashboardMain() {
  const navigate = useNavigate();

  // Toggle this to true once user has uploaded receipts
  // In production, derive this from your backend data
  const [hasData] = useState(false);

  const data = MOCK_DATA;

  // ── ECO SCORE CIRCLE ──
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const scoreDash = (data.ecoScore / 100) * circumference;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 40px 48px", fontFamily: "Inter, sans-serif" }}>

      {/* ── EMPTY STATE ── */}
      {!hasData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
         <div style={{display: "flex",
         flexDirection: "row",
          gap: 24,
          alignItems: "stretch",
         flexWrap: "wrap",}}>
          {/* Eco Score — empty */}
          <div style={{
            maxWidth:400,
            background: "white", borderRadius: 12, padding: 24,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            minHeight: 320, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 16,
          }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#404940", textAlign: "center" }}>
              Your Eco-Score
            </p>
            <div style={{ position: "relative", width: 192, height: 192, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={192} height={192}>
                <circle cx={96} cy={96} r={84} fill="none" stroke="#ECEEF0" strokeWidth={8} />
              </svg>
              <span style={{ position: "absolute", fontSize: 48, fontWeight: 700, color: "#BFC9BD", fontFamily: "inter" }}>?</span>
            </div>
            <p style={{ margin: 0, fontSize: 16, color: "#404940", textAlign: "center" }}>
              Upload receipts to see<br />your score
            </p>
            </div>

          {/* Spending Overview — empty */}
          <div style={{
            maxWidth: 900,
            background: "white", borderRadius: 12, padding: 24,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            minHeight: 320, display: "flex", flexDirection: "column", gap: 24,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                Spending Overview
              </h2>
              <div style={{ width: 96, height: 32, background: "#ECEEF0", borderRadius: 8, opacity: 0.5 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 16 }}>
              <div style={{
                width: 128, height: 128, borderRadius: 9999,
                background: "rgba(107,255,143,0.20)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FaLeaf size={45} color="#006E2F" />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                  No spending data yet
                </p>
                <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>
                  Start tracking your environmental impact today.
                </p>
              </div>
            </div>
          </div>
          </div>
          
          
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* AI Insights — empty */}
          <div style={{
            background: "#166534", borderRadius: 12, padding: 24,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", gap: 24,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", right: -20, top: 0,
              width: 283, height: 128,
              background: "rgba(255,255,255,0.05)",
            }} />
            <div style={{
              padding: 16, background: "rgba(255,255,255,0.10)",
              borderRadius: 9999, backdropFilter: "blur(6px)",
              flexShrink: 0,
            }}>
              <FaLeaf size={28} color="white" />
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "white" }}>
                Awaiting Data for AI Insights
              </h3>
              <p style={{ margin: 0, fontSize: 16, color: "white", opacity: 0.9, lineHeight: "24px" }}>
                Your AI insights will appear here once you have uploaded at least one receipt. We'll analyze your patterns to find sustainable alternatives.
              </p>
            </div>
          </div>

          {/* Recent Receipts — empty */}
          <div style={{
            background: "white", borderRadius: 12,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", overflow: "hidden",
          }}>
            <div style={{
              padding: 24, borderBottom: "1px solid #BFC9BD",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                Recent Receipts
              </h2>
              <button
                onClick={() => navigate("/UploadReceipt")}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "8px 24px", background: "#004C22", borderRadius: 8,
                  border: "none", color: "white", fontSize: 14, fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <FaUpload size={12} />
                Upload Receipt
              </button>
            </div>
            <div style={{
              padding: "48px 24px",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 24,
            }}>
              <div style={{
                width: 192, height: 192, borderRadius: 9999,
                background: "#F2F4F6", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <FaLeaf size={64} color="#BFC9BD" />
              </div>
              <div style={{ textAlign: "center", maxWidth: 384 }}>
                <p style={{ margin: "0 0 8px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                  No receipts uploaded yet
                </p>
                <p style={{ margin: "0 0 16px", fontSize: 16, color: "#404940", lineHeight: "24px" }}>
                  Your transaction history and carbon footprint breakdown will be listed here after your first scan.
                </p>
                <button
                  onClick={() => navigate("/UploadReceipt")}
                  style={{
                    padding: "16px 48px", background: "#006E2F",
                    borderRadius: 8, border: "none", color: "white",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Upload your first receipt
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>

      ) : (

        /* ── ACTIVE STATE ── */
        <div style={{ display: "flex", gap: 24 }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Eco Score */}
            <div style={{
              background: "white", borderRadius: 12, padding: 24,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, color: "#404940" }}>Eco Score</p>
                <p style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#006E2F" }}>
                  {data.ecoScore}/100
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <FaArrowUp size={10} color="#006E2F" />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#006E2F" }}>
                    +{data.ecoScoreChange}% from last month
                  </span>
                </div>
              </div>
              <svg width={80} height={80}>
                <circle cx={40} cy={40} r={radius / 2} fill="none" stroke="#E6E8EA" strokeWidth={8} />
                <circle
                  cx={40} cy={40} r={radius / 2}
                  fill="none" stroke="#006E2F" strokeWidth={8}
                  strokeDasharray={`${scoreDash / 2} ${circumference / 2}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <FaLeaf color="#006E2F" />
              </svg>
            </div>

            {/* Total Spent */}
            <div style={{
              background: "white", borderRadius: 12, padding: 24,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>Total Spent</p>
              <p style={{ margin: 0, fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#191C1E" }}>
                {data.totalSpent}
              </p>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#404940" }}>Active Budget</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#191C1E" }}>{data.budgetUsed}% used</span>
                </div>
                <div style={{ height: 6, background: "#E6E8EA", borderRadius: 9999, overflow: "hidden" }}>
                  <div style={{ width: `${data.budgetUsed}%`, height: "100%", background: "#004C22", borderRadius: 9999 }} />
                </div>
              </div>
            </div>

            {/* Receipts Uploaded */}
            <div style={{
              background: "white", borderRadius: 12, padding: 24,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>Receipts Uploaded</p>
              <p style={{ margin: 0, fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#191C1E" }}>
                {data.receiptsUploaded}
              </p>
              <div style={{ display: "flex", marginTop: 24, gap: -4 }}>
                {["WF", "AP"].map((init) => (
                  <div key={init} style={{
                    width: 32, height: 32, background: "#E6E8EA",
                    borderRadius: 8, border: "2px solid white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#404940", marginLeft: -4,
                  }}>
                    {init}
                  </div>
                ))}
                <div style={{
                  width: 32, height: 32, background: "#166534",
                  borderRadius: 8, border: "2px solid white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "white", marginLeft: -4,
                }}>
                  +{data.receiptsUploaded - 2}
                </div>
              </div>
            </div>

            {/* Spending by Category */}
            <div style={{
              background: "white", borderRadius: 12, padding: 24,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              display: "flex", flexDirection: "column", gap: 24,
            }}>
              <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                Spending by Category
              </h2>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <DonutChart data={data.spendingByCategory} total="$1.2k" />
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
                  {data.spendingByCategory.map((cat) => (
                    <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 8, height: 16 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 9999, background: cat.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#404940" }}>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Eco Score Trends */}
            <div style={{
              background: "white", borderRadius: 12, padding: 24,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              display: "flex", flexDirection: "column", gap: 24,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                  Eco Score Trends
                </h2>
                <div style={{ display: "flex", gap: 8 }}>
                  {["6 Months", "1 Year"].map((label, i) => (
                    <span
                      key={label}
                      style={{
                        padding: "4px 12px", borderRadius: 9999,
                        background: i === 0 ? "#F2F4F6" : "none",
                        fontSize: 12, fontWeight: 500,
                        color: i === 0 ? "#191C1E" : "#404940",
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <EcoScoreLineChart data={data.ecoTrends} />
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Eco Insights */}
            <div>
              <h2 style={{ margin: "0 0 16px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                Your eco insights this month
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {data.insights.map((insight, i) => {
                  const isPositive = insight.type === "positive";
                  const borderColor = isPositive ? "#006E2F" : "#F59E0B";
                  const labelColor = isPositive ? "#006E2F" : "#D97706";
                  const Icon = isPositive ? FiCheckCircle : FiAlertTriangle;

                  return (
                    <div
                      key={i}
                      style={{
                        padding: 24,
                        background: "rgba(255,255,255,0.80)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 12,
                        border: `1px solid ${borderColor}`,
                        borderLeft: `4px solid ${borderColor}`,
                        boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                        display: "flex", flexDirection: "column", gap: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Icon size={17} color={labelColor} />
                        <span style={{ fontSize: 16, color: labelColor }}>{insight.label}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, color: "#191C1E", lineHeight: "20px" }}>
                        {insight.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Receipts */}
            <div style={{
              background: "white", borderRadius: 12,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", overflow: "hidden",
            }}>
              <div style={{
                padding: 24, borderBottom: "1px solid #BFC9BD",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>
                  Recent Receipts
                </h2>
                <button
                  onClick={() => navigate("/ReceiptHistory")}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 16, color: "#004C22",
                  }}
                >
                  View All
                </button>
              </div>

              {/* Table header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr",
                background: "#F2F4F6", padding: "0 24px",
              }}>
                {["Store", "Date", "Total", "Category", "Impact"].map((h) => (
                  <div key={h} style={{ padding: "16px 0", fontSize: 14, fontWeight: 600, color: "#404940" }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Table rows */}
              {data.recentReceipts.map((r, i) => {
                const catStyle = CATEGORY_STYLES[r.category] || CATEGORY_STYLES.OTHER;
                const impactStyle = IMPACT_STYLES[r.impact];

                return (
                  <div
                    key={i}
                    onClick={() => navigate("/ReceiptDetails")}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr",
                      padding: "0 24px",
                      borderTop: i === 0 ? "none" : "1px solid #BFC9BD",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#F7F9FB"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  >
                    {/* Store */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 0" }}>
                      <div style={{
                        width: 32, height: 32, background: "#E6E8EA",
                        borderRadius: 4, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 12, fontWeight: 700,
                        color: "#404940", flexShrink: 0,
                      }}>
                        {r.initials}
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#191C1E" }}>{r.store}</span>
                    </div>

                    {/* Date */}
                    <span style={{ fontSize: 14, color: "#404940" }}>{r.date}</span>

                    {/* Total */}
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#191C1E" }}>{r.total}</span>

                    {/* Category */}
                    <div>
                      <span style={{
                        padding: "4px 8px", background: catStyle.bg,
                        borderRadius: 9999, fontSize: 10, fontWeight: 700,
                        color: catStyle.color, textTransform: "uppercase", letterSpacing: 0.5,
                      }}>
                        {r.category}
                      </span>
                    </div>

                    {/* Impact */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 9999, background: impactStyle.color }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: impactStyle.color }}>
                        {r.impact}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}