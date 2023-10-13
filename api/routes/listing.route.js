import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createNewListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyToken, createNewListing);

export default router;
