import BodyShapeAnalysis from "../models/body.js";

const determineBodyShape = ({ shoulder, bust, waist, hips }) => {
    const diff = (a, b) => Math.abs(a - b);
  
    if (
      diff(shoulder, hips) < 2 &&
      diff(bust, hips) < 2 &&
      diff(shoulder, bust) < 2 &&
      diff(bust, waist) > 9
    ) {
      return "Hourglass";
    }
  
    if (bust > hips && bust - hips >= 5) {
      return "Inverted Triangle";
    }
  
    if (hips > bust && hips - bust >= 5) {
      return "Pear";
    }
  
    if (waist >= bust && waist >= hips) {
      return "Apple";
    }
  
    return "Rectangle";
  };


// ✅ Add or update body shape analysis
export const setOrUpdateBodyShape = async (req, res) => {
  try {
    const { uid, shoulder, bust, waist, hips } = req.body;

    if (!uid || !shoulder || !bust || !waist || !hips) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bodyShape = determineBodyShape({ shoulder, bust, waist, hips });

    const analysis = await BodyShapeAnalysis.findOneAndUpdate(
      { uid },
      { shoulder, bust, waist, hips, bodyShape },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Body shape analysis saved successfully",
      data: analysis,
    });
  } catch (error) {
    console.error("❌ Error saving body shape analysis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get body shape analysis by UID
export const getBodyShape = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) return res.status(400).json({ message: "UID is required" });

    const analysis = await BodyShapeAnalysis.findOne({ uid });

    if (!analysis) {
      return res.status(404).json({ message: "No body shape analysis found for this UID" });
    }

    res.status(200).json({ data: analysis });
  } catch (error) {
    console.error("❌ Error fetching body shape analysis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
