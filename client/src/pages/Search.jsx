import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
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

    if (e.target.id == "searchTerm") {
      setSideBarData((prev) => ({
        ...prev,
        searchTerm: e.target.value,
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
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
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
      console.log(data);
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleOnSubmit}>
          <div className=" flex  gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              {" "}
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sideBarData.searchTerm}
              onChange={handleOnChange}
              className="border border-gray-400 p-3 rounded-lg w-full bg-white "
            />
          </div>
          <div className="flex items-center flex-wrap gap-2 ">
            <label className="font-semibold">Type:</label>
            <div className="flex items-center gap-2">
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
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          >
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b border-gray-300 p-3 text-slate-700 mt-5 ">
          Listing results
        </h1>
      </div>
    </div>
  );
};

export default Search;
