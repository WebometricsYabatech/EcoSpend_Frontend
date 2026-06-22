import React from "react";
import "../App.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AIicon from "../assets/AI-iconGreen.svg";

const CATEGORY_OPTIONS = [
  "Groceries",
  "Food & Dining",
  "Transport",
  "Utilities",
  "Health",
  "Entertainment",
  "Shopping",
  "Other",
];

const EMPTY_ITEM = { name: "", price: "", category: "Groceries" };

export default function ReviewReceipt() {
  const navigate = useNavigate();
  const location = useLocation();

  const scannedData = location.state?.receiptData || {
    store: "Whole Foods Market",
    date: "Oct 24, 2023",
    total: "$42.85",
    items: [
      { name: "Organic Spinach", price: "$4.99", category: "Groceries" },
      { name: "Fair Trade Coffee", price: "$12.50", category: "Groceries" },
      { name: "Almond Milk", price: "$3.99", category: "Groceries" },
    ],
  };

  const [store, setStore] = useState(scannedData.store);
  const [date, setDate] = useState(scannedData.date);
  const [total, setTotal] = useState(scannedData.total);
  const [items, setItems] = useState(scannedData.items);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { ...EMPTY_ITEM }]);
  };

  const handleConfirm = () => {
    console.log("Confirmed receipt:", { store, date, total, items });
    navigate("/ReviewDetails");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", fontFamily: "Inter, sans-serif" }}>

      {/* Page Title */}
      <h1 style={{ fontFamily: "inter, sans-serif", fontSize: 32, fontWeight: 700, color: "#191C1E", margin: "0 0 32px" }}>
        Review Receipt
      </h1>

      {/* AI Banner */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 24px",
        background: "rgba(107, 255, 143, 0.30)",
        borderRadius: 12,
        border: "1px solid #006E2F",
        marginBottom: 32,
      }}>
        <img src={AIicon}/>
        <p style={{ margin: 0, color: "#007432", fontSize: 14, fontWeight: 600 }}>
          AI extracted {items.length} items from your receipt at {store}. Please verify and confirm.
        </p>
      </div>

      {/* SIDE BY SIDE LAYOUT */}
      <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start" }}>

        {/* LEFT — Receipt Image + Summary Card */}
        <div style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #BFC9BD",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "40%",
          flexShrink: 0,
        }}>
          {/* Receipt Image */}
          <div style={{
            background: "#ECEEF0",
            borderRadius: 8,
            border: "1px solid #BFC9BD",
            overflow: "hidden",
            position: "relative",
          }}>
            <img
              src="https://placehold.co/600x400"
              alt="Scanned receipt"
              style={{ width: "100%", opacity: 0.9, display: "block" }}
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
                  outline: "none", background: "white",
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
                  outline: "none", background: "white",
                }}
              />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: 8, borderTop: "1px solid #BFC9BD",
            }}>
              <span style={{ fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E" }}>Total</span>
              <input
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                style={{
                  border: "1px solid #BFC9BD", borderRadius: 6, padding: "4px 10px",
                  fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#004C22",
                  textAlign: "right", outline: "none", background: "white", width: 120,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Itemized Breakdown + Action Buttons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Itemized Breakdown Card */}
          <div style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #BFC9BD",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>
            <h2 style={{ fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#191C1E", margin: 0 }}>
              Itemized Breakdown
            </h2>

            {/* Column Headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>Item Name</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>Price</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>Category</span>
            </div>

            {/* Item Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px", gap: 12 }}>
                  <input
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    placeholder="Item name"
                    style={{
                      padding: "11px 16px", borderRadius: 8, border: "1px solid #BFC9BD",
                      fontSize: 16, color: "#191C1E", outline: "none", background: "white",
                    }}
                  />
                  <input
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", e.target.value)}
                    placeholder="$0.00"
                    style={{
                      padding: "11px 16px", borderRadius: 8, border: "1px solid #BFC9BD",
                      fontSize: 16, color: "#191C1E", outline: "none", background: "white",
                    }}
                  />
                  <select
                    value={item.category}
                    onChange={(e) => handleItemChange(index, "category", e.target.value)}
                    style={{
                      padding: "11px 16px", borderRadius: 8, border: "1px solid #BFC9BD",
                      fontSize: 16, color: "#191C1E", outline: "none", background: "white",
                      cursor: "pointer",
                    }}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
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
              <FaPlus size={16} />
              Add another item
            </button>
          </div>

          {/* Action Buttons — sit below the breakdown on the right side */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "16px 32px", borderRadius: 8, border: "1px solid #707A6F",
                background: "white", fontSize: 14, fontWeight: 600, color: "#191C1E",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              style={{
                padding: "16px 32px", borderRadius: 8, border: "none",
                background: "#004C22", fontSize: 14, fontWeight: 600, color: "white",
                cursor: "pointer",
              }}
            >
              Confirm & Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}