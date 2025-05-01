import SkinAnalysis from "../models/skin.js";

// ✅ Add or update skin analysis
export const setOrUpdateSkinAnalysis = async (req, res) => {
  try {
    const { uid, veinColor, undertone } = req.body;

    // Log incoming request data for debugging
    console.log("Received skin analysis data:", req.body);

    // Check if all fields are present
    if (!uid || !veinColor || !undertone) {
      return res.status(400).json({
        message: "All fields are required (uid, veinColor, undertone)",
      });
    }

    // Define valid values for veinColor and undertone
    const validVeinColors = ["blue", "purple", "green", "blue-green"];
    const validUndertones = ["warm", "cool", "neutral"];

    // Validate veinColor and undertone
    if (!validVeinColors.includes(veinColor.toLowerCase())) {
      console.log(veinColor.toLowerCase());
      
      return res.status(400).json({ message: "Invalid veinColor" });
    }

    if (!validUndertones.includes(undertone.toLowerCase())) {
      return res.status(400).json({ message: "Invalid undertone" });
    }

    // Find and update the skin analysis or insert a new one if it doesn't exist
    const analysis = await SkinAnalysis.findOneAndUpdate(
      { uid },
      { veinColor: veinColor.toLowerCase(), undertone: undertone.toLowerCase() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Send response with updated skin analysis data
    res.status(200).json({
      message: "Skin analysis saved successfully",
      data: analysis,
    });
  } catch (error) {
    console.error("❌ Error saving skin analysis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get skin analysis by UID
export const getSkinAnalysis = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) return res.status(400).json({ message: "UID is required" });

    const analysis = await SkinAnalysis.findOne({ uid });

    if (!analysis) {
      return res.status(404).json({ message: "No skin analysis found for this UID" });
    }

    res.status(200).json({ data: analysis });
  } catch (error) {
    console.error("❌ Error fetching skin analysis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
