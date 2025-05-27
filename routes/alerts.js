import express from 'express';
import {
  createAlert,
  getActiveAlerts,
  updateAlertStatus
} from '../controllers/alertController.js';
import Alert from '../models/Alert.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', createAlert); // POST /api/alerts
router.get('/active', getActiveAlerts); // GET /api/alerts/active
router.patch('/:alertId', updateAlertStatus); // PATCH /api/alerts/:alertId

// NEW: Get all alerts for a user by deviceId
router.get('/user/:deviceId', async (req, res) => {
  try {
    const deviceId = req.params.deviceId.toLowerCase(); // Always lowercase
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const alerts = await Alert.find({ userId: user._id }).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/alerts/gas/:deviceId - Trigger GAS alert by deviceId
router.post('/gas/:deviceId', async (req, res) => {
  try {
    const deviceId = req.params.deviceId.toLowerCase();
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Create GAS alert
    const newAlert = new Alert({
      userId: user._id,
      type: 'GAS_LEAK',
      location: req.body.location || { lat: 0, lng: 0 }
    });
    await newAlert.save();

    // Populate userId for socket emit
    const populatedAlert = await Alert.findById(newAlert._id).populate('userId');

    // Emit to all clients
    req.app.get('io')?.emit?.('new_alert', { alert: populatedAlert });

    res.status(201).json({ message: 'Gas alert created', alert: populatedAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
