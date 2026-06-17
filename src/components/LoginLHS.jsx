import React from "react";
import { FaReceipt } from "react-icons/fa";
import '../App.css';
import ecoIconLight from "../assets/eco-iconLight.svg";
import ecoScan from "../assets/ScanPreview.png";

function LoginLHS() {
    return (
        
      <div className="relative flex flex-col justify-center bg-[#004C22] overflow-hidden px-12 py-16 text-white"
    >
  
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#6BFF8F] opacity-20" />
  
        <div className="absolute bottom-0 left-0 w-72 h-60 bg-[#A6F4B5] opacity-10" />
  
        {/* Content */}
        <div className="relative z-10 max-w- [448px]">
  
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 ">
            <img
              src={ecoIconLight}
              alt="EcoSpend"
              className="w-9 h-9"
            />
  
            <h1 className="text-[32px] font-bold leading-10 text-[#A6F4B5]">
              EcoSpend
            </h1>
          </div>
  
          {/* Heading */}
          <h2 className="text-[48px] font-bold leading- [60px] text-[#101110]">
            Track what you
            <br />
            spend. See what it
            <br />
            costs the planet.
          </h2>
  
          {/* Description */}
          <p className="mt-6 text-[18px] leading-7 text-[#8BD79B]">
            Join thousands of conscious consumers making
            better financial choices for a greener tomorrow.
            Your bank account and the earth will thank you.
          </p>
  
          {/* Card */}
          <div className="mt-10">
            <div className="relative overflow-hidden rounded-xl bg-[#166534] shadow-2xl">
  
              <img
                src={ecoScan}
                alt="Eco Scan"
                className="w-full h-64 object-cover opacity-60 mix-blend-overlay"
              />
  
              <div className="absolute inset-0 flex items-center justify-center">
  
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col items-center gap-2">
  
                  <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
                    <FaReceipt/>
                  </div>
  
                  <p className="text-sm font-semibold text-white">
                    Eco-Scan Processing...
                  </p>
  
                </div>
  
              </div>
  
            </div>
          </div>
  
        </div>
      </div>
      
    );
  }
  export default LoginLHS;