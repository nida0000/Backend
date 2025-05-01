import express from "express";
import { upload } from "../utils/fileupload.js"; // Import Multer config
import { addWardrobeItem, getUserWardrobe, updateWardrobeItem, deleteWardrobeItem } from "../controllers/WardrobeController.js";

const router = express.Router();
console.log("Entered Router");

// ✅ Routes
router.post("/add", upload.single("image"), addWardrobeItem);
router.get("/:uid", getUserWardrobe); // Fetch wardrobe for a specific user
router.put("/:uid/:itemId", upload.single("image"), updateWardrobeItem);
router.delete("/:uid/:itemId", deleteWardrobeItem);

export default router;
