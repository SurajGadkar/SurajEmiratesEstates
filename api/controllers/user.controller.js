import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

export const test = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.send("No Token");
    }
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

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler(403, "You cannot delete some other users account!!!")
      );
    }
    const { id: userId } = req.params;
    const response = await UserModel.findOneAndDelete({ _id: userId });

    if (!response) {
      return next(errorHandler(404, "User not Found..."));
    } else {
      res.clearCookie("access_token");
      return res
        .status(200)
        .json({ message: "User has been deleted successfully!" });
    }
  } catch (err) {
    next(err);
  }
};
