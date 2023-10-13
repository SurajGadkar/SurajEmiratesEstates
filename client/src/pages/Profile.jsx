import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserError,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice.js";

import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";

function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, error, isLoading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormdata] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSucces] = useState(false);

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const { _id: userId } = currentUser;
      const response = await axios.patch(
        `/api/v1/user/update/${userId}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data);
      setUpdateSucces(true);
      dispatch(updateUserSuccess(response.data));
    } catch (err) {
      setUpdateSucces(false);
      dispatch(updateUserFailure(err.response.data.message));
      console.log(err);
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleUserDelete = async (e) => {
    try {
      dispatch(deleteUserStart());
      const { _id: userId } = currentUser;
      const response = await axios.delete(`/api/v1/user/delete/${userId}`);

      if (!response) {
        dispatch(deleteUserError("No user found!"));
      }
      console.log("user Deleted!", response.data);
      dispatch(deleteUserSuccess(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.floor(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          type="file"
          ref={fileRef}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          onChange={handleChange}
          className="h-24 w-24 rounded-full object-contain cursor-pointer self-center "
          src={currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${filePerc}% ...`}
            </span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChange}
          className="border p-3 rounded-lg"
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          required
        />
        <input
          onChange={handleChange}
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          required
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          required
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 rounded-lg h-11 uppercase text-white hover:opacity-95 disabled:opacity-60"
          type="submit"
        >
          {isLoading ? "Loading..." : "Upload"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 text-sm text-center">Success!</p>
      )}
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleUserDelete}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
