import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Contact from "../components/Contact";

export default function Listing() {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [contact , setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);


 

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const res = await fetch(`/api/listing/get/${id}`);
        const data = await res.json();
        // console.log(data);
        if (data.success) {
          setListingData(data.listing);
          setLoading(false);
        } else {
          setError("Failed to fetch listing details 😢");
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch listing details");
        setLoading(false);
        return;
      }
    };

    fetchListingDetails();
  }, [id]);

  // ! function to set contact false
  const handleContact = () =>{
    setContact(true);
  }

  return (
    <main>
      <div>
        {loading && <p className="text-3xl py-3 text-center">Loading...</p>}
        {error && <p className="text-3xl py-3 text-center">{error}</p>}
        {listingData && !loading && !error && (
          <div className="w-full">
            {/* Image Slider */}
            {listingData.imageUrls && listingData.imageUrls.length > 0 && (
              <>
                <Swiper
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  modules={[Navigation, Pagination, Autoplay]}
                  className="h-[430px] w-full"
                >
                  {listingData.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={url}
                        alt={`slide-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                  <FaShare
                    className="text-slate-500"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  />
                </div>
                {copied && (
                  <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                    Link copied!
                  </p>
                )}
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4">
                  <p className="text-2xl font-semibold">
                    {listingData.name} - ${" "}
                    {listingData.offer
                      ? listingData.discountedPrice.toLocaleString("en-US")
                      : listingData.regularPrice.toLocaleString("en-US")}
                    {listingData.type === "rent" && " / month"}
                  </p>
               
              
                  <p className="flex items-center mt-2 gap-2 text-slate-600  text-sm">
                    <FaMapMarkerAlt className="text-green-700" />
                    {listingData.address}
                  </p>
                  <div className="flex gap-4">
                    <p className="bg-red-900 w-full max-w-[200px]  text-white text-center p-1 rounded-md">
                      {listingData.type === "rent" ? "For Rent" : "For Sale"}
                    </p>
                    {listingData.offer && (
                      <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                        $
                        {listingData.regularPrice - listingData.discountedPrice}{" "}
                        OFF
                      </p>
                    )}
                  </div>
                  <p className="text-slate-800 ">
                    <span className="font-semibold text-black">
                      Description -{" "}
                    </span>
                    {listingData.description}
                  </p>
                  <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaBed className="text-lg" />
                      {listingData.bedrooms > 1
                        ? `${listingData.bedrooms} beds`
                        : `${listingData.bedrooms} bed `}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaBath className="text-lg" />
                      {listingData.bathrooms > 1
                        ? `${listingData.bathrooms} baths `
                        : `${listingData.bathrooms} bath `}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaParking className="text-lg" />
                      {listingData.parking ? "Parking spot" : "No Parking"}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaChair className="text-lg" />
                      {listingData.furnished ? "Furnished" : "Unfurnished"}
                    </li>
                  </ul>
                    {contact && (
                    <Contact listing={listingData} />
                  )}
                  {currentUser && currentUser._id !== listingData.userRef && !contact  && (
                    <button onClick={handleContact} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                      Contact Landlord
                    </button>

                  )}
                
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
