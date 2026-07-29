import React from "react";
import '../App.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../assets/google.svg";
import { loginUser, getUserProfile } from "../api";

export default function LoginRHS() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      // Login
      const data = await loginUser(email, password);
  
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
  
      // Fetch profile after login
      const profile = await getUserProfile();
  
      const user = profile.user || profile;
  
      localStorage.setItem(
        "userName",
        user.fullname || user.fullName || user.name || ""
      );
  
      localStorage.setItem(
        "avatarUrl",
        user.avatarUrl || ""
      );
  
      // Notify NavBar and TopNavbar
      window.dispatchEvent(new Event("avatarUpdated"));
  
      navigate("/Welcome");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-10 py-10">
      <div className="w-full max-w-[400px]">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['inter'] text-[32px] font-bold leading-10 text-[#191C1E]">
            Welcome back
          </h1>
          <p className="mt-1 text-base text-[#404940]">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-[#191C1E]"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full rounded-lg border px-4 py-3 text-[#191C1E] outline-none transition focus:ring-2 ${
                error
                  ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                  : "border-[#BFC9BD] focus:border-[#006E2F] focus:ring-[#006E2F]"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#191C1E]"
              >
                Password
              </label>
              <Link
                to="/ForgotPassword"
                className="text-sm font-semibold text-[#006E2F] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-[#191C1E] outline-none transition focus:ring-2 ${
                  error
                    ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                    : "border-[#BFC9BD] focus:border-[#006E2F] focus:ring-[#006E2F]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#404940]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-[#BFC9BD]"
            />
            <label htmlFor="remember" className="text-sm text-[#404940]">
              Remember for 30 days
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#004C22] py-3 font-semibold text-white transition hover:bg-[#006E2F] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>

          {/* Social buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#BFC9BD] rounded-lg text-[#191C1E] font-['Inter'] hover:bg-white transition"
            >
              <img src={google} alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>

        </form>

        {/* Signup Link */}
        <p className="mt-8 text-center text-sm text-[#404940]">
          Don't have an account?
          <Link to="/SignupPage" className="ml-1 text-[#006E2F] hover:underline">
            Sign up
          </Link>
        </p>

        {/* Footer */}
        <div className="mt-12 flex justify-center gap-6 text-xs font-medium text-[#707A6F]">
          <span>© 2026 EcoSpend Inc.</span>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </div>

      </div>
    </div>
  );
}