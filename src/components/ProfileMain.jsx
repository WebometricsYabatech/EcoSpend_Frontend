import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaBell, FaShieldAlt, FaDownload,
  FaTrash, FaLock, FaTimes, FaExclamationTriangle, FaCheck, FaCamera,
} from "react-icons/fa";
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  changePassword,
  deleteAccount,
  exportData,
  deleteAllReceipts,
} from "../api";

// ── TOGGLE ──
function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 48, height: 24, borderRadius: 9999,
        background: checked ? "#006E2F" : "#BFC9BD",
        padding: 4, display: "flex", alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 9999,
        background: "white", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
      }} />
    </div>
  );
}

// ── MODAL WRAPPER ──
function Modal({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 480 }}>
        {children}
      </div>
    </div>
  );
}

// ── DELETE RECEIPTS MODAL ──
function DeleteReceiptsModal({ onClose }) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await deleteAllReceipts();
      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 9999, background: "#FFDAD6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaTrash size={24} color="#BA1A1A" />
          </div>
          <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 24, fontWeight: 600, color: "#191C1E", textAlign: "center" }}>
            Clear Receipt History?
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: "#404940", textAlign: "center", lineHeight: "24px" }}>
            This will permanently remove all your receipts and reset your Eco Score. This action cannot be undone.
          </p>
          {error && <p style={{ margin: 0, fontSize: 14, color: "#BA1A1A" }}>{error}</p>}
          {success && <p style={{ margin: 0, fontSize: 14, color: "#006E2F" }}>All receipts deleted successfully.</p>}
        </div>

        <div style={{ padding: "0 24px 16px" }}>
          <div
            onClick={() => setConfirmed(!confirmed)}
            style={{ padding: 16, background: "#ECEEF0", borderRadius: 8, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: 4,
              border: `1px solid ${confirmed ? "#004C22" : "#BFC9BD"}`,
              background: confirmed ? "#004C22" : "white",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {confirmed && <FaCheck size={11} color="white" />}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#404940" }}>I understand this is permanent</span>
          </div>
        </div>

        <div style={{ padding: "16px 24px 24px", background: "#F2F4F6", display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={handleDelete}
            disabled={!confirmed || loading}
            style={{
              width: "100%", padding: "12px 24px", background: "#BA1A1A",
              borderRadius: 8, border: "none", color: "white",
              fontSize: 14, fontWeight: 600,
              opacity: confirmed && !loading ? 1 : 0.5,
              cursor: confirmed && !loading ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "Deleting..." : "Delete All Data"}
          </button>
          <button
            onClick={onClose}
            style={{ width: "100%", padding: "12px 24px", background: "white", borderRadius: 8, border: "1px solid #707A6F", color: "#004C22", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Keep My Data
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── EXPORT DATA MODAL ──
function ExportDataModal({ onClose }) {
  const [format, setFormat] = useState("CSV");
  const [dateRange, setDateRange] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExport = async () => {
    setLoading(true);
    setError("");
    try {
      const blob = await exportData(format, dateRange);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ecospend-export.${format.toLowerCase()}`;
      a.click();
      window.URL.revokeObjectURL(url);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)", padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 24, fontWeight: 600, color: "#191C1E" }}>Export Your Data</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#404940", lineHeight: "20px" }}>
              Select your preferred format and time range.
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <FaTimes size={14} color="#404940" />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#191C1E" }}>File Format</span>
          <div style={{ display: "flex", gap: 32 }}>
            {["CSV", "JSON"].map((f) => (
              <div key={f} onClick={() => setFormat(f)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: 9999, border: `2px solid ${format === f ? "#004C22" : "#707A6F"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {format === f && <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#004C22" }} />}
                </div>
                <span style={{ fontSize: 16, color: "#191C1E" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#191C1E" }}>Date Range</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #BFC9BD", fontSize: 16, color: "#191C1E", background: "white", outline: "none" }}
          >
            <option value="all">All time</option>
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="year">This year</option>
          </select>
        </div>

        <div style={{ padding: 8, background: "#F2F4F6", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <FaLock size={14} color="#004C22" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#404940", lineHeight: "16px" }}>
            The generated file will be encrypted and password protected for your security.
          </p>
        </div>

        {error && <p style={{ margin: 0, fontSize: 14, color: "#BA1A1A" }}>{error}</p>}

        <div style={{ display: "flex", gap: 8, paddingTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px 24px", background: "white", borderRadius: 8, border: "1px solid #707A6F", color: "#404940", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={loading}
            style={{ flex: 1, padding: "12px 24px", background: "#004C22", borderRadius: 8, border: "none", color: "white", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Exporting..." : "Download Export"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── DELETE ACCOUNT MODAL ──
function DeleteAccountModal({ onClose }) {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isConfirmed = confirmText === "DELETE";

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await deleteAccount();
      localStorage.removeItem("token");
      localStorage.removeItem("avatarUrl");
      localStorage.removeItem("userName");
      navigate("/LoginPage");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)", border: "1px solid #BFC9BD", padding: 32, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 9999, background: "#FFDAD6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <FaExclamationTriangle size={30} color="#BA1A1A" />
        </div>
        <h2 style={{ margin: "0 0 16px", fontFamily: "inter", fontSize: 24, fontWeight: 600, color: "#191C1E", textAlign: "center" }}>
          We're sorry to see you go
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 16, color: "#404940", textAlign: "center", lineHeight: "24px", maxWidth: 420 }}>
          Deleting your account will erase all history, scores, and personal data. This action is{" "}
          <span style={{ color: "#BA1A1A" }}>permanent</span> and cannot be undone.
        </p>

        <div style={{ width: "100%", marginBottom: 32 }}>
          <p style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600, color: "#404940" }}>
            To confirm, please type "DELETE" in the box below.
          </p>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            style={{
              width: "100%", padding: "14px 16px", background: "#F7F9FB",
              borderRadius: 8,
              border: `1px solid ${confirmText.length > 0 ? "#BA1A1A" : "#BFC9BD"}`,
              boxShadow: confirmText.length > 0 ? "0 0 0 2px #BA1A1A" : "none",
              fontSize: 16, color: "#191C1E", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {error && <p style={{ margin: "0 0 16px", fontSize: 14, color: "#BA1A1A" }}>{error}</p>}

        <div style={{ width: "100%", display: "flex", gap: 16, marginBottom: 24 }}>
          <button
            onClick={handleDelete}
            disabled={!isConfirmed || loading}
            style={{
              flex: 1, padding: "12px 24px", background: "#BA1A1A",
              borderRadius: 8, border: "none", color: "white",
              fontSize: 14, fontWeight: 600,
              opacity: isConfirmed && !loading ? 1 : 0.5,
              cursor: isConfirmed && !loading ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "Deleting..." : "Permanently Delete Account"}
          </button>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: "12px 24px", background: "#E6E8EA", borderRadius: 8, border: "none", color: "#191C1E", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <FaLock size={12} color="#707A6F" />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#707A6F" }}>High-Security Action Required</span>
        </div>
      </div>
    </Modal>
  );
}

// ── MAIN PAGE ──
export default function ProfileSettings() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("avatarUrl") || null
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [expenseReminders, setExpenseReminders] = useState(false);
  const [modal, setModal] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const avatarInputRef = useRef(null);

  const passwordMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
  const passwordMatch = confirmPassword.length > 0 && newPassword === confirmPassword;

  // Load profile on mount
  useEffect(() => {
    getUserProfile()
      .then((data) => {
        const user = data.user;
  
        setFullName(user.fullname || "");
        setEmail(user.email || "");
        setAvatarUrl(user.avatarUrl || null);
  
        localStorage.setItem("userName", user.fullname || "");
  
        if (user.avatarUrl) {
          localStorage.setItem("avatarUrl", user.avatarUrl);
        }
      })
      .catch((err) => {
        console.error(err);
  
        setFullName(localStorage.getItem("userName") || "");
        setAvatarUrl(localStorage.getItem("avatarUrl") || null);
      });
  }, []);

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarLoading(true);
    try {
      const data = await uploadAvatar(file);
      const url = data.avatarUrl;
      setAvatarUrl(url);
      localStorage.setItem("avatarUrl", url); // ← persist
      // Trigger storage event so NavBar updates without reload
      window.dispatchEvent(new Event("avatarUpdated"));
    } catch (err) {
      console.error(err);
    } finally {
      setAvatarLoading(false);
    }
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    if (passwordMismatch) return;
    setSaveLoading(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const data = await updateUserProfile({
        fullName,
        name: fullName,
      });
      
      const updatedName = data.fullName || data.name || fullName;
      
      setFullName(updatedName);
      localStorage.setItem("userName", updatedName);
      
      // Notify other components (like the navbar)
      window.dispatchEvent(new Event("profileUpdated"));
      if (newPassword) {
        await changePassword(newPassword);
      }

      setSaveSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 40px 48px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

        {/* ── LEFT: PROFILE ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Avatar + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 160, height: 160, borderRadius: 9999, overflow: "hidden", outline: "4px solid white", boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", background: "#E6E8EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={() => {
                      // If image fails to load (e.g. tracking prevention), show fallback
                      setAvatarUrl(null);
                      localStorage.removeItem("avatarUrl");
                    }}
                  />
                ) : (
                  <FaUser size={64} color="#BFC9BD" />
                )}
              </div>

              <button
                onClick={() => avatarInputRef.current?.click()}
                disabled={avatarLoading}
                style={{
                  position: "absolute", bottom: 4, right: 4,
                  width: 36, height: 36, borderRadius: 9999,
                  background: "#004C22", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  opacity: avatarLoading ? 0.6 : 1,
                }}
              >
                {avatarLoading
                  ? <span style={{ width: 14, height: 14, border: "2px solid white", borderTopColor: "transparent", borderRadius: 9999, display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  : <FaCamera size={14} color="white" />
                }
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <h1 style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#004C22" }}>
                Profile
              </h1>
              <p style={{ margin: 0, fontSize: 16, color: "#404940", lineHeight: "24px" }}>
                Manage your identity and security settings.
              </p>
            </div>
          </div>

          {/* Form card */}
          <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", padding: 24 }}>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: "#404940", letterSpacing: 0.14 }}>Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ padding: "12px 16px", background: "#F2F4F6", border: "1px solid #BFC9BD", borderRadius: 8, fontSize: 16, color: "#191C1E", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: "#404940", letterSpacing: 0.14 }}>Email Address (Read-only)</label>
                <input
                  readOnly
                  value={email}
                  style={{ padding: "12px 16px", background: "#E0E3E5", border: "1px solid #BFC9BD", borderRadius: 8, fontSize: 16, color: "#404940", outline: "none", cursor: "not-allowed" }}
                />
              </div>

              <div style={{ paddingTop: 24, borderTop: "1px solid #BFC9BD", display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#004C22" }}>Security</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "#404940", letterSpacing: 0.14 }}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ padding: "14px 16px", background: "#F2F4F6", border: "1px solid #BFC9BD", borderRadius: 8, fontSize: 16, color: "#191C1E", outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "#404940", letterSpacing: 0.14 }}>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      padding: "14px 16px", background: "#F2F4F6",
                      border: `1px solid ${passwordMismatch ? "#BA1A1A" : passwordMatch ? "#006E2F" : "#BFC9BD"}`,
                      borderRadius: 8, fontSize: 16, color: "#191C1E", outline: "none",
                    }}
                  />
                  {passwordMismatch && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <FaTimes size={11} color="#BA1A1A" />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#BA1A1A" }}>Passwords do not match.</span>
                    </div>
                  )}
                  {passwordMatch && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <FaCheck size={11} color="#006E2F" />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#006E2F" }}>Passwords match.</span>
                    </div>
                  )}
                </div>
              </div>

              {saveError && <p style={{ margin: 0, fontSize: 14, color: "#BA1A1A" }}>{saveError}</p>}
              {saveSuccess && <p style={{ margin: 0, fontSize: 14, color: "#006E2F" }}>Changes saved successfully!</p>}

              <div style={{ paddingTop: 8, display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={saveLoading || passwordMismatch}
                  style={{
                    padding: "12px 32px", background: "#004C22", borderRadius: 8, border: "none",
                    color: "white", fontSize: 14, fontWeight: 600,
                    cursor: saveLoading || passwordMismatch ? "not-allowed" : "pointer",
                    opacity: saveLoading || passwordMismatch ? 0.6 : 1,
                  }}
                >
                  {saveLoading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── RIGHT: SETTINGS ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h1 style={{ margin: "0 0 4px", fontFamily: "inter", fontSize: 32, fontWeight: 700, color: "#004C22" }}>Settings</h1>
            <p style={{ margin: 0, fontSize: 16, color: "#404940", lineHeight: "24px" }}>Customize your experience and manage data.</p>
          </div>

          {/* Data & Privacy */}
          <div style={{ background: "white", borderRadius: 12, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FaShieldAlt size={16} color="#004C22" />
              <h2 style={{ margin: 0, fontFamily: "inter", fontSize: 20, fontWeight: 600, color: "#004C22" }}>Data & Privacy</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                onClick={() => setModal("export")}
                onMouseEnter={(e) => e.currentTarget.style.background = "#F7F9FB"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                style={{ padding: 16, borderRadius: 8, border: "1px solid #BFC9BD", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#191C1E" }}>Export data</p>
                  <p style={{ margin: 0, fontSize: 14, color: "#404940", lineHeight: "20px" }}>Download all your financial history in CSV/JSON format.</p>
                </div>
                <FaDownload size={16} color="#404940" />
              </div>

              <div
                onClick={() => setModal("deleteReceipts")}
                onMouseEnter={(e) => e.currentTarget.style.background = "#F7F9FB"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                style={{ padding: 16, borderRadius: 8, border: "1px solid #BFC9BD", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#191C1E" }}>Delete all receipts</p>
                  <p style={{ margin: 0, fontSize: 14, color: "#404940", lineHeight: "20px" }}>Permanently remove your transaction history.</p>
                </div>
                <FaTrash size={16} color="#404940" />
              </div>

              <div
                onClick={() => setModal("deleteAccount")}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,218,214,0.20)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,218,214,0.10)"}
                style={{ padding: 16, borderRadius: 8, background: "rgba(255,218,214,0.10)", border: "1px solid rgba(186,26,26,0.30)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#BA1A1A" }}>Delete account</p>
                  <p style={{ margin: 0, fontSize: 14, color: "rgba(186,26,26,0.80)", lineHeight: "20px" }}>Completely close your account and wipe all personal data.</p>
                </div>
                <FaExclamationTriangle size={18} color="#BA1A1A" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === "deleteReceipts" && <DeleteReceiptsModal onClose={() => setModal(null)} />}
      {modal === "export" && <ExportDataModal onClose={() => setModal(null)} />}
      {modal === "deleteAccount" && <DeleteAccountModal onClose={() => setModal(null)} />}
    </div>
  );
}