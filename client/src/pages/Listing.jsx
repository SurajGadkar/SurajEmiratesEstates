import { useState } from "react";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Listing() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleImageSubmit = (e) => {
    setUploading(true);
    setImageUploadError(false);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          setImageUploadError("Image Upload Failed : 2 mb max ");
        });
    } else {
      setUploading(false);
      setImageUploadError("Should upload upto 6 images");
    }
  };

  //console.log(formData);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  //console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload atleast 1 image");

      if (formData.regularPrice < formData.discountPrice)
        return setError("Discount price must be lesser than regular price");

      const response = await axios.post(
        "/api/v1/listing/new",
        JSON.stringify({ ...formData, userRef: currentUser._id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      console.log("New listing created.", response.data);
      //navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div className="flex flex-col gap-4 flex-1 mt-5">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            value={formData.name}
          />
          <textarea
            onChange={handleChange}
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            value={formData.description}
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            value={formData.address}
          />

          <div className=" flex gap-6 flex-wrap items-center ">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="sell"
                className="w-5"
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="parking"
                className="w-5"
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="offer"
                className="w-5"
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>

            <div className="flex flex-wrap gap-4 ">
              <div className="flex items-center gap-2 ">
                <input
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg text-center"
                  type="Number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  value={formData.bedrooms}
                />
                <span>Beds</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg text-center"
                  type="Number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  value={formData.bathrooms}
                />
                <span>Bathrooms</span>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg text-center"
                    type="Number"
                    id="discountPrice"
                    required
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col">
                    <span className="text-md font-semibold">
                      Discount price
                    </span>
                    <span className="text-xs ">
                      {" "}
                      ( &#x62f;&#x2e;&#x625; / Month )
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg text-center"
                  type="Number"
                  id="regularPrice"
                  required
                  value={formData.regularPrice}
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
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded-lg w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <div className="">
              <p className="text-sm font-semibold text-red-500 ml-2 mb-4">
                {imageUploadError && imageUploadError}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((image, index) => {
                  return (
                    <div
                      key={image}
                      className="flex p-3 m-2 justify-around border rounded-lg items-center"
                    >
                      <img
                        src={image}
                        alt="listing"
                        className="w-25 h-20 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                      >
                        delete
                      </button>
                    </div>
                  );
                })}
              <button
                onClick={handleSubmit}
                className="p-3 w-full bg-slate-700 text-white rounded-lg text-center uppercase hover:opacity-95 disabled:opacity-60"
                type="submit"
              >
                {loading ? "Loading..." : "create list"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Listing;
