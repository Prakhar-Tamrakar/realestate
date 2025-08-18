// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import SwiperCore from "swiper";
// import "swiper/css/bundle";
// import ListingItem from "../components/ListingItem";

// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation]);
//   console.log(offerListings);
//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch("/api/listing/get?offer=true&limit=4");
//         const data = await res.json();
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchRentListings = async () => {
//       try {
//         const res = await fetch("/api/listing/get?type=rent&limit=4");
//         const data = await res.json();
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchSaleListings = async () => {
//       try {
//         const res = await fetch("/api/listing/get?type=sell&limit=4");
//         const data = await res.json();
//         console.log("sell", data);
//         setSaleListings(data);
//       } catch (error) {
//         log(error);
//       }
//     };
//     fetchOfferListings();
//   }, []);
//   return (
//     <div>
//       {/* top */}
//       <div className="flex flex-col gap-6 sm:p-28 p-10 px-3 max-w-6xl mx-auto">
//         <h1 className="text-slate-700 font-bold text-2xl  lg:text-6xl">
//           Find your next <span className="text-slate-500">perfect</span>
//           <br />
//           place with ease
//         </h1>
//         <div className="text-gray-400 text-xs sm:text-sm">
//           Prakhar Estate is the best place to find your next perfect place to
//           live.
//           <br />
//           We have a wide range of properties for you to choose from.
//         </div>
//         <Link
//           to={"/search"}
//           className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
//         >
//           Let's get started...
//         </Link>
//       </div>

//       {/* swiper */}
//       <Swiper navigation>
//         {offerListings &&
//           offerListings.length > 0 &&
//           offerListings.map((listing) => (
//             <SwiperSlide>
//               <div
//                 style={{
//                   background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                   backgroundSize: "cover",
//                 }}
//                 className="h-[500px]"
//                 key={listing._id}
//               ></div>
//             </SwiperSlide>
//           ))}
//       </Swiper>

//       {/* listing results for offer, sale and rent */}

//       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
//         {offerListings && offerListings.length > 0 && (
//           <div className="">
//             <div className="my-3">
//               <h2 className="text-2xl font-semibold text-slate-600">
//                 Recent offers
//               </h2>
//               <Link
//                 className="text-sm text-blue-800 hover:underline"
//                 to={"/search?offer=true"}
//               >
//                 Show more offers
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-4">
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className="">
//             <div className="my-3">
//               <h2 className="text-2xl font-semibold text-slate-600">
//                 Recent places for rent
//               </h2>
//               <Link
//                 className="text-sm text-blue-800 hover:underline"
//                 to={"/search?type=rent"}
//               >
//                 Show more places for rent
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-4">
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className="">
//             <div className="my-3">
//               <h2 className="text-2xl font-semibold text-slate-600">
//                 Recent places for sale
//               </h2>
//               <Link
//                 className="text-sm text-blue-800 hover:underline"
//                 to={"/search?type=sale"}
//               >
//                 Show more places for sale
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-4">
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* footer */}
//       <footer className="bg-slate-800 text-white mt-10">
//         <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Column 1 */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Prakhar Estate</h3>
//             <p className="text-sm text-gray-300">
//               Helping you find the perfect place to live. Explore listings for
//               rent and sale with verified details.
//             </p>
//           </div>

//           {/* Column 2 */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
//             <ul className="space-y-2 text-sm text-gray-300">
//               <li>
//                 <Link to="/search" className="hover:underline">
//                   Browse Listings
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="hover:underline">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:underline">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
//             <ul className="flex gap-4 text-gray-300">
//               <li>
//                 <a
//                   // href="#"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hover:text-blue-400"
//                 >
//                   Facebook
//                 </a>
//               </li>
//               <li>
//                 <a
//                   // href="#"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hover:text-sky-400"
//                 >
//                   Twitter
//                 </a>
//               </li>
//               <li>
//                 <a
//                   // href="#"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hover:text-pink-400"
//                 >
//                   Instagram
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-600 text-center py-4 text-sm text-gray-400">
//           © {new Date().getFullYear()} Prakhar Estate. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { ArrowRight, Star, TrendingUp, Shield, Award } from "lucide-react";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation, Pagination, Autoplay]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <Star className="h-4 w-4 mr-2 fill-current" />
                #1 Real Estate Platform
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Find your next
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                perfect home
              </span>
              <br />
              <span className="text-gray-700 text-2xl md:text-4xl lg:text-5xl">
                with ease
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover your dream property from our curated collection of premium homes. 
              We make finding the perfect place effortless and enjoyable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/search"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Start Your Search
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Properties Listed</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Verified Listings</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5K+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Carousel */}
      {offerListings && offerListings.length > 0 && (
        <div className="relative -mt-12 z-10">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-[600px] rounded-3xl overflow-hidden shadow-2xl mx-4 md:mx-8"
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div className="relative h-full">
                  <div
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${listing.imageUrls[0]}) center/cover`,
                    }}
                    className="h-full flex items-end"
                  >
                    <div className="p-8 md:p-12 text-white max-w-2xl">
                      <div className="inline-block px-4 py-2 bg-red-500 rounded-full text-sm font-semibold mb-4">
                        Special Offer
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">{listing.name}</h2>
                      <p className="text-lg mb-6 opacity-90">{listing.description}</p>
                      <Link
                        to={`/listing/${listing._id}`}
                        className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                      >
                        View Property
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Property Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Offers */}
        {offerListings && offerListings.length > 0 && (
          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Special Offers
                </h2>
                <p className="text-lg text-gray-600">
                  Don't miss these limited-time deals on premium properties
                </p>
              </div>
              <Link
                to="/search?offer=true"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 mt-4 md:mt-0"
              >
                View All Offers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* Rent */}
        {rentListings && rentListings.length > 0 && (
          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  For Rent
                </h2>
                <p className="text-lg text-gray-600">
                  Find your perfect rental home in prime locations
                </p>
              </div>
              <Link
                to="/search?type=rent"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 mt-4 md:mt-0"
              >
                View All Rentals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* Sale */}
        {saleListings && saleListings.length > 0 && (
          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  For Sale
                </h2>
                <p className="text-lg text-gray-600">
                  Discover properties perfect for your forever home
                </p>
              </div>
              <Link
                to="/search?type=sale"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 mt-4 md:mt-0"
              >
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Prakhar Estate</span>
              </div>
              <p className="text-gray-300 text-lg mb-6 max-w-md">
                Your trusted partner in finding the perfect home. We connect dreams 
                with reality through our premium real estate services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/search" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link to="/search?offer=true" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Property Types</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/search?type=rent" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Apartments for Rent
                  </Link>
                </li>
                <li>
                  <Link to="/search?type=sale" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Homes for Sale
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Luxury Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Commercial Spaces
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Prakhar Estate. All rights reserved. Built with ❤️ for finding your perfect home.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


