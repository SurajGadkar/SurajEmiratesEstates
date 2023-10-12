import express from "express";

const router = express.Router();

import { updateUser, test } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.get("/test", test);
router.patch("/update/:id", verifyToken, updateUser);

export default router;
