import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaCar } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1 w-full sm:w-[280px]">
      <Link to={`/listing/${listing._id}`}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              listing.imageUrls?.[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="listing cover"
            className="h-44 w-full object-cover group-hover:scale-101 transition-transform duration-200"
          />

          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                listing.type === "rent"
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : "bg-gradient-to-r from-blue-500 to-blue-600"
              }`}
            >
              For {listing.type === "rent" ? "Rent" : "Sale"}
            </span>
          </div>

          {/* Special Offer Badge */}
          {listing.offer && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white">
                Special Offer
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-5 py-2">
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            {listing.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MdLocationOn className="h-4 w-4 mr-1 text-green-600" />
            <p className="text-sm line-clamp-1">{listing.address}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 truncate">
            {listing.description}
          </p>

          {/* Features */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-gray-600 text-sm">
              <div className="flex items-center">
                <FaBed className="h-4 w-4 mr-1" />
                <span>
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Beds`
                    : `${listing.bedrooms} Bed`}
                </span>
              </div>
              <div className="flex items-center">
                <FaBath className="h-4 w-4 mr-1" />
                <span>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths`
                    : `${listing.bathrooms} Bath`}
                </span>
              </div>
              {listing.parking && (
                <div className="flex items-center">
                  <FaCar className="h-4 w-4 mr-1" />
                  <span>Parking</span>
                </div>
              )}
            </div>
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between">
            <div>
              {listing.offer ? (
                <div className="flex flex-col items-center space-x-0">
                  <p className="text-2xl font-bold text-green-600">
                    ${listing.discountedPrice.toLocaleString("en-US")}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ${listing.regularPrice.toLocaleString("en-US")}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  ${listing.regularPrice.toLocaleString("en-US")}
                </p>
              )}
              {listing.type === "rent" && (
                <p className="text-sm text-gray-600">/month</p>
              )}
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
