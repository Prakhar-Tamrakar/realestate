import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const LoginWithOtp = () => {
  const [email, setEmail] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("OTP sent successfully!");
      setOtpDigits(Array(6).fill(""));
      setSentOtp(true);
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpDigits.join("");

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/sent-otp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(signInFailure(data.message));
        toast.error(data.message || "Invalid OTP");
        return;
      }

      dispatch(signInSuccess(data));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sentOtp ? handleVerifyOtp() : handleEmailSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            One-Time Password Login
          </h2>
          <p className="text-sm text-gray-600">
            Enter your email to receive a 6-digit OTP.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 text-sm rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-red-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sentOtp}
          />

          {sentOtp && (
            <div className="flex justify-between gap-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-10 h-10 text-center border rounded-md focus:ring-2 focus:ring-red-300 text-lg font-semibold"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {loading
              ? "Processing..."
              : sentOtp
              ? "Verify OTP & Login"
              : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginWithOtp;
