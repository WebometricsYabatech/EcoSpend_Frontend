import React, { useState, useEffect } from "react";
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
import { getReceiptHistory } from "../api";

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

const ITEMS_PER_PAGE = 10;

export default function ReceiptHistory() {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fetchReceiptHistory = async () => {
      try {
        const data = await getReceiptHistory();
  
        console.log("Receipt History:", data);
        console.log("First Receipt:", data.receipts?.[0]);
        console.log(JSON.stringify(data.receipts[0]));
  
        // Save receipts from the backend
        setReceipts(data.receipts ?? []);
      } catch (err) {
        console.error("Failed to fetch receipt history:", err);
        setReceipts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReceiptHistory();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        Loading receipts...
      </div>
    );
  }
  

  const hasReceipts = receipts.length > 0;

  const filtered = receipts.filter((r) => {
    const store = r.storeName || "";
    const category = r.category || "";
  
    const matchesSearch =
      store.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase());
  
    const matchesCategory = categoryFilter
      ? category === categoryFilter
      : true;
  
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRowClick = (receipt) => {
    const ecoScore = receipt.sustainabilityScore ?? 0;
  
    navigate(`/ReviewDetails/${receipt.receiptId}`, {
      state: {
        confirmedData: {
          receiptId: receipt.receiptId,
          store: receipt.storeName,
          date: receipt.date,
          total: Number(receipt.totalAmount),
          ecoScore,
          ecoLabel:
            ecoScore >= 70
              ? "High Impact"
              : ecoScore >= 40
              ? "Medium Impact"
              : "Low Impact",
          ecoMessage: "",
          goalProgress: 78,
          goalMessage: "",
          location: "",
          items: receipt.items || [],
          category: receipt.category,
        },
      },
    });
  };

  return (
    <div
  style={{
    maxWidth: 1100,
    width: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: isMobile ? "32px 16px 32px" : "64px 48px 48px",
    fontFamily: "Inter, sans-serif",
  }}
>
      {/* ── HEADER ── */}
      <div
  style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "stretch" : "flex-end",
    gap: 20,
    marginBottom: 24,
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
      justifyContent: "center",
      gap: 8,
      padding: "10px 20px",
      background: "#004C22",
      borderRadius: 8,
      border: "none",
      color: "white",
      fontSize: 15,
      cursor: "pointer",
      width: isMobile ? "100%" : "auto",
  }}
  ></button>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "stretch" : "center",
          gap: 12,
          padding: 16,
          background: "white",
          borderRadius: 12,
          border: "1px solid rgba(191,201,189,0.30)",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          marginBottom: 32,
          flexWrap: "wrap",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Search */}
        <div
  style={{
    flex: 1,
    width: isMobile ? "100%" : "auto",
    minWidth: isMobile ? 0 : 200,
    position: "relative",
  }}
>
          <FaSearch
            size={16}
            color="#404940"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
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
              width: isMobile ? "100%" : "auto",
             boxSizing: "border-box",
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
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Category filter */}
        <div style={{ position: "relative" }}>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
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
              width: isMobile ? "100%" : "auto",
             boxSizing: "border-box",
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
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
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
    display: isMobile ? "none" : "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr 40px",
    background: "rgba(242,244,246,0.50)",
    borderBottom: "1px solid #BFC9BD",
    padding: "0 24px",
  }}
