import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use(Navigation);
  useEffect(() => {
    const getOfferListings = async () => {
      try {
        const response = await axios.get(
          `/api/v1/listing/get?offer=true&limit=4`
        );
        const data = await response.data;
        setOfferListings(data);
        //console.log("Offer Listing", data);
        getRentListings();

        getSaleListings();
      } catch (err) {
        console.log(err);
      }
    };
    console.log(offerListings);
    const getRentListings = async () => {
      try {
        const response = await axios.get(
          `/api/v1/listing/get?type=rent&limit=4`
        );
        const data = await response.data;
        setRentListings(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getSaleListings = async () => {
      try {
        const response = await axios.get(
          `/api/v1/listing/get?type=sell&limit=4`
        );
        const data = await response.data;
        setSaleListings(data);
      } catch (err) {
        console.log(err);
      }
    };

    getOfferListings();
  }, []);

  //console.log(saleListings);

  return (
    <div className=" ">
      {/* Top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          EmiratesEstates - the best place to find your next place.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline w-1/6"
          to="/search"
        >
          Let's get started
        </Link>
      </div>

      {/* swiper */}
      {offerListings && offerListings.length && (
        <>
          <Swiper navigation>
            {offerListings.map((listing) => {
              return (
                <SwiperSlide key={listing._id}>
                  <div
                    className="h-[500px] "
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length && (
          <div className="">
            <div className="my-5">
              {" "}
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                {" "}
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
            </div>
          </div>
        )}

        {rentListings && rentListings.length && (
          <div className="">
            <div className="my-5">
              {" "}
              <h2 className="text-2xl font-semibold text-slate-600">
                Properties for Rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                {" "}
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
            </div>
          </div>
        )}
        {saleListings && saleListings.length && (
          <div className="">
            <div className="my-5">
              {" "}
              <h2 className="text-2xl font-semibold text-slate-600">
                Properties for Sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                {" "}
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
