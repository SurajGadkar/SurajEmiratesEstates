import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createNewListing,
  deleteUserListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyToken, createNewListing);
router.delete("/:id", verifyToken, deleteUserListing);

export default router;
