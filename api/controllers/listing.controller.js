import ListingModel from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createNewListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteUserListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "you can only delete your listings"));
    }

    const response = await ListingModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Listing deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
