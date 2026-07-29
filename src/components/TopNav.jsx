import React, { useEffect, useState } from "react";
import "../App.css";
import ecoIcon from "../assets/eco-icon.svg";

export default function TopNavbar() {
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("avatarUrl") || "https://placehold.co/40x40"
  );

  useEffect(() => {
    const updateAvatar = () => {
      const newAvatar = localStorage.getItem("avatarUrl");
      if (newAvatar) {
        setAvatarUrl(newAvatar);
      }
    };

    // Listen for avatar updates
    window.addEventListener("avatarUpdated", updateAvatar);

    return () => {
      window.removeEventListener("avatarUpdated", updateAvatar);
    };
  }, []);

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
          src={avatarUrl}
          alt="Profile"
          className="h-10 w-10 object-cover"
        />
      </button>
    </header>
  );
}