import Listing from "../models/listing.model.js";
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

export const editUserListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "you can only edit your listings"));
    }

    const updateData = req.body;

    const response = await ListingModel.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id });
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
