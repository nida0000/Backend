import express from "express";
import { createUser,updateUser,getUserByUID } from "../controllers/UserController.js";

const router = express.Router();

router.post("/", createUser);              // Create user
router.put("/:uid", updateUser);           // Update user by UID
router.get("/:uid", getUserByUID);         // Get user by UID

export default router;
