import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-black text-center text-3xl font-semibold my-3 ">Profile</h1>
      <form className="flex flex-col gap-4 mt-5 max-w-lg mx-auto">
        <img
          className="h-24 w-24  rounded-full object-cover self-center mt-5 cursor-pointer"
          src={currentUser.avatar}
          alt="userImage"
        />
        <input type="text" placeholder="username" id="username" className=" p-3 rounded-lg shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)]" />
        <input type="email" placeholder="email" id="email" className="shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)] p-3 rounded-lg" />
        <input type="text" placeholder="password" id= "password" className="shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)] p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90">update</button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
