import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  resetError,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const { isLoading, error } = useSelector((state) => state.user);
  const { isLoading, error } = useSelector((state) => state.user);
  

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Fix: Initialize dispatch

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
    setError("Something went wrong. Please try again."); // fallback error
  }
};


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading" : "Sign in"}
        </button>

        <OAuth/>
        <Link to="/login-with-otp">

         <p
          disabled={isLoading}
          className="bg-green-700 text-center w-full text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          login with otp
        </p>
        </Link>


      </form>
      <div className="flex gap-2 mt-5">
        
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
