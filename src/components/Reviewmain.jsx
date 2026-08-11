import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AIicon from "../assets/AI-iconGreen.svg";
import { confirmReceipt, createCategory } from "../api";

const CATEGORY_OPTIONS = [
  "Groceries", "Food & Dining", "Transport", "Utilities",
  "Health", "Entertainment", "Shopping", "Other",
];

const EMPTY_ITEM = { name: "", price: "", category: "Groceries" };
{showCategoryPopup && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 20,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "white",
        borderRadius: 16,
        padding: 28,
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          margin: "0 0 8px",
          fontSize: 22,
          fontWeight: 700,
          color: "#191C1E",
        }}
      >
        Create a category
      </h2>

      <p
        style={{
          margin: "0 0 20px",
          fontSize: 14,
          color: "#404940",
          lineHeight: "20px",
        }}
      >
        Add a category to your personal categories.
      </p>

      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#191C1E",
        }}
      >
        Category name
      </label>

      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="e.g. Pet Care"
        autoFocus
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid #BFC9BD",
          outline: "none",
          fontSize: 14,
          color: "#191C1E",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button
          type="button"
          onClick={() => {
            setShowCategoryPopup(false);
            setNewCategory("");
          }}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #BFC9BD",
            background: "white",
            color: "#404940",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!newCategory.trim() || isSavingCategory}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: "#004C22",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            cursor:
              !newCategory.trim() || isSavingCategory
                ? "not-allowed"
                : "pointer",
            opacity:
              !newCategory.trim() || isSavingCategory ? 0.6 : 1,
          }}
        >
          {isSavingCategory ? "Saving..." : "Save Category"}
        </button>
      </div>
    </div>
  </div>
)}

