import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheck, FaReceipt } from "react-icons/fa";
import { FaHourglass } from "react-icons/fa6";

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Uploading receipt...");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file;

  useEffect(() => {
    if (!file) {
      // No file passed — go back to upload
      navigate("/UploadReceipt");
      return;
    }

    const processReceipt = async () => {
      try {
        // Step 1 — Upload
        setProgress(20);
        setStatus("Uploading receipt...");

        const formData = new FormData();
        formData.append("receipt", file);

        // Step 2 — Send to backend
        setProgress(40);
        setStatus("Reading receipt...");

        const response = await fetch("http://localhost:5000/api/receipts/scan", {
          method: "POST",
          body: formData,
          // Don't set Content-Type — browser sets it with boundary for FormData
        });

        if (!response.ok) {
          throw new Error("Failed to process receipt.");
        }

        // Step 3 — Carbon calculation (backend handles this)
        setProgress(70);
        setStatus("Calculating carbon footprint...");

        const data = await response.json();

        // Step 4 — Insights
        setProgress(90);
        setStatus("Generating sustainability insights...");

        // Short pause so the user sees 90% before navigating
        await new Promise((res) => setTimeout(res, 800));

        setProgress(100);

        // Navigate to ReviewReceipt and pass the AI data
        setTimeout(() => {
          navigate("/ReviewReceipt", {
            state: {
              receiptData: {
                store: data.store,
                date: data.date,
                total: data.total,
                items: data.items, // [{ name, price, category }]
              },
            },
          });
        }, 500);

      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      }
    };

    processReceipt();
  }, [file, navigate]);

  // Fallback animated progress bar while waiting for backend
  useEffect(() => {
    if (error) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(timer);
          return prev;
        }
        return prev + 2;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#005321] px-6">
      <div className="w-full max-w-lg text-center">

        {/* Animated Circle */}
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-green-400 border-t-transparent animate-spin">
          <FaReceipt size={40} className="text-green-300" />
        </div>

        {/* Heading */}
        <h1 className="font-['Inter'] text-4xl font-bold text-white">
          Processing Receipt
        </h1>

        <p className="mt-4 text-lg text-green-100">
          Our AI is analyzing your receipt and calculating its environmental impact.
        </p>

        {/* Error state */}
        {error ? (
          <div className="mt-8 rounded-lg bg-red-900/40 p-4 text-red-200">
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => navigate("/UploadReceipt")}
              className="mt-3 text-sm underline"
            >
              Go back and try again
            </button>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mt-10">
              <div className="mb-2 flex justify-between text-sm text-green-200">
                <span>{status}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-green-900">
                <div
                  className="h-full rounded-full bg-green-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Processing Steps */}
            <div className="mt-8 space-y-3 text-left text-green-100">
              <div className="flex items-center gap-3">
                <FaCheck /> Upload Receipt
              </div>
              <div className="flex items-center gap-3">
                {progress >= 40 ? <FaCheck /> : <FaHourglass />} Extract Items
              </div>
              <div className="flex items-center gap-3">
                {progress >= 70 ? <FaCheck /> : <FaHourglass />} Calculate Carbon Impact
              </div>
              <div className="flex items-center gap-3">
                {progress >= 90 ? <FaCheck /> : <FaHourglass />} Generate Insights
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}