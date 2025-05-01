import mongoose from "mongoose";

const wardrobeItemSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Example: "Shirt"
    color: { type: String, required: true }, // Example: "Red"
    imageUrl: { type: String, required: true } // Cloudinary image URL
});

const wardrobeSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    items: [wardrobeItemSchema] // List of wardrobe items
});


export default mongoose.model("Wardrobe", wardrobeSchema);
