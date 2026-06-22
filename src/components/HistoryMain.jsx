import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaLeaf,
  FaChevronRight,
  FaChevronLeft,
  FaUpload,
  FaReceipt,
} from "react-icons/fa";
import { FiSliders } from "react-icons/fi";

const CATEGORY_COLORS = {
  Groceries: "#006E2F",
  Dining: "#39485A",
  Transport: "#BA1A1A",
  Health: "#0066CC",
  Entertainment: "#7B2D8B",
  Shopping: "#C47900",
  Utilities: "#404940",
  Other: "#404940",
};

const getEcoScoreStyle = (score) => {
  if (score >= 70) return { bg: "rgba(0,110,47,0.10)", color: "#006E2F" };
  if (score >= 40) return { bg: "rgba(245,158,11,0.10)", color: "#D97706" };
  return { bg: "rgba(186,26,26,0.10)", color: "#BA1A1A" };
};

// ── PLACEHOLDER DATA (shown once receipts exist) ──
const MOCK_RECEIPTS = [
  {
    id: 1,
    store: "Whole Foods Market",
    date: "Oct 24, 2023 • 14:32",
    itemCount: 12,
    categories: ["Groceries"],
    total: "$142.50",
    ecoScore: 84,
  },
  {
    id: 2,
    store: "Blue Bottle Coffee",
    date: "Oct 23, 2023 • 08:15",
    itemCount: 2,
    categories: ["Dining"],
    total: "$12.40",
    ecoScore: 92,
  },
  {
    id: 3,
    store: "Shell Energy Station",
    date: "Oct 21, 2023 • 17:45",
    itemCount: 1,
    categories: ["Transport"],
    total: "$68.90",
    ecoScore: 32,
  },
];

const ITEMS_PER_PAGE = 10;

