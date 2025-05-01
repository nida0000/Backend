import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// 🔥 Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔥 Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "wardrobe_images",
        format: file.mimetype.split("/")[1], // Keeps correct format
        public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    }),
});

// 🔥 Multer Middleware
const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export { cloudinary, upload };
