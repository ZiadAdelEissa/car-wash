import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  userPackageId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserPackage' },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  completedAt: { type: Date },
  adminNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);