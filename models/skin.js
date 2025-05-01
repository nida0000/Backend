import mongoose from 'mongoose';

const SkinAnalysisSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  veinColor: {
    type: String,
    enum: ['blue-green mix','blue', 'purple', 'green', 'mixed', 'hard to tell'],
    required: true,
  },
  undertone: {
    type: String,
    enum: ['warm', 'cool', 'neutral'],
    required: true,
  }
  
}, { timestamps: true });

const SkinAnalysis = mongoose.model('SkinAnalysis', SkinAnalysisSchema);
export default SkinAnalysis;
