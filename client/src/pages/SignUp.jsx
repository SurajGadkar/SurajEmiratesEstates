import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { errorHandler } from "../../../api/utils/error";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/v1/auth/signup",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log(response.data);
      setError(null);
      navigate("/sign-in");
    } catch (err) {
      setIsLoading(false);
      setError(err);
      errorHandler(err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="username"
          className="border p-3 rounded-lg"
          type="text"
          placeholder="username"
          required
          onChange={handleChange}
        />
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
          {isLoading ? "Loading ..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-600">{error.message}</p>}
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
