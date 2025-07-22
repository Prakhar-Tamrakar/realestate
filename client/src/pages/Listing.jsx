import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Listing() {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const res = await fetch(`/api/listing/get/${id}`);
        const data = await res.json();
        console.log(data);
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

  return (
    <main>
      <div>
        {loading && <p className="text-3xl py-3 text-center">Loading...</p>}
        {error && <p className="text-3xl py-3 text-center">{error}</p>}
        {listingData && !loading && !error && (
          <div className="w-full">
            {/* Image Slider */}
            {listingData.imageUrls && listingData.imageUrls.length > 0 && (
              <Swiper
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Navigation, Pagination, Autoplay]}
                className="h-[500px] w-full"
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
            )}
          </div>
        )}
      </div>
    </main>
  );
}
