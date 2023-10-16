import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function ShowListings() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listingData, setListingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //console.log(listingData);
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
      }
    };

    fetchListing();
  }, [params.listingId]);
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
                    className="h-[500px]"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </main>
  );
}

export default ShowListings;
