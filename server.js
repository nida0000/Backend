import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Db/db.js";
import wardrobeRoutes from "./routes/WardrobeRoutes.js";
import skinRoutes from './routes/skinRoute.js';
import userRoutes from './routes/UserRoutes.js'
import bodyRoutes from './routes/BodyRoute.js'


dotenv.config();
const app = express();

// 🔹 Connect to Database
connectDB();

// 🔹 Middleware
app.use(cors());
app.use(express.json()); // Parses JSON requests

// 🔹 Routes

app.use("/api/wardrobe",wardrobeRoutes)
app.use('/api/skin',skinRoutes)
app.use('/api/user',userRoutes)
app.use("/api/body-shape", bodyRoutes);

export default app;
