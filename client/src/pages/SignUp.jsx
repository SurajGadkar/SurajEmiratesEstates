import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          id="username"
          className="border p-3 rounded-lg"
          type="text"
          placeholder="username"
          required
        />
        <input
          id="email"
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          required
        />
        <input
          id="password"
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          required
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 ">
          SignUp
        </button>
      </form>
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
