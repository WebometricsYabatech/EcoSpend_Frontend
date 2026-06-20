import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import google from "../assets/google.svg";
import ecoIcon from "../assets/eco-icon.svg";
import { signupUser } from "../api";

export default function SignupRHS() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // ---- PASSWORD STRENGTH LOGIC ----
  const getPasswordStrength = (password) => {
    if (!password) return { label: "", percent: 0, color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", percent: 33, color: "#F59E0B" };
    if (score <= 4) return { label: "Medium", percent: 66, color: "#3B82F6" };
    return { label: "Strong", percent: 100, color: "#16A34A" };
  };

  const strength = getPasswordStrength(formData.password);

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const passwordsDontMatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (strength.label === "Weak") {
      setError("Please choose a stronger password.");
      return;
    }

    setLoading(true);

    try {
      await signupUser(formData.fullName, formData.email, formData.password);
      navigate("/LoginPage");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center bg-[#F7F9FB] px-6 py-12">
      <div className="w-full max-w-md flex flex-col gap-8 pb-4">

        {/* Logo + Heading */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 pb-2">
            <img src={ecoIcon} />
            <h1 className="text-2xl font-bold text-[#004C22] font-['inter']">
              EcoSpend
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-[#191C1E] font-['inter']">
            Create your account
          </h2>

          <p className="text-base text-[#404940] mt-1 font-['Inter']">
            Start managing your green finances today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#404940] font-['Inter']">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#BFC9BD] text-[#191C1E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#004C22] font-['Inter']"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#404940] font-['Inter']">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#BFC9BD] text-[#191C1E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#004C22] font-['Inter']"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#404940] font-['Inter']">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 pr-10 bg-white rounded-lg border border-[#BFC9BD] text-[#191C1E] focus:outline-none focus:ring-2 focus:ring-[#004C22] font-['Inter']"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404940]"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Strength meter */}
            {formData.password && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between text-xs font-['Inter']">
                  <span>
                    <span className="text-[#B9C8DE]">Strength: </span>
                    <span style={{ color: strength.color }} className="font-medium">
                      {strength.label}
                    </span>
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-[#E6E8EA] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${strength.percent}%`,
                      backgroundColor: strength.color,
                    }}
                  />
                </div>

                {strength.label === "Weak" && (
                  <p className="text-xs text-[#D97706] font-['Inter']">
                    Use 8+ characters with uppercase, numbers & symbols
                  </p>
                )}
                {strength.label === "Medium" && (
                  <p className="text-xs text-[#3B82F6] font-['Inter']">
                    Good — add more variety for a stronger password
                  </p>
                )}
                {strength.label === "Strong" && (
                  <p className="text-xs text-[#16A34A] font-['Inter']">
                    Strong password!
                  </p>
                )}
              </div>
            )}
          </div>

         {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#404940] font-['Inter']">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3.5 pr-10 bg-white rounded-lg border text-[#191C1E] focus:outline-none focus:ring-2 font-['Inter'] ${
                  passwordsDontMatch
                    ? "border-red-400 focus:ring-red-400"
                    : passwordsMatch
                    ? "border-green-400 focus:ring-green-400"
                    : "border-[#BFC9BD] focus:ring-[#004C22]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404940]"
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {passwordsDontMatch && (
              <p className="text-xs text-red-500 font-['Inter']">
                Passwords do not match
              </p>
            )}
            {passwordsMatch && (
              <p className="text-xs text-green-600 font-['Inter']">
                Passwords match
              </p>
            )}
          </div>

          {/* Global error from backend */}
          {error && (
            <p className="text-sm text-red-500 font-['Inter']">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#004C22] rounded-lg shadow-sm flex items-center justify-center gap-2 text-white text-base font-['Inter'] transition hover:bg-[#006E2F] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
            {!loading && <FaArrowRight size={16} />}
          </button>

        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-full h-px bg-[#BFC9BD]" />
          <span className="relative bg-[#F7F9FB] px-4 text-xs font-medium uppercase text-[#404940] font-['Inter']">
            Or continue with
          </span>
        </div>

        {/* Social buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#BFC9BD] rounded-lg text-[#191C1E] font-['Inter'] hover:bg-white transition"
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            Google
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-[#404940] font-['Inter']">
          Already have an account?{" "}
          <Link to="/LoginPage" className="text-[#006E2F] font-medium">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}