>
            {["Store & Date", "Items", "Category", "Total", "Eco Score", ""].map(
              (h) => (
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
              )
            )}
          </div>

          {/* Table rows */}
          {paginated.length === 0 ? (
            <div
              style={{ padding: "40px 24px", textAlign: "center", color: "#404940" }}
            >
              No receipts match your search.
            </div>
          ) : (
            paginated.map((receipt, index) => {
              const ecoScore = receipt.sustainabilityScore ?? 0;
              const scoreStyle = getEcoScoreStyle(ecoScore);
              const itemCount = receipt.items?.length ?? receipt.itemCount ?? 0;
            
              return (
                <div
                  key={receipt.receiptId}
                  onClick={() => handleRowClick(receipt)}
                  style={{
                    display: isMobile ? "flex" : "grid",
                    flexDirection: isMobile ? "column" : undefined,
                    gridTemplateColumns: isMobile
                      ? undefined
                      : "2fr 1fr 1.5fr 1fr 1fr 40px",
                    gap: isMobile ? 14 : 0,
                    padding: isMobile ? "18px 16px" : "0 24px",
                    borderTop:
                      index === 0
                        ? "none"
                        : "1px solid rgba(191,201,189,0.30)",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F7F9FB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  {/* Store + Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: isMobile ? 0 : "16px 0",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "#E6E8EA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FaLeaf color="#404940" size={16} />
                    </div>
            
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          color: "#191C1E",
                          lineHeight: "24px",
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {receipt.storeName || "Unknown Store"}
                      </p>
            
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          color: "#404940",
                          lineHeight: "20px",
                        }}
                      >
                        {new Date(receipt.date).toLocaleDateString()}
                      </p>
                    </div>
            
                    {isMobile && (
                      <FaChevronRight size={12} color="#404940" />
                    )}
                  </div>
            
                  {/* Mobile details */}
                  {isMobile ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        width: "100%",
                        paddingTop: 4,
                      }}
                    >
                      {/* Items */}
                      <div>
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontSize: 12,
                            color: "#777",
                          }}
                        >
                          Items
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            color: "#404940",
                          }}
                        >
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>
                      </div>
            
                      {/* Total */}
                      <div>
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontSize: 12,
                            color: "#777",
                          }}
                        >
                          Total
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#191C1E",
                          }}
                        >
                          ${Number(receipt.totalAmount).toFixed(2)}
                        </p>
                      </div>
            
                      {/* Category */}
                      <div>
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontSize: 12,
                            color: "#777",
                          }}
                        >
                          Category
                        </p>
            
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 9999,
                              background:
                                CATEGORY_COLORS[receipt.category] || "#404940",
                              flexShrink: 0,
                            }}
                          />
            
                          <span
                            style={{
                              fontSize: 14,
                              color: "#404940",
                            }}
                          >
                            {receipt.category || "Other"}
                          </span>
                        </div>
                      </div>
            
                      {/* Eco Score */}
                      <div>
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontSize: 12,
                            color: "#777",
                          }}
                        >
                          Eco Score
                        </p>
            
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "4px 8px",
                            background: scoreStyle.bg,
                            borderRadius: 9999,
                            fontSize: 14,
                            fontWeight: 700,
                            color: scoreStyle.color,
                          }}
                        >
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: 9999,
                              background: scoreStyle.color,
                            }}
                          />
                          {ecoScore}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Desktop Items */}
                      <div style={{ fontSize: 16, color: "#404940" }}>
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </div>
            
                      {/* Desktop Category */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 9999,
                            background:
                              CATEGORY_COLORS[receipt.category] || "#404940",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
            
                        <span style={{ fontSize: 16, color: "#404940" }}>
                          {receipt.category || "Other"}
                        </span>
                      </div>
            
                      {/* Desktop Total */}
                      <div style={{ fontSize: 16, color: "#191C1E" }}>
                        ${Number(receipt.totalAmount).toFixed(2)}
                      </div>
            
                      {/* Desktop Eco Score */}
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
                              width: 8,
                              height: 8,
                              borderRadius: 9999,
                              background: scoreStyle.color,
                            }}
                          />
                          {ecoScore}
                        </span>
                      </div>
            
                      {/* Desktop Chevron */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <FaChevronRight size={10} color="#404940" />
                      </div>
                    </>
                  )}
                </div>
              );
            }))}

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
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "none",
                  background: "none",
                  cursor: currentPage === 1 ? "default" : "pointer",
                  opacity: currentPage === 1 ? 0.3 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaChevronLeft size={10} color="#404940" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      border: "none",
                      background:
                        currentPage === page ? "#004C22" : "none",
                      color: currentPage === page ? "white" : "#404940",
                      fontSize: 16,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "none",
                  background: "none",
                  cursor:
                    currentPage === totalPages ? "default" : "pointer",
                  opacity: currentPage === totalPages ? 0.3 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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