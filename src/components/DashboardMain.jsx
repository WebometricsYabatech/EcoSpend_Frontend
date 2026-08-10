import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaUpload,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { getDashboard } from "../api";

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
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E6E8EA" strokeWidth={strokeWidth} />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.dash} ${seg.gap}`}
          strokeDashoffset={-seg.offset}
        />
      ))}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={12} fill="#404940" fontFamily="Inter"
        style={{ transform: "rotate(90deg)", transformOrigin: `${cx}px ${cy}px` }}
      >
        Total
      </text>
      <text
        x={cx} y={cy + 12}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={16} fontWeight={600} fill="#191C1E" fontFamily="DM Sans"
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

  if (!data || data.length === 0) return (
    <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#BFC9BD", fontSize: 14 }}>
      No trend data yet
    </div>
  );

  const values = data.map((d) => d.amount ?? 0);

  const minVal = Math.min(...values) - 10;
  const maxVal = Math.max(...values) + 10;

  const x = (i) => {
    if (data.length === 1) {
      return padding.left + chartW / 2;
    }
  
    return padding.left + (i / (data.length - 1)) * chartW;
  };
  const y = (val) => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  const pathD = data
  .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.amount ?? 0)}`)
  .join(" ");
  const areaD = `${pathD} L ${x(data.length - 1)} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#006E2F" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#006E2F" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((val) => (
        <line key={val} x1={padding.left} x2={padding.left + chartW} y1={y(val)} y2={y(val)} stroke="#E6E8EA" strokeWidth={1} strokeDasharray="4 4" />
      ))}
      <path d={areaD} fill="url(#areaGradient)" />
      <path d={pathD} fill="none" stroke="#006E2F" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.score ?? 0)} r={4} fill="#006E2F" />
      ))}
      {data.map((d, i) => (
      <circle
      key={i}
      cx={x(i)}
      cy={y(d.amount ?? 0)}
      r={4}
      fill="#006E2F"
  />
))}
    </svg>
  );
}