export default function ReceiptHistory() {
  const navigate = useNavigate();

  // Toggle this to `true` once connected to backend
  // For now: new users see empty state
  const [receipts] = useState([]);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const hasReceipts = receipts.length > 0;

  // Filter logic
  const filtered = receipts.filter((r) => {
    const matchesSearch =
      r.store.toLowerCase().includes(search.toLowerCase()) ||
      r.categories.some((c) =>
        c.toLowerCase().includes(search.toLowerCase())
      );
    const matchesCategory = categoryFilter
      ? r.categories.includes(categoryFilter)
      : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRowClick = (receipt) => {
    navigate("/ReceiptDetails", {
      state: {
        confirmedData: {
          store: receipt.store,
          date: receipt.date,
          total: receipt.total,
          ecoScore: receipt.ecoScore,
          ecoLabel: receipt.ecoScore >= 70 ? "High Impact" : receipt.ecoScore >= 40 ? "Medium Impact" : "Low Impact",
          ecoMessage: "",
          goalProgress: 78,
          goalMessage: "",
          location: "",
          items: [],
        },
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "64px 48px 48px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 32,
        }}
      >
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
            Your receipts {hasReceipts && `(${receipts.length})`}
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 16,
              color: "#404940",
              lineHeight: "24px",
            }}
          >
            Review and manage your sustainable spending history.
          </p>
        </div>

        <button
          onClick={() => navigate("/UploadReceipt")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 24px",
            background: "#004C22",
            borderRadius: 8,
            border: "none",
            color: "white",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          <FaUpload size={16} />
          Upload New
        </button>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: 16,
          background: "white",
          borderRadius: 12,
          border: "1px solid rgba(191,201,189,0.30)",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          marginBottom: 32,
        }}
      >
        {/* Search */}
        <div style={{ flex: 1, position: "relative" }}>
          <FaSearch
            size={16}
            color="#404940"
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search stores or items..."
            style={{
              width: "100%",
              padding: "10px 16px 10px 40px",
              background: "#F7F9FB",
              border: "1px solid #BFC9BD",
              borderRadius: 8,
              fontSize: 16,
              color: "#191C1E",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Date filter */}
        <div style={{ position: "relative" }}>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              padding: "8px 36px 8px 16px",
              background: "#F7F9FB",
              border: "1px solid #BFC9BD",
              borderRadius: 8,
              fontSize: 16,
              color: "#404940",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
            }}
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <FaFilter
            size={12}
            color="#404940"
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
        </div>

        {/* Category filter */}
        <div style={{ position: "relative" }}>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            style={{
              padding: "8px 36px 8px 16px",
              background: "#F7F9FB",
              border: "1px solid #BFC9BD",
              borderRadius: 8,
              fontSize: 16,
              color: "#404940",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
            }}
          >
            <option value="">Category</option>
            <option>Groceries</option>
            <option>Dining</option>
            <option>Transport</option>
            <option>Health</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Utilities</option>
            <option>Other</option>
          </select>
          <FiSliders
            size={14}
            color="#404940"
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
        </div>
      </div>

      {/* ── EMPTY STATE ── */}
      {!hasReceipts ? (
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid rgba(191,201,189,0.30)",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 80,
              height: 80,
              background: "#F2F4F6",
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <FaReceipt size={32} color="#BFC9BD" />
          </div>

          <h2
            style={{
              fontFamily: "inter",
              fontSize: 24,
              fontWeight: 700,
              color: "#191C1E",
              margin: 0,
            }}
          >
            No receipts yet
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "#404940",
              margin: 0,
              maxWidth: 400,
              lineHeight: "24px",
            }}
          >
            Upload your first receipt to start tracking your spending and
            sustainability impact.
          </p>

          <button
            onClick={() => navigate("/UploadReceipt")}
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              background: "#004C22",
              borderRadius: 8,
              border: "none",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <FaUpload size={14} />
            Upload your first receipt
          </button>
        </div>

      ) : (

        /* ── RECEIPTS TABLE ── */
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid rgba(191,201,189,0.30)",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr 40px",
              background: "rgba(242,244,246,0.50)",
              borderBottom: "1px solid #BFC9BD",
              padding: "0 24px",
            }}
          >
            {["Store & Date", "Items", "Category", "Total", "Eco Score", ""].map((h) => (
              <div
                key={h}
                style={{
                  padding: "16px 0",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#404940",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {paginated.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#404940" }}>
              No receipts match your search.
            </div>
          ) : (
            paginated.map((receipt, index) => {
              const scoreStyle = getEcoScoreStyle(receipt.ecoScore);
              return (
                <div
                  key={receipt.id}
                  onClick={() => handleRowClick(receipt)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr 40px",
                    padding: "0 24px",
                    borderTop: index === 0 ? "none" : "1px solid rgba(191,201,189,0.30)",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#F7F9FB"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                >
                  {/* Store & Date */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0" }}>
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: 8,
                        background: "#E6E8EA", display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}
                    >
                      <FaLeaf color="#404940" size={16} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 16, color: "#191C1E", lineHeight: "24px" }}>
                        {receipt.store}
                      </p>
                      <p style={{ margin: 0, fontSize: 14, color: "#404940", lineHeight: "20px" }}>
                        {receipt.date}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ fontSize: 16, color: "#404940" }}>
                    {receipt.itemCount} {receipt.itemCount === 1 ? "item" : "items"}
                  </div>

                  {/* Category */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {receipt.categories.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          width: 8, height: 8, borderRadius: 9999,
                          background: CATEGORY_COLORS[cat] || "#404940",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                    <span style={{ fontSize: 16, color: "#404940" }}>
                      {receipt.categories.join(", ")}
                    </span>
                  </div>

                  {/* Total */}
                  <div style={{ fontSize: 16, color: "#191C1E" }}>
                    {receipt.total}
                  </div>

                  {/* Eco Score */}
                  <div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 8px",
                        background: scoreStyle.bg,
                        borderRadius: 9999,
                        fontSize: 16,
                        fontWeight: 700,
                        color: scoreStyle.color,
                      }}
                    >
                      <span
                        style={{
                          width: 8, height: 8, borderRadius: 9999,
                          background: scoreStyle.color, display: "inline-block",
                        }}
                      />
                      {receipt.ecoScore}
                    </span>
                  </div>

                  {/* Chevron */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <FaChevronRight size={10} color="#404940" />
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              background: "rgba(242,244,246,0.30)",
              borderTop: "1px solid #BFC9BD",
            }}
          >
            <p style={{ margin: 0, fontSize: 16, color: "#404940" }}>
              Showing{" "}
              <span style={{ color: "#191C1E" }}>
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              of {filtered.length} receipts
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: "none",
                  background: "none", cursor: currentPage === 1 ? "default" : "pointer",
                  opacity: currentPage === 1 ? 0.3 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FaChevronLeft size={10} color="#404940" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: "none",
                    background: currentPage === page ? "#004C22" : "none",
                    color: currentPage === page ? "white" : "#404940",
                    fontSize: 16, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: "none",
                  background: "none", cursor: currentPage === totalPages ? "default" : "pointer",
                  opacity: currentPage === totalPages ? 0.3 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FaChevronRight size={10} color="#404940" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}