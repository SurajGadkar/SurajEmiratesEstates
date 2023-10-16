import React from "react";
import { Link } from "react-router-dom";

function ListingItem({ listing }) {
  return (
    <div className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-[360px] sm:min-w-[400px]">
      <Link to={`/listings/${listing._id}`}>
        <img
          className="h-[220px] w-[360px] sm:min-w-[400px] object-cover hover:scale-105 transition-scale duration-300 border-white"
          src={listing.imageUrls[0]}
          alt="listing cover"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex gap-1 items-center">
            location icon{" "}
            <p className="text-sm text-gray-700 truncate">{listing.address}</p>
          </div>
        </div>
        <p className="p-3  text-slate-700">
          {listing.description.slice(0, 120) + "..."}
        </p>

        <p className="p-3 font-semibold text-slate-500">
          ${" "}
          {listing.offer
            ? listing.discountPrice || listing.regularPrice
            : listing.regularPrice}{" "}
          / month
        </p>
        <div className="text-slate-700 flex p-3 gap-4 ">
          <div className=" font-bold text-xs">
            {listing.bedrooms > 1
              ? `${listing.bedrooms} bedrooms`
              : `${listing.bedrooms} bedroom`}
          </div>
          <div className="font-bold text-xs">
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms`
              : `${listing.bathrooms} bathroom`}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