export default function DashboardMain() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    getDashboard()
  .then((data) => {
    console.log("DASHBOARD RESPONSE:", JSON.stringify(data, null, 2));
    setDashboardData(data);
  })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ color: "#404940", fontSize: 16 }}>Loading dashboard...</p>
      </div>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  <div
    style={{
      maxWidth: 1200,
      width: "100%",
      boxSizing: "border-box",
      margin: "0 auto",
      padding: isMobile
        ? "24px 16px 32px"
        : "40px 40px 48px",
      fontFamily: "Inter, sans-serif",
    }}
  ></div>
  // ── DERIVE VALUES FROM BACKEND RESPONSE ──
  const overview = dashboardData?.overview || {};
  const categoryBreakdown = dashboardData?.categoryBreakdown || [];
  const dailyChart = dashboardData?.dailyChart || [];
  const recentReceipts = dashboardData?.recentReceipts || [];
  const ecoScore = dashboardData?.avgSustainabilityScore;
  console.log("Recent Receipts:", recentReceipts);
  const totalSpent = overview.totalThisMonth ?? 0;
  const lastMonth = overview.totalLastMonth ?? 0;
  const monthChange = overview.monthChange ?? 0;
  const budgetUsed = overview.percentageUsed ?? 0;
  const isOverBudget = overview.isOverBudget ?? false;
  
  // If no data at all, show empty state
  const hasData = recentReceipts.length > 0 || totalSpent > 0;

  // Map category breakdown for donut chart
  const spendingByCategory = categoryBreakdown.map((cat, i) => ({
    name: cat.category || cat.name || "Other",
    color: ["#006E2F", "#F59E0B", "#BA1A1A", "#9333EA", "#3B82F6", "#0D9488"][i % 6],
    percent: cat.percentage ?? cat.percent ?? 0,
  }));

  const totalFormatted = `$${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 40px 48px", fontFamily: "Inter, sans-serif" }}>

      {/* ── EMPTY STATE ── */}
      {!hasData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "stretch", flexWrap: "wrap" }}>

            {/* Eco Score — empty */}
            <div style={{ maxWidth: 400, background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", minHeight: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#404940", textAlign: "center" }}>Your Eco-Score</p>
              <div style={{ position: "relative", width: 192, height: 192, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={192} height={192}>
                  <circle cx={96} cy={96} r={84} fill="none" stroke="#ECEEF0" strokeWidth={8} />
                </svg>
                <span style={{ position: "absolute", fontSize: 48, fontWeight: 700, color: "#BFC9BD", fontFamily: "inter" }}>?</span>
              </div>
              <p style={{ margin: 0, fontSize: 16, color: "#404940", textAlign: "center" }}>Upload receipts to see<br />your score</p>
            </div>

            {/* Spending Overview — empty */}
            <div style={{ flex: 1, background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", minHeight: 320, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Spending Overview</h2>
                <div style={{ width: 96, height: 32, background: "#ECEEF0", borderRadius: 8, opacity: 0.5 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 16 }}>
                <div style={{ width: 128, height: 128, borderRadius: 9999, background: "rgba(107,255,143,0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FaLeaf size={45} color="#006E2F" />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>No spending data yet</p>
                  <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>Start tracking your environmental impact today.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights — empty */}
          <div style={{ background: "#166534", borderRadius: 12, padding: 24, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -20, top: 0, width: 283, height: 128, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ padding: 16, background: "rgba(255,255,255,0.10)", borderRadius: 9999, backdropFilter: "blur(6px)", flexShrink: 0 }}>
              <FaLeaf size={28} color="white" />
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "white" }}>Awaiting Data for AI Insights</h3>
              <p style={{ margin: 0, fontSize: 16, color: "white", opacity: 0.9, lineHeight: "24px" }}>
                Your AI insights will appear here once you have uploaded at least one receipt. We'll analyze your patterns to find sustainable alternatives.
              </p>
            </div>
          </div>

          {/* Recent Receipts — empty */}
          <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ padding: 24, borderBottom: "1px solid #BFC9BD", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Recent Receipts</h2>
              <button onClick={() => navigate("/UploadReceipt")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 24px", background: "#004C22", borderRadius: 8, border: "none", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                <FaUpload size={12} />
                Upload Receipt
              </button>
            </div>
            <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div style={{ width: 192, height: 192, borderRadius: 9999, background: "#F2F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaLeaf size={64} color="#BFC9BD" />
              </div>
              <div style={{ textAlign: "center", maxWidth: 384 }}>
                <p style={{ margin: "0 0 8px", fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>No receipts uploaded yet</p>
                <p style={{ margin: "0 0 16px", fontSize: 16, color: "#404940", lineHeight: "24px" }}>Your transaction history and carbon footprint breakdown will be listed here after your first scan.</p>
                <button onClick={() => navigate("/UploadReceipt")} style={{ padding: "16px 48px", background: "#006E2F", borderRadius: 8, border: "none", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Upload your first receipt
                </button>
              </div>
            </div>
          </div>
        </div>

      ) : (

        /* ── ACTIVE STATE ── */
        <div
        style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
         gap: 24,
         width: "100%",
         }}
        >

          {/* ── LEFT COLUMN ── */}
          <div
         style={{
          width: isMobile ? "100%" : 280,
          flexShrink: 0,
         display: "flex",
          flexDirection: "column",
         gap: 16,
         }}
         >

            {/* Eco Score */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, color: "#404940" }}>Eco Score</p>
                <p style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#006E2F" }}>
                  {ecoScore != null ? `${Math.round(ecoScore)}/100` : "N/A"}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {monthChange >= 0
                    ? <FaArrowUp size={10} color="#006E2F" />
                    : <FaArrowDown size={10} color="#BA1A1A" />
                  }
                  <span style={{ fontSize: 12, fontWeight: 500, color: monthChange >= 0 ? "#006E2F" : "#BA1A1A" }}>
                    {monthChange >= 0 ? "+" : ""}{monthChange}% from last month
                  </span>
                </div>
              </div>
              <svg width={80} height={80}>
                <circle cx={40} cy={40} r={30} fill="none" stroke="#E6E8EA" strokeWidth={8} />
                {ecoScore != null && (
                  <circle
                    cx={40} cy={40} r={30}
                    fill="none" stroke="#006E2F" strokeWidth={8}
                    strokeDasharray={`${(ecoScore / 100) * (2 * Math.PI * 30)} ${2 * Math.PI * 30}`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                )}
              </svg>
            </div>

            {/* Total Spent */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>Total Spent</p>
              <p style={{ margin: 0, fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#191C1E" }}>
                {totalFormatted}
              </p>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#404940" }}>Active Budget</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isOverBudget ? "#BA1A1A" : "#191C1E" }}>
                    {budgetUsed != null ? `${Math.round(budgetUsed)}% used` : "No budget set"}
                  </span>
                </div>
                <div style={{ height: 6, background: "#E6E8EA", borderRadius: 9999, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(budgetUsed ?? 0, 100)}%`, height: "100%", background: isOverBudget ? "#BA1A1A" : "#004C22", borderRadius: 9999 }} />
                </div>
              </div>
            </div>

            {/* Receipts Uploaded */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>Receipts Uploaded</p>
              <p style={{ margin: 0, fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#191C1E" }}>
                {recentReceipts.length}
              </p>
            </div>

            {/* Spending by Category */}
            {spendingByCategory.length > 0 && (
              <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 24 }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Spending by Category</h2>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <DonutChart data={spendingByCategory} total={totalFormatted} />
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
                    {spendingByCategory.map((cat) => (
                      <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 8, height: 16 }}>
                        <div style={{ width: 12, height: 12, borderRadius: 9999, background: cat.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#404940" }}>{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Eco Score Trends */}
            {dailyChart.length > 0 && (
              <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 24 }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Spending Trends</h2>
                <EcoScoreLineChart data={dailyChart} />
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
          style={{
         flex: 1,
          minWidth: 0,
          width: isMobile ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
         }}
         >

            {/* Recent Receipts */}
            <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <div style={{ padding: 24, borderBottom: "1px solid #BFC9BD", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Recent Receipts</h2>
                <button onClick={() => navigate("/ReceiptHistory")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#004C22" }}>
                  View All
                </button>
              </div>

              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr", background: "#F2F4F6", padding: "0 24px" }}>
                {["Store", "Date", "Total", "Category", "Score"].map((h) => (
                  <div key={h} style={{ padding: "16px 0", fontSize: 14, fontWeight: 600, color: "#404940" }}>{h}</div>
                ))}
              </div>

              {/* Table rows */}
              {recentReceipts.map((r, i) => {
                const category = (r.category || r.categoryName || "OTHER").toUpperCase();
                const catStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.OTHER;
                const score = r.sustainabilityScore ?? r.ecoScore ?? null;
                const storeName = r.merchant || r.store || r.name || "Unknown";
                const initials = storeName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                const date = r.date ? new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
                const total = r.amount != null ? `$${Number(r.amount).toFixed(2)}` : r.total || "—";

                return (
                  <div
                    key={i}
                    onClick={() => navigate(`/ReviewDetails/${receiptData.receiptId}`, { state: { confirmedData: r } })}
                    style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr", padding: "0 24px", borderTop: i === 0 ? "none" : "1px solid #BFC9BD", alignItems: "center", cursor: "pointer" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#F7F9FB"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 0" }}>
                      <div style={{ width: 32, height: 32, background: "#E6E8EA", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#404940", flexShrink: 0 }}>
                        {initials}
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#191C1E" }}>{storeName}</span>
                    </div>
                    <span style={{ fontSize: 14, color: "#404940" }}>{date}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#191C1E" }}>{total}</span>
                    <div>
                      <span style={{ padding: "4px 8px", background: catStyle.bg, borderRadius: 9999, fontSize: 10, fontWeight: 700, color: catStyle.color, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {category}
                      </span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: score != null ? "#006E2F" : "#BFC9BD" }}>
                      {score != null ? `${Math.round(score)}` : "—"}
                    </span>
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