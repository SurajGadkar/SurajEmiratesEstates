import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

export const test = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    res.status(200).json({ message: "Sucess, here your token", token });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthenticated and Unauthorized"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json({ ...rest });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
