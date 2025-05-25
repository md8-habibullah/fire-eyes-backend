import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    let { name, phone, email, address, deviceId, userType } = req.body;
    deviceId = deviceId?.toLowerCase(); // Always lowercase

    // Check if deviceId already exists (case-insensitive)
    const exists = await User.findOne({ deviceId });
    if (exists) return res.status(400).json({ error: 'Device ID already registered' });

    const newUser = new User({ name, phone, email, address, deviceId, userType });
    await newUser.save();

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
