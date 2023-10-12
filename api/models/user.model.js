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
    avatar: {
      type: String,
      default:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftentes-skiasis.gr%2Fwp-content%2Fuploads%2F2019%2F11%2FDeafult-Profile-Pitcher.png&f=1&nofb=1&ipt=e7266d00fc7782d9d433e2f425f72c5a7a3cdd96fc8860edcc26138901368c1b&ipo=images",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
