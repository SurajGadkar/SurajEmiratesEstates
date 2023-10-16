import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createNewListing,
  deleteUserListing,
  editUserListing,
  getListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyToken, createNewListing);
router.delete("/:id", verifyToken, deleteUserListing);
router.patch("/:id", verifyToken, editUserListing);
router.get("/get/:id", getListing);

export default router;
