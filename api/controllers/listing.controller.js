import ListingModel from "../models/listing.model.js";

export const createNewListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};
