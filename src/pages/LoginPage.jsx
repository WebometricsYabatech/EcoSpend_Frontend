import React from "react";
import '../App.css';
import LoginLHS from "../components/LoginLHS";
import LoginRHS from "../components/Login.RHS";

export default function Login() {
  return (
    <div className="flex min-h-screen">
    {/* Left Side */}
    <div className="hidden lg:flex lg:w-1/2">
      <LoginLHS />
    </div>
     {/* Right Side */}
     <div className="w-full lg:w-1/2">
        <LoginRHS />
      </div>
    </div>
  );
}