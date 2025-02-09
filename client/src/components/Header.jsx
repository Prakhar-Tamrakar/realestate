import React from "react";

import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header className="bg-slate-200">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Dalal</span>
            <span className="text-slate-700">Estate</span>
          </h1>
          </Link>
        
          
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="search..."
              className="focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
          <ul className="flex gap-4 text-sm sm:text-lg">
          <Link to = "/"><li className="hidden sm:inline hover:underline text-slate-700">Home</li></Link>
          <Link to = "/about"><li className="hidden sm:inline hover:underline text-slate-700">About</li></Link>
          <Link to = "/signin"><li className="hover:underline text-slate-700">Sign-In</li></Link>
          </ul>
        </div>
      </header>
    </div>
  );
}
