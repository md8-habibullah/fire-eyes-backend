import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String, // <-- add this
  address: String,
  deviceId: { type: String, unique: true }, // <-- add this
  userType: { type: String, enum: ['user', 'fire', 'police'], default: 'user' },
});

export default mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model, which includes fields for name, phone, email, address, device ID, and user type. The user type can be 'user', 'fire', or 'police', with 'user' as the default value. The schema is then exported as a Mongoose model named 'User'.