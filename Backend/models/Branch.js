import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  operatingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true }
  },
  isActive: { type: Boolean, default: true }
},{ timestamps: true });

export default mongoose.model('Branch', branchSchema);