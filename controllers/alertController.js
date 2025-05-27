import Alert from '../models/Alert.js';
import User from '../models/User.js';
import { io } from '../index.js'; // import WebSocket server
import { sendAlertEmail } from '../utils/email.js';

export const createAlert = async (req, res) => {
  try {
    const { userId, type, location } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newAlert = new Alert({ userId, type, location });
    await newAlert.save();

    // Send email to user
    const subject = type === 'FIRE' ? '🔥 Fire Alert!' : '🛢️ Gas Leak Alert!';
    const text = `
🔥 EMERGENCY ALERT: ${type === 'FIRE' ? 'FIRE DETECTED' : 'GAS LEAK DETECTED'} 🔥

Dear ${user.name},

This is an urgent notification from the Fire Eyes system.

A potential ${type === 'FIRE' ? 'fire' : 'gas leak'} has been detected.

🚨 Alert Details:
• Type: ${type}
• Location: ${location && location.lat && location.lng ? `Lat: ${location.lat}, Lng: ${location.lng}` : 'Unknown'}

👤 Your Info:
• Name: ${user.name}
• Device ID: ${user.deviceId}
• Email: ${user.email}
• Phone: ${user.phone || 'N/A'}
• Address: ${user.address || 'N/A'}

⚠️ Please take immediate action to ensure your safety.

📞 Contact emergency services now:
• Fire & Police: Call 999
• Fire Service: Call 102

Stay safe,
— Fire Eyes Team
    `.trim();

    if (user.email) {
      await sendAlertEmail(user.email, subject, text);
    }

    // Log to terminal
    console.log(`[ALERT] New ${type} alert for user ${user.email} (${user.deviceId})`);

    // Populate userId before emitting
    const populatedAlert = await Alert.findById(newAlert._id).populate('userId');

    // 🚨 Emit alert to all connected clients with user info
    io.emit('new_alert', {
      alert: populatedAlert,
    });

    res.status(201).json({ message: 'Alert created', alert: populatedAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all active alerts
export const getActiveAlerts = async (req, res) => {
  try {
    // Show both ACTIVE and ACKNOWLEDGED
    const alerts = await Alert.find({ status: { $in: ['ACTIVE', 'ACKNOWLEDGED'] } }).populate('userId');
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

    await Alert.findByIdAndUpdate(alertId, { status });

    // Populate userId before emitting
    const updatedAlert = await Alert.findById(alertId).populate('userId');
    if (!updatedAlert) return res.status(404).json({ error: 'Alert not found' });

    io.emit('alert_updated', updatedAlert);

    // Log to terminal
    console.log(`[ALERT] Status updated: ${updatedAlert.type} (${updatedAlert._id}) -> ${status}`);

    res.json({ message: 'Alert status updated', alert: updatedAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
