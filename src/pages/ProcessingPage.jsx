import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheck, FaReceipt } from "react-icons/fa";
import { FaHourglass } from "react-icons/fa6";
import { scanReceipt } from "../api";

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Uploading receipt...");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file;

  useEffect(() => {
    if (!file) {
      navigate("/UploadReceipt");
      return;
    }

    const processReceipt = async () => {
      try {
        // Step 1
        setProgress(20);
        setStatus("Uploading receipt...");
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Step 2
        setProgress(40);
        setStatus("Reading receipt...");

        const response = await scanReceipt(file);
        const extracted = response.extractedData;
        console.log(response);
        // Step 3
        setProgress(70);
        setStatus("Calculating carbon footprint...");
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Step 4
        setProgress(90);
        setStatus("Generating sustainability insights...");
        await new Promise((resolve) => setTimeout(resolve, 800));

        setProgress(100);
        setStatus("Complete!");

        setTimeout(() => {
          navigate("/ReviewPage", {
            state: {
              receiptData: {
                receiptImage: URL.createObjectURL(file),
                store: extracted.store,
                date: extracted.date,
                total: extracted.totalAmount,
                items: extracted.items,
                sustainabilityScore: extracted.sustainabilityScore,
                sustainabilityTip: extracted.sustainabilityTip,
              },
            },
          });
        }, 500);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong. Please try again.");
      }
    };

    processReceipt();
  }, [file, navigate]);

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
        {/* Spinner */}
        <div className="mx-auto mb-8 flex h-28 w-28 animate-spin items-center justify-center rounded-full border-4 border-green-400 border-t-transparent">
          <FaReceipt size={40} className="text-green-300" />
        </div>

        <h1 className="font-['Inter'] text-4xl font-bold text-white">
          Processing Receipt
        </h1>

        <p className="mt-4 text-lg text-green-100">
          Our AI is analyzing your receipt and calculating its environmental
          impact.
        </p>

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

            <div className="mt-8 space-y-3 text-left text-green-100">
              <div className="flex items-center gap-3">
                {progress >= 20 ? <FaCheck /> : <FaHourglass />}
                <span>Upload Receipt</span>
              </div>

              <div className="flex items-center gap-3">
                {progress >= 40 ? <FaCheck /> : <FaHourglass />}
                <span>Extract Items</span>
              </div>

              <div className="flex items-center gap-3">
                {progress >= 70 ? <FaCheck /> : <FaHourglass />}
                <span>Calculate Carbon Impact</span>
              </div>

              <div className="flex items-center gap-3">
                {progress >= 90 ? <FaCheck /> : <FaHourglass />}
                <span>Generate Insights</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}