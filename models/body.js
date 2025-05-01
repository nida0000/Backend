import mongoose from "mongoose";

const BodyShapeSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    shoulder: {
      type: Number,
      required: true,
    },
    bust: {
      type: Number,
      required: true,
    },
    waist: {
      type: Number,
      required: true,
    },
    hips: {
      type: Number,
      required: true,
    },
    bodyShape: {
      type: String,
      enum: ["Rectangle", "Inverted Triangle", "Pear", "Apple", "Hourglass"],
      required: true,
    },
  },
  { timestamps: true }
);

const BodyShapeAnalysis = mongoose.model("BodyShapeAnalysis", BodyShapeSchema);
export default BodyShapeAnalysis;
