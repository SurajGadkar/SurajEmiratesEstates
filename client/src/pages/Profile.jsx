import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormdata] = useState({});

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id: userId } = currentUser;
      const response = await axios.patch(
        `/api/v1/profile/:${userId}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          onChange={handleChange}
          className="h-24 w-24 rounded-full object-contain cursor-pointer self-center "
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          onChange={handleChange}
          className="border p-3 rounded-lg"
          type="text"
          placeholder="username"
          id="username"
        />
        <input
          onChange={handleChange}
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 rounded-lg h-11 uppercase text-white hover:opacity-95 disabled:opacity-60"
          type="submit"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
