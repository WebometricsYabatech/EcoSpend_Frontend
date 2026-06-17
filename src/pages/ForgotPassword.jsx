import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import EcoIconOutline from "../assets/eco-iconOutline.svg";

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#F7F9FB] px-6">

      {/* Background Blurs */}
      <div className="absolute left- [-100px] top- [-100px] h-96 w-96 rounded-full bg-[#6BFF8F]/40 blur-[80px]" />

      <div className="absolute bottom- [-100px] right- [-100px] h-96 w-96 rounded-full bg-[#6BFF8F]/40 blur-[80px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w- [440px] rounded-xl bg-white p-12 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#004C22]">
            <img src={EcoIconOutline}/>
          </div>

          <h1 className="mt-2 font-['DM_Sans'] text-2xl font-bold text-[#004C22]">
            EcoSpend
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="font-['Inter'] text-2xl font-semibold text-[#191C1E]">
            Reset your password
          </h2>

          <p className="mt-2 text-base leading-6 text-[#404940]">
            Enter your email and we'll send you a reset
            link.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#404940]"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-lg border border-[#BFC9BD] px-4 py-3 pr-10 text-[#191C1E] outline-none transition focus:border-[#006E2F] focus:ring-2 focus:ring-[#006E2F]"
              />

              <FaEnvelope
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#40494080]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004C22] py-4 font-semibold text-white transition hover:bg-[#006E2F]"
          >
            Send reset link
            <FaArrowRight />
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              to="/LoginPage"
              className="text-sm font-semibold text-[#404940] hover:text-[#006E2F]"
            >
              Back to login
            </Link>
          </div>

        </form>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs font-medium text-[#40494099]">
        © 2026 EcoSpend. Secure Sustainable Finance.
      </div>

    </div>
  );
}