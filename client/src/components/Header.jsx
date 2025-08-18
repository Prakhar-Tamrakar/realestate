// import React, { useEffect, useState } from "react";

// import { FaSearch } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set("searchTerm", searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if(searchTermFromUrl)
//     {
//       setSearchTerm(searchTermFromUrl);
//     }

//   }, [location.search]);
//   return (
//     <div>
//       <header className="bg-slate-200 shadow-sm">
//         <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
//           <Link to="/">
//             <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
//               <span className="text-slate-500">Real</span>
//               <span className="text-slate-700">Estate</span>
//             </h1>
//           </Link>

//           <form
//             onSubmit={handleSubmit}
//             className="bg-slate-100 p-3 rounded-lg flex items-center"
//           >
//             <input
//               type="text"
//               placeholder="search..."
//               className="focus:outline-none w-24 sm:w-64"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button>
//               <FaSearch className="text-slate-600" />
//             </button>
//           </form>
//           <ul className="flex gap-4 text-sm sm:text-lg">
//             <Link to="/">
//               <li className="hidden sm:inline hover:underline text-slate-700">
//                 Home
//               </li>
//             </Link>
//             <Link to="/about">
//               <li className="hidden sm:inline hover:underline text-slate-700">
//                 About
//               </li>
//             </Link>
//             <Link to="/profile">
//               {currentUser ? (
//                 <img
//                   className="h-7 w-7 rounded-full object-cover"
//                   src={currentUser.avatar}
//                   alt="profile"
//                 />
//               ) : (
//                 <li className="hover:underline text-slate-700">Sign-In</li>
//               )}
//             </Link>
//           </ul>
//         </div>
//       </header>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set("searchTerm", searchTerm);
//     navigate(`/search?${urlParams.toString()}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-white/20">
//       <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-1 group">
//           <span className="font-extrabold text-lg sm:text-2xl text-slate-800 group-hover:text-slate-600 transition">
//             Real
//           </span>
//           <span className="font-extrabold text-lg sm:text-2xl text-blue-600 group-hover:text-blue-500 transition">
//             Estate
//           </span>
//         </Link>

//         {/* Search Bar */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex items-center bg-white/80 border border-slate-200 rounded-full shadow-sm hover:shadow-md transition px-3 py-1"
//         >
//           <input
//             type="text"
//             placeholder="Search homes..."
//             className="bg-transparent outline-none w-28 sm:w-64 text-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">
//             <FaSearch className="text-blue-500 hover:text-blue-600 transition" />
//           </button>
//         </form>

//         {/* Navigation */}
//         <ul className="flex items-center gap-6 text-sm sm:text-base">
//           <Link to="/" className="hidden sm:block hover:text-blue-600 transition">
//             Home
//           </Link>
//           <Link to="/about" className="hidden sm:block hover:text-blue-600 transition">
//             About
//           </Link>
//           <Link to="/profile" className="flex items-center gap-2">
//             {currentUser ? (
//               <img
//                 className="h-9 w-9 rounded-full object-cover border-2 border-blue-500 hover:scale-105 transition"
//                 src={currentUser.avatar}
//                 alt="profile"
//               />
//             ) : (
//               <span className="hover:text-blue-600 transition">Sign In</span>
//             )}
//           </Link>
//         </ul>
//       </div>
//     </header>
//   );
// }


import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold">🏠</span>
            </div>
            <div className="font-bold text-xl">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Real
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Estate
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-lg group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm group-focus-within:blur-md transition-all duration-300"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm group-focus-within:shadow-lg transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search your dream home..."
                  className="w-full px-6 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="p-3 m-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100/80 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100/80 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100/80 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              {currentUser ? (
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-lg hover:border-blue-500 transition-all duration-300"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <span>Sign In</span>
              )}
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100/80 transition-all duration-300"
            >
              <FaSearch className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100/80 transition-all duration-300"
            >
              {mobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm group-focus-within:blur-md transition-all duration-300"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm group-focus-within:shadow-lg transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search homes..."
                  className="w-full px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="p-2 m-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100/80 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100/80 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100/80 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              {currentUser ? "Profile" : "Sign In"}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
