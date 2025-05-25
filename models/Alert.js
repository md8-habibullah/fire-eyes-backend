import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['FIRE', 'GAS_LEAK'], required: true },
  status: { type: String, enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'], default: 'ACTIVE' },
  location: {
    lat: Number,
    lng: Number,
  },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Alert', alertSchema);
// This code defines a Mongoose schema for an Alert model, which includes fields for user ID, alert type, status, location, and timestamp. The schema is then exported as a Mongoose model named 'Alert'.