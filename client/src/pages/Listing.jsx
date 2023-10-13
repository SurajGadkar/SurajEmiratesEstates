import React from "react";

function Listing() {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div className="flex flex-col gap-4 flex-1 mt-5">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className=" flex gap-6 flex-wrap items-center ">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" required />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" required />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" required />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" required />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" required />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 ">
            <div className="flex items-center gap-2 ">
              <input
                className="p-3 border border-gray-300 rounded-lg text-center"
                type="Number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg text-center"
                type="Number"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <span>Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg text-center"
                type="Number"
                id="discount-price"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col">
                <span className="text-md font-semibold">Discount price</span>
                <span className="text-xs ">
                  {" "}
                  ( &#x62f;&#x2e;&#x625; / Month )
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg text-center"
                type="Number"
                id="regular-price"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col">
                <span className="text-sm ">Regular price</span>
                <span className="text-xs ">
                  {" "}
                  ( &#x62f;&#x2e;&#x625; / Month )
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 mt-5 gap-4">
          <p className="font-semibold text-center ">
            Images :{" "}
            <span className="font-normal text-gray-400 text-sm">
              The first image will be the cover (max 6)
            </span>{" "}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded-lg w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80">
                Upload
              </button>
            </div>

            <div className="">
              <button
                className="p-3 w-full bg-slate-700 text-white rounded-lg text-center uppercase hover:opacity-95 disabled:opacity-60"
                type="submit"
              >
                create list
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Listing;
