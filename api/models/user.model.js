import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "UserName is Required!"],
      unique: [true, "Username already exists..."],
      min: [6, "Username must be atleast 6 characters in length..."],
      max: [32, "Username cannot exceed 32 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      min: [8, "Must be atleast 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
