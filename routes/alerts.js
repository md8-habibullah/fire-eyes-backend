import express from "express";
import {
  createAlert,
  getActiveAlerts,
  updateAlertStatus,
} from "../controllers/alertController.js";
import Alert from "../models/Alert.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", createAlert); // POST /api/alerts
router.get("/active", getActiveAlerts); // GET /api/alerts/active
router.patch("/:alertId", updateAlertStatus); // PATCH /api/alerts/:alertId

// Get all alerts for a user by deviceId
router.get("/user/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId.toLowerCase(); // Always lowercase
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: "User not found" });
    const alerts = await Alert.find({ userId: user._id }).sort({
      timestamp: -1,
    });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/alerts/gas/:deviceId - Trigger or update GAS alert by deviceId
router.post("/gas/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId.toLowerCase();
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check for existing active or acknowledged gas leak alert for this user
    const existingAlert = await Alert.findOne({
      userId: user._id,
      type: "GAS_LEAK",
      status: { $in: ["ACTIVE", "ACKNOWLEDGED"] },
    });

    let alert;
    if (existingAlert) {
      // Update existing alert's timestamp
      existingAlert.timestamp = new Date();
      await existingAlert.save();
      alert = await Alert.findById(existingAlert._id).populate("userId");
      req.app.get("io")?.emit?.("alert_updated", alert);
      res.status(200).json({ message: "Gas alert timestamp updated", alert });
    } else {
      // Create new GAS alert
      const newAlert = new Alert({
        userId: user._id,
        type: "GAS_LEAK",
        location: req.body.location || { lat: 0, lng: 0 },
      });
      await newAlert.save();
      alert = await Alert.findById(newAlert._id).populate("userId");
      req.app.get("io")?.emit?.("new_alert", { alert });
      res.status(201).json({ message: "Gas alert created", alert });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;