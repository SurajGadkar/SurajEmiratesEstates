import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "../components/Contact.jsx";

function ShowListings() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [listingData, setListingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //console.log(listingData);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const listingId = params.listingId;
        const response = await axios.get(`/api/v1/listing/get/${listingId}`);
        setListingData(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
        setLoading(false);
        1;
      }
    };

    fetchListing();
  }, [params.listingId]);

  //console.log(listingData);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading ...</p>}
      {error && (
        <p className="text-center text-red-700 my-7 text-2xl">
          Something went wrong ...
        </p>
      )}
      {listingData && !loading && !error && (
        <>
          <Swiper navigation>
            {listingData.imageUrls.map((image) => {
              return (
                <SwiperSlide key={image}>
                  <div
                    className="h-[300px] md:h-[400px] lg:h-[500px]"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex m-12 max-w-200 flex-col gap-4 ">
            <div className="flex gap-2">
              <h3 className="font-semibold text-lg">{listingData.name} - </h3>
              <h3 className="font-semibold text-lg">
                $
                {listingData.offer
                  ? listingData.discoutnPrice || listingData.regularPrice
                  : listingData.regularPrice}{" "}
                / month
              </h3>
            </div>
            <div className="flex gap-4">
              {listingData.type === "sell" ? (
                <button
                  disabled
                  className="bg-blue-700 text-white rounded-lg w-24 h-8 text-md font-semibold"
                >
                  New Sale
                </button>
              ) : (
                <button
                  disabled
                  className="bg-green-700 text-md text-white rounded-lg w-24 h-8 font-semibold"
                >
                  For Rent
                </button>
              )}

              {listingData.offer ? (
                <button
                  disabled
                  className="bg-green-700 text-white rounded-lg w-24 h-8 text-md font-semibold"
                >
                  $ 10
                </button>
              ) : (
                ""
              )}
            </div>
            <p className=" p-4 text-sm font-semibold ">
              <span className="text-md  text-black-100">Description -</span>{" "}
              {listingData.description}
            </p>
            <ul className="p-4 flex items-center gap-4 md :gap-6 text-slate-900 font-semibold text-sm flex-wrap">
              <li className="flex items-center gap-2 whitespace-nowrap ">
                bed-icon
                {listingData.bedrooms > 1
                  ? `${listingData.bedrooms} beds`
                  : `${listingData.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                bath-icon
                {listingData.bathrooms > 1
                  ? `${listingData.bathrooms} baths`
                  : `${listingData.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                park-icon
                {listingData.parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                furnished-icon
                {listingData.furnished ? "Furnished" : "Not furnished"}
              </li>
            </ul>
            {}
            {currentUser &&
              listingData?.userRef !== currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact Landlord
                </button>
              )}
            {contact && <Contact listing={listingData} />}
          </div>
        </>
      )}
    </main>
  );
}

export default ShowListings;