export default function ReviewReceipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const scannedData = location.state?.receiptData || {
    store: "", date: "", total: 0,
    sustainabilityScore: 0, sustainabilityTip: "", items: [],
  };

  const [store, setStore] = useState(scannedData.store || "");
  const [date, setDate] = useState(scannedData.date || "");
  const [total, setTotal] = useState(scannedData.total ?? 0);
  const [items, setItems] = useState(scannedData.items || []);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const receiptImage = scannedData.receiptImage;
  const sustainabilityScore = scannedData.sustainabilityScore;
  const sustainabilityTip = scannedData.sustainabilityTip;
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
 const [newCategory, setNewCategory] = useState("");
 const [isSavingCategory, setIsSavingCategory] = useState(false);
 const [userCategories, setUserCategories] = useState(CATEGORY_OPTIONS);
 

 const addItem = () => setItems([...items, { ...EMPTY_ITEM }]);
 const handleCategoryChange = (index, value) => {
  if (value === "Other") {
    setActiveItemIndex(index);
    setCustomCategory("");
    setShowCategoryPopup(true);
    return;
  }

  handleItemChange(index, "category", value);
};
const saveCustomCategory = async () => {
  const categoryName = newCategory.trim();

  if (!categoryName) return;

  try {
    setIsSavingCategory(true);

    // Save category to the user's account
    const savedCategory = await createCategory(categoryName);

    console.log("Category saved:", savedCategory);

    // Apply the new category to the item
    handleItemChange(
      activeItemIndex,
      "category",
      savedCategory.category || categoryName
    );

    // Close popup
    setShowCategoryPopup(false);
    setNewCategory("");
    setActiveItemIndex(null);

  } catch (error) {
    console.error("Failed to save category:", error);
    alert("Failed to save category. Please try again.");
  } finally {
    setIsSavingCategory(false);
  }
};
 
 const handleConfirm = async () => {
    setIsSaving(true);
    setError("");
    try {
      const receiptData = {
        store, date,
        total: Number(total),
        items: items.map(item => ({ ...item, price: Number(item.price) })),
      };
      const response = await confirmReceipt(receiptData);
      navigate(`/ReviewDetails/${receiptData.receiptId}`, {
        state: {
          receiptData: {
            ...receiptData,
            sustainabilityScore,
            sustainabilityTip,
            receiptImage: scannedData.receiptImage,
          },
        },
      });
    } catch (err) {
      setError(err.message || "Failed to confirm receipt.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      padding: isMobile ? "16px" : "32px 24px",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Page Title */}
      <h1 style={{
        fontFamily: "inter", fontSize: isMobile ? 24 : 32,
        fontWeight: 700, color: "#191C1E", margin: "0 0 24px",
      }}>
        Review Receipt
      </h1>

      {/* AI Banner */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        background: "rgba(107, 255, 143, 0.30)",
        borderRadius: 12, border: "1px solid #006E2F", marginBottom: 24,
      }}>
        <img src={AIicon} style={{ flexShrink: 0 }} />
        <p style={{ margin: 0, color: "#007432", fontSize: 14, fontWeight: 600 }}>
          AI extracted {items.length} items from your receipt at {store}. Please verify and confirm.
        </p>
      </div>

      {/* Sustainability Score */}
      <div style={{
        background: "#F2F4F6", borderRadius: 12,
        padding: 16, marginBottom: 20,
      }}>
        <h3 style={{ margin: 0 }}>Sustainability Score</h3>
        <p style={{ fontSize: 30, fontWeight: 700, color: "#006E2F", margin: "10px 0" }}>
          {sustainabilityScore}/10
        </p>
        <p style={{ margin: 0 }}>{sustainabilityTip}</p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: "#FDECEC", color: "#B00020",
          padding: 12, borderRadius: 8, marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      {/* LAYOUT — side by side on desktop, stacked on mobile */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 24, alignItems: "flex-start",
      }}>

        {/* LEFT — Receipt Image + Summary */}
        <div style={{
          background: "white", borderRadius: 12,
          border: "1px solid #BFC9BD",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          padding: 16, display: "flex", flexDirection: "column", gap: 16,
          width: isMobile ? "100%" : "40%",
          flexShrink: 0, boxSizing: "border-box",
        }}>
          {/* Receipt Image */}
          <div style={{
            background: "#ECEEF0", borderRadius: 8,
            border: "1px solid #BFC9BD", overflow: "hidden", position: "relative",
          }}>
            <img
              src={receiptImage || "https://placehold.co/600x400"}
              alt="Scanned receipt"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 100%)",
            }} />
          </div>

          {/* Store + Date + Total */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#404940", fontSize: 14, fontWeight: 600 }}>Store</span>
              <input
                value={store}
                onChange={(e) => setStore(e.target.value)}
                style={{
                  border: "1px solid #BFC9BD", borderRadius: 6, padding: "4px 10px",
                  fontSize: 14, fontWeight: 600, color: "#191C1E", textAlign: "right",
                  outline: "none", background: "white", maxWidth: 160,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#404940", fontSize: 14, fontWeight: 600 }}>Date</span>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  border: "1px solid #BFC9BD", borderRadius: 6, padding: "4px 10px",
                  fontSize: 14, fontWeight: 600, color: "#191C1E", textAlign: "right",
                  outline: "none", background: "white", maxWidth: 160,
                }}
              />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: 8, borderTop: "1px solid #BFC9BD",
            }}>
              <span style={{ fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Total</span>
              <input
                type="number" step="0.01"
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
                style={{
                  border: "1px solid #BFC9BD", borderRadius: 6, padding: "4px 10px",
                  fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#004C22",
                  textAlign: "right", outline: "none", background: "white", width: 120,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Itemized Breakdown + Buttons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

          {/* Itemized Breakdown Card */}
          <div style={{
            background: "white", borderRadius: 12,
            border: "1px solid #BFC9BD",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            padding: isMobile ? 16 : 24,
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <h2 style={{
              fontFamily: "inter", fontSize: 20,
              fontWeight: 600, color: "#191C1E", margin: 0,
            }}>
              Itemized Breakdown
            </h2>

            {/* Column Headers — hidden on mobile */}
            {!isMobile && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>Item Name</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>Price</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>Category</span>
              </div>
            )}

            {/* Item Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 120px 160px",
                    gap: 8,
                  }}
                >
                  <input
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    placeholder="Item name"
                    style={{
                      padding: "10px 14px", borderRadius: 8,
                      border: "1px solid #BFC9BD",
                      fontSize: 14, color: "#191C1E",
                      outline: "none", background: "white",
                    }}
                  />
                  <input
                    type="number" step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
                    placeholder="0.00"
                    style={{
                      padding: "10px 14px", borderRadius: 8,
                      border: "1px solid #BFC9BD",
                      fontSize: 14, color: "#191C1E",
                      outline: "none", background: "white",
                    }}
                  />
                  <select
                 value={item.category}
                 onChange={(e) => {
                 const value = e.target.value;

                if (value === "Other") {
                 setActiveItemIndex(index);
                 setNewCategory("");
                 setShowCategoryPopup(true);
                  return;
                 }

                 handleItemChange(index, "category", value);
                 }}
                  >
                 {userCategories.map((cat) => (
                   <option key={cat} value={cat}>
                {cat}
                </option>
               ))}
               </select>
                </div>
              ))}
            </div>

            {/* Add Item */}
            <button
              type="button"
              onClick={addItem}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "none", border: "none", cursor: "pointer",
                color: "#006E2F", fontSize: 14, fontWeight: 600, padding: 0,
              }}
            >
              <FaPlus size={14} />
              Add another item
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "flex-end",
            gap: 12,
          }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "14px 32px", borderRadius: 8,
                border: "1px solid #707A6F",
                background: "white", fontSize: 14, fontWeight: 600,
                color: "#191C1E", cursor: "pointer",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSaving}
              style={{
                padding: "14px 32px", borderRadius: 8, border: "none",
                background: "#004C22", fontSize: 14, fontWeight: 600,
                color: "white", cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.6 : 1,
                width: isMobile ? "100%" : "auto",
              }}
            >
              {isSaving ? "Saving..." : "Confirm & Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}