import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListingItem from "../components/ListingItem";

function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listings, setListings] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const typeFromURL = urlParams.get("type");
    const parkingFromURL = urlParams.get("parking");
    const furnishedFromURL = urlParams.get("furnished");
    const offerFromURL = urlParams.get("offer");
    const sortFromURL = urlParams.get("sort");
    const orderFromURL = urlParams.get("order");

    if (
      searchTermFromURL ||
      typeFromURL ||
      parkingFromURL ||
      furnishedFromURL ||
      offerFromURL ||
      sortFromURL ||
      orderFromURL
    ) {
      setSidebarData({
        searchTerm: searchTermFromURL || "",
        type: typeFromURL || "all",
        parking: parkingFromURL === "true" ? true : false,
        furnished: furnishedFromURL === "true" ? true : false,
        offer: offerFromURL === "true" ? true : false,
        sort: sortFromURL || "created_at",
        order: orderFromURL || "desc",
      });
    }

    const getData = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const response = await axios.get(`/api/v1/listing/get?${searchQuery}`);
        const data = await response.data;

        if (data.length > 8) setShowMore(true);
        else setShowMore(false);

        setLoading(false);
        setListings(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getData();
  }, [location.search]);
  //console.log(listings);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async (e) => {
    e.preventDefault();
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    const response = await axios.get(`/api/v1/listing/get?${searchQuery}`);
    const data = await response.data;
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      <div className="p-7 border-b-2 md:border-r-2 md:border-b-0 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term :{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex gap-2        
           flex-wrap"
          >
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type : </label>
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                <span>Rent & Sale</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebarData.type === "rent"}
                />
                <span>Rent </span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebarData.type === "sell"}
                />
                <span>Sell</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
          </div>

          <div
            className="flex gap-2        
           flex-wrap"
          >
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Amenities : </label>
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebarData.parking}
                />
                <span>Parking</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebarData.furnished}
                />
                <span>Furnished </span>
              </div>
            </div>
          </div>
          <div className="">
            <label className="font-semibold">Sort : </label>
            <select
              onChange={handleChange}
              defaultValue={"createdat_desc"}
              className="border rounded-lg p-3"
              id="sort_order"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white text-sm p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 mx-auto md:mx-5 ">
        <h1 className="text-3xl w-full font-semibold border-b-2 p-3 text-slate-700 mt-5">
          Listing results :{" "}
        </h1>
        {error ? " " : ""}
        <div className="flex flex-wrap gap-4">
          {!loading && listings?.length === 0 && (
            <p className="text-xl mt-5 font-normal">No listing found !!!</p>
          )}
          {loading && (
            <p className="text-xl mt-5 mx-auto font-normal text-center">
              Loading...
            </p>
          )}
          <div className="flex gap-4 sm:gap-6 flex-wrap mt-5 justify-center">
            {!loading &&
              listings &&
              listings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
          </div>
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
