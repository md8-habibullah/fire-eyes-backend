import Alert from '../models/Alert.js';
import User from '../models/User.js';
import { io } from '../index.js'; // import WebSocket server

export const createAlert = async (req, res) => {
  try {
    const { userId, type, location } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newAlert = new Alert({ userId, type, location });
    await newAlert.save();

    // 🚨 Emit alert to all connected clients
    io.emit('new_alert', {
      alert: newAlert,
      user,
    });

    res.status(201).json({ message: 'Alert created', alert: newAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all active alerts
export const getActiveAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'ACTIVE' }).populate('userId');
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update alert status
export const updateAlertStatus = async (req, res) => {
  try {
    const { alertId } = req.params;
    const { status } = req.body;

    const alert = await Alert.findByIdAndUpdate(
      alertId,
      { status },
      { new: true }
    );

    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Optionally emit update to clients
    io.emit('alert_updated', alert);

    res.json({ message: 'Alert status updated', alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
