import React from "react";
import "../App.css";
import ecoIcon from "../assets/eco-icon.svg";

export default function TopNavbar() {
  return (
    <header className="flex h-20 items-center justify-between bg-[#F7F9FB] px-10 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={ecoIcon}
          alt="EcoSpend Logo"
          className="h-8 w-8"
        />

        <h1 className="font-['Inter'] text-2xl font-bold text-[#004C22]">
          EcoSpend
        </h1>
      </div>

      {/* User Profile */}
      <button className="overflow-hidden rounded-full border border-[#BFC9BD]">
        <img
          src="https://placehold.co/32x32"
          alt="Profile"
          className="h-10 w-10 object-cover"
        />
      </button>
    </header>
  );
}