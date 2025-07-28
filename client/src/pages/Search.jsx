import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    location:"",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    if (
      e.target.id == "all" ||
      e.target.id == "rent" ||
      e.target.id == "sell"
    ) {
      setSideBarData((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    }

    if (e.target.id == "searchTerm" || e.target.id == "location") {
      setSideBarData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }

    if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setSideBarData((prev) => ({
        ...prev,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      }));
    }

    if (e.target.id == "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];

      setSideBarData({ ...sideBarData, order, sort });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("location", sideBarData.location);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const locationFromUrl = urlParams.get("location");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      locationFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        location: locationFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleShowMore = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    setShowMore(false);
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data) {
      setListings([...listings, ...data]);
      {
        data.length > 9 ? setShowMore(true) : setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleOnSubmit}>
          <div className=" flex  gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              {" "}
              Search Term
            </label>
            {/* //! searchTerm input field */}
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sideBarData.searchTerm}
              onChange={handleOnChange}
              className="border border-gray-400 p-3 rounded-lg w-full bg-white "
            />
          </div>

          <div className=" flex  gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              {" "}
              location
            </label>
            {/* //! location input field */}
            <input
              type="text"
              id="location"
              placeholder="Search by location... "
              value={sideBarData.location}
              onChange={handleOnChange}
              className="border border-gray-400 p-3 rounded-lg w-full bg-white "
            />
          </div>

          <div className="flex items-center flex-wrap gap-2 ">
            <label className="font-semibold">Type:</label>
            <div className="flex items-center gap-2">
              {/* //! rent and sell input field */}
              <input
                type="checkbox"
                name=""
                id="all"
                className="w-5"
                onChange={handleOnChange}
                checked={sideBarData.type === "all"}
              />
              <span>Rent & sell </span>
            </div>
            <div className="flex items-center gap-2">
              {/* //! rent input field */}
              <input
                type="checkbox"
                name=""
                id="rent"
                className="w-5"
                checked={sideBarData.type === "rent"}
                onChange={handleOnChange}
              />
              <span>Rent </span>
            </div>
            <div className="flex items-center gap-2">
              {/* //! sell input field */}
              <input
                type="checkbox"
                name=""
                id="sell"
                className="w-5"
                checked={sideBarData.type === "sell"}
                onChange={handleOnChange}
              />
              <span>sell</span>
            </div>
            <div className="flex items-center gap-2">
              {/* //! offer input field */}
              <input
                type="checkbox"
                name=""
                id="offer"
                className="w-5"
                onChange={handleOnChange}
                checked={sideBarData.offer}
              />
              <span>offer </span>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2  ">
            <label className="font-semibold">Amenities:</label>
            <div className="flex items-center gap-2">
              {/* //! parking input field */}
              <input
                type="checkbox"
                name=""
                id="parking"
                className="w-5"
                onChange={handleOnChange}
                checked={sideBarData.parking}
              />
              <span>Parking </span>
            </div>
            <div className="flex items-center gap-2">
              {/* //! furnished input field */}
              <input
                type="checkbox"
                name=""
                id="furnished"
                className="w-5"
                onChange={handleOnChange}
                checked={sideBarData.furnished}
              />
              <span>Furnished </span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort: </label>
            {/* //! order and sort input field */}
            <select
              name=""
              id="sort_order"
              defaultValue={"createdAt_desc"}
              onChange={handleOnChange}
              className=" border border-gray-400 p-1 rounded-lg"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          {/* //! form submit button, search button */}
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          >
            Search
          </button>
        </form>
      </div>
      {/* //! right side of the page  */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b border-gray-300 p-3 text-slate-700 mt-5 ">
          Listing results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {listings.length < 1 && !loading && (
            <p className="text-2xl text-slate-500 p-3">No Listing Found</p>
          )}
          {loading && <p className="text-center text-xl mt-3"> Loading... </p>}
          {!loading &&
            listings &&
            listings.map((item) => (
              <ListingItem key={item._id} listing={item} />
            ))}
        </div>
        {/* //! show more button */}
        <div className=" flex justify-center items-center py-4">
          {showMore && (
            <button
              onClick={handleShowMore}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Show More
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
