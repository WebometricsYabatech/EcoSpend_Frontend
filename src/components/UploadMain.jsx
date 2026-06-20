import React from "react";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import aiIcon from "../assets/AI-icon.svg";

export default function UploadReceipt() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleProcessReceipt = () => {
    if (!file) {
      alert("Please upload a receipt first.");
      return;
    }

    // Pass the file to ProcessingPage via location.state
    navigate("/ProcessingPage", { state: { file } });
  };

  return (
    <div className="flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="font-['inter'] text-3xl font-bold text-[#004C22]">
            Add New Receipt
          </h1>
          <p className="mt-2 text-base text-[#404940]">
            Upload your paper or digital receipt to track your eco-impact.
          </p>
        </div>

        {/* Upload Area */}
        <label
          htmlFor="receipt-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#004C22]/30 bg-[#F7F9FB] px-8 py-14 transition hover:border-[#004C22] hover:bg-[#f0f7f2]"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#6BFF8F]">
            <FaPlus size={34} className="text-[#004C22]" />
          </div>

          <h2 className="font-['Inter'] text-xl font-semibold text-[#004C22]">
            Drag and drop or click to upload
          </h2>

          <p className="mt-2 text-sm text-[#404940]">
            Supports JPG, PNG, PDF (Max 10MB)
          </p>

          {file && (
            <div className="mt-6 rounded-lg bg-white px-4 py-2 shadow-sm">
              <p className="text-sm font-medium text-[#004C22]">{file.name}</p>
            </div>
          )}

          <input
            id="receipt-upload"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={handleProcessReceipt}
            disabled={!file}
            className={`flex items-center gap-3 rounded-lg px-8 py-5 font-semibold text-white transition ${
              file
                ? "bg-[#004C22] hover:bg-[#006E2F]"
                : "cursor-not-allowed bg-[#006E2F] opacity-60"
            }`}
          >
            <img src={aiIcon} />
            Process Receipt with AI
          </button>
        </div>

      </div>
    </div>
  );
}