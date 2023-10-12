import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorHandler } from "../../../api/utils/error";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSucess,
  signInFailure,
} from "../redux/user/userSlice";

function Signin() {
  const [formData, setFormData] = useState({});
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await axios.post(
        "/api/v1/auth/signin",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(signInSucess(response.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(err.response.data.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="email"
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          required
          onChange={handleChange}
        />
        <input
          id="password"
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 "
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2 mt-5">
        <p>Not registered yet?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Click here</span>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
