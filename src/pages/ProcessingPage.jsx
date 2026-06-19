import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaReceipt } from "react-icons/fa";
import { FaHourglass } from "react-icons/fa6";

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(
    "Uploading receipt..."
  );

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;

        if (next >= 30) {
          setStatus("Reading receipt...");
        }

        if (next >= 60) {
          setStatus("Calculating carbon footprint...");
        }

        if (next >= 85) {
          setStatus("Generating sustainability insights...");
        }

        if (next >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            navigate("/results");
          }, 1000);

          return 100;
        }

        return next;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#005321] px-6">

      <div className="w-full max-w-lg text-center">

        {/* Animated Circle */}
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-green-400 border-t-transparent animate-spin">

          <FaReceipt
            size={40}
            className="text-green-300"
          />

        </div>

        {/* Heading */}
        <h1 className="font-['DM_Sans'] text-4xl font-bold text-white">
          Processing Receipt
        </h1>

        <p className="mt-4 text-lg text-green-100">
          Our AI is analyzing your receipt and
          calculating its environmental impact.
        </p>

        {/* Progress Bar */}
        <div className="mt-10">

          <div className="mb-2 flex justify-between text-sm text-green-200">
            <span>{status}</span>
            <span>{progress}%</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-green-900">

            <div
              className="h-full rounded-full bg-green-400 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Processing Steps */}
        <div className="mt-8 space-y-3 text-left text-green-100">

          <div>
            <FaCheck/> Upload Receipt
          </div>

          <div>
            {progress >= 30 ? <FaCheck/> : <FaHourglass/>} Extract Items
          </div>

          <div>
            {progress >= 60 ? <FaCheck/> : <FaHourglass/>} Calculate Carbon Impact
          </div>

          <div>
            {progress >= 85 ? <FaCheck/> : <FaHourglass/>} Generate Insights
          </div>

        </div>

      </div>

    </div>
  );
}