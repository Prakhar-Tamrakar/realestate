// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
//   resetError,
// } from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";

// export default function SignIn() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   // const [error, setError] = useState(null);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const { isLoading, error } = useSelector((state) => state.user);
//   const { isLoading, error } = useSelector((state) => state.user);
  

//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // ✅ Fix: Initialize dispatch

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleOnSubmit = async (e) => {
//   e.preventDefault();
//   dispatch(resetError());
//   try {
//     dispatch(signInStart());
//     const res = await fetch("/api/auth/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
   
//     if (data.success === false) {
//       dispatch(signInFailure(data.message));
//       return;
//     }
//     dispatch(signInSuccess(data));
//     navigate("/");
//   } catch (error) {
//     dispatch(signInFailure(error.message));
//     setError("Something went wrong. Please try again."); // fallback error
//   }
// };


//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
//       <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           id="email"
//           value={formData.email}
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           value={formData.password}
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           disabled={isLoading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {isLoading ? "Loading" : "Sign in"}
//         </button>

//         <OAuth/>
//         <Link to="/login-with-otp">

//          <p
//           disabled={isLoading}
//           className="bg-green-700 text-center w-full text-white p-3 rounded-lg uppercase hover:opacity-95"
//         >
//           login with otp
//         </p>
//         </Link>


//       </form>
//       <div className="flex gap-2 mt-5">
        
//         <p>Don't have an account?</p>
//         <Link to="/signup">
//           <span className="text-blue-500">Sign up</span>
//         </Link>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  resetError,
} from "../redux/user/userSlice";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Home, Smartphone } from "lucide-react";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetError());
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative w-full max-w-md">
        {/* Back to Home Button */}
        {/* <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-8 group"
        >
          <Home className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link> */}

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-2 shadow-lg">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {/* Header */}
        

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  value={formData.email}
                  className="w-full pl-12 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  value={formData.password}
                  className="w-full pl-12 pr-12 py-2 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* OAuth Component */}
            <OAuth />

            {/* OTP Login Button */}
            <Link to="/login-with-otp" className="block">
              <button
                type="button"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <span className="flex items-center justify-center">
                  <Smartphone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Login with OTP
                </span>
              </button>
            </Link>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
