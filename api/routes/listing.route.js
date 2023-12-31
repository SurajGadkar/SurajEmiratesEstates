import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createNewListing,
  deleteUserListing,
  editUserListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyToken, createNewListing);
router.delete("/:id", verifyToken, deleteUserListing);
router.post("/:id", verifyToken, editUserListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
