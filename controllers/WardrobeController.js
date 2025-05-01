import Wardrobe from "../models/Wardrobe.js";
import { cloudinary } from "../utils/fileupload.js";

// ✅ Add a wardrobe item (Upload image to Cloudinary)


export const addWardrobeItem = async (req, res) => {
    try {
        console.log("➡️ Request received:", req.body);

        // Extract data from request
        const { uid, type, color } = req.body;
        const imageUrl = req.file ? req.file.path : null; // Get Cloudinary URL

        if (!uid || !type || !color || !imageUrl) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if wardrobe exists for user
        let wardrobe = await Wardrobe.findOne({ uid });

        if (!wardrobe) {
            console.log("🚀 Creating a new wardrobe...");
            wardrobe = new Wardrobe({ uid, items: [] });
        }

        // Add new item to wardrobe
        wardrobe.items.push({ type, color, imageUrl });

        // Save to database
        await wardrobe.save();
        console.log("✅ Item added successfully!");
        res.status(201).json({ message: "Item added successfully", wardrobe });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};






// ✅ Get all wardrobe items for a user
export const getUserWardrobe = async (req, res) => {
    try {
        const { uid } = req.params;
        console.log("📤 Fetching wardrobe for UID:", uid);

        const wardrobe = await Wardrobe.findOne({ uid });

        if (!wardrobe) {
            console.log("❌ No wardrobe found for UID:", uid);
            return res.status(404).json({ message: "No wardrobe found" });
        }

        console.log("✅ Wardrobe found:", wardrobe);
        res.status(200).json({ wardrobe });
    } catch (error) {
        console.error("❌ Error fetching wardrobe:", error);
        res.status(500).json({ error: error.message });
    }
};


// ✅ Update a wardrobe item (including optional image update)
export const updateWardrobeItem = async (req, res) => {
    try {
        const { uid, itemId } = req.params;
        const { type, color } = req.body;

        const wardrobe = await Wardrobe.findOne({ uid });
        if (!wardrobe) return res.status(404).json({ message: "No wardrobe found" });

        // Find the specific item in the wardrobe
        const item = wardrobe.items.id(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // If a new image is uploaded, delete the old one from Cloudinary
        if (req.file) {
            if (item.imageUrl) {
                const publicId = item.imageUrl.split("/").pop().split(".")[0]; // Extract publicId
                await cloudinary.uploader.destroy(`wardrobe_images/${publicId}`);
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "wardrobe_images",
            });
            item.imageUrl = uploadResult.secure_url;
        }

        // Update other properties
        if (type) item.type = type;
        if (color) item.color = color;

        await wardrobe.save();

        res.status(200).json({ message: "Item updated successfully", wardrobe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete a wardrobe item
export const deleteWardrobeItem = async (req, res) => {
    try {
        const { uid, itemId } = req.params;

        const wardrobe = await Wardrobe.findOne({ uid });
        if (!wardrobe) return res.status(404).json({ message: "No wardrobe found" });

        // Find item to delete
        const item = wardrobe.items.id(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Delete image from Cloudinary
        if (item.imageUrl) {
            const publicId = item.imageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`wardrobe_images/${publicId}`);
        }

        // Remove item from wardrobe
        wardrobe.items = wardrobe.items.filter(i => i._id.toString() !== itemId);
        await wardrobe.save();

        res.status(200).json({ message: "Item deleted successfully", wardrobe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
