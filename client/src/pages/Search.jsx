import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className=" flex  gap-2 items-center">
            <label className="whitespace-nowrap font-semibold"> Search Term</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-gray-400 p-3 rounded-lg w-full bg-white "
            />
          </div>
          <div className="flex items-center flex-wrap gap-2 ">
            <label className="font-semibold">Type:</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="all" className="w-5" />
              <span>Rent & sale </span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" />
              <span>Rent </span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="sale" className="w-5" />
              <span>
               sale
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" />
              <span>offer </span>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2  ">
            <label className="font-semibold">Amenities:</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" />
              <span>Parking </span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" />
              <span>Furnished </span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort: </label>
            <select name="" id="sort_order" className=" border border-gray-400 p-1 rounded-lg">
                <option value="" >Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 ">
            Search 
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b border-gray-300 p-3 text-slate-700 mt-5 ">listing results</h1>
      </div>
    </div>
  );
};

export default Search;
