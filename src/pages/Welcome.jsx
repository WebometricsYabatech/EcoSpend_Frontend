import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FaLeaf, FaLock, FaArrowRight, FaReceipt } from "react-icons/fa";
import ecoIcon from "../assets/eco-icon.svg";
import aiIcon from "../assets/AI-iconGreen.svg";
import { FaClock, FaClockRotateLeft } from "react-icons/fa6";

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-[#F7F9FB] flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* Background Blurs */}
      <div className="absolute top- [-100px] right- [-100px] h-96 w-96 rounded-full bg-[#6BFF8F]/30 blur-[120px]" />

      <div className="absolute bottom- [-100px] left- [-100px] h- [500px] w- [500px] rounded-full bg-[#A6F4B5]/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-3xl">

       {/*logo*/}
      <div className="mb-10 flex justify-center items-center gap-2">
  <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
    <img
      src={ecoIcon}
      alt="EcoSpend Logo"
      className="w-6 h-6 object-contain"
    />
  </div>

  <h1 className="font-['Inter'] text-3xl font-bold text-[#004C22]">
    EcoSpend
  </h1>
</div>

        {/* Hero Card */}
        <div className="rounded-xl bg-white/40 backdrop-blur-md border border-white/60 p-10 shadow-sm">

          {/* Illustration */}
          <div className="relative flex justify-center mb-10">

            <div className="absolute h-64 w-64 rounded-full bg-[#6BFF8F]/30 blur-[80px]" />

            <div className="absolute h-32 w-32 rounded-full bg-[#A6F4B5]/40 blur- [40px]" />

            <div className="relative z-10 rounded-xl bg-[#F7F9FB] p-8 shadow-lg">
              <FaReceipt
                size={60}
                className="text-[#166534]"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center">

            <h2 className="font-['inter'] text-5xl font-bold leading-tight text-[#191C1E]">
              Welcome 
        
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-s leading-7 text-[#404940]">
              Let's start by uploading your first receipt.
              
            </p>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <div className="flex items-center gap-2 rounded-full bg-[#6BFF8F]/30 px-4 py-2">
                <img src={aiIcon} className="text-[#006E2F]" />
                <span className="text-s font-semibold text-[#005321]">
                  AI Carbon Tracking
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#D4E4FA]/30 px-4 py-2">
                <FaClockRotateLeft className="text-[#39485A]"/>
                <span className="text-s font-semibold text-[#39485A]">
                  &lt; 30 Seconds
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 space-y-4">

          <Link to="/UploadReceipt">
          <button
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#004C22] py-4 text-s font-semibold text-white transition hover:bg-[#006E2F]"
          >
            <FaReceipt />
            Upload your first receipt
            <FaArrowRight />
          </button>
          </Link>

          <Link
            to="/dashboard"
            className="block text-center text-sm font-semibold text-[#404940] hover:text-[#006E2F]"
          >
            Skip for now, take me to dashboard
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-center items-center gap-2 text-[#191C1E]/60">

          <FaLock size={12} />

          <span className="text-xs font-medium">
            Your data is encrypted and secure
          </span>

        </div>

      </div>
    </div>
  );
}