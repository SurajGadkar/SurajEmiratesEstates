import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "UserName is Required!"],
      unique: true,
      minLength: [6, "Username must be atleast 6 characters in length..."],
      maxLength: [32, "Username cannot exceed 32 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unqiue: [true, "Email already exists..."],
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
