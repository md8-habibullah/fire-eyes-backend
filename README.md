# 🔥 Fire Eyes Backend

A Node.js + Express REST API and real-time WebSocket server for the [Fire Eyes Dashboard](../fire-eyes-dashboard).  
This backend manages users, fire/gas alerts, and provides instant updates to all connected clients.

---

## 📋 Description

The Fire Eyes backend powers a real-time fire and gas safety dashboard.  
It handles user/device registration, alert creation, status updates, and broadcasts all changes instantly via Socket.IO.

---

## 🚀 Features

- User registration and management
- Device-based user lookup
- Fire and gas leak alert creation
- Alert status updates (active, acknowledged, resolved)
- Real-time alert push via WebSockets (Socket.IO)
- MongoDB integration with Mongoose
- CORS support for frontend integration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- dotenv

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/md8-habibullah/fire-eyes-backend.git
   cd fire-eyes-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with:

   ```env
   MONGO_URI=your_mongodb_connection_string
   MONGO_DB=fire-eyes
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

   The backend will run on [http://localhost:5000](http://localhost:5000) by default.

---

## 📂 Project Structure

```
fire-eyes-backend/
├── controllers/      # Business logic for users and alerts
│   ├── alertController.js
│   └── userController.js
├── models/           # Mongoose schemas
│   ├── Alert.js
│   └── User.js
├── routes/           # Express route handlers
│   ├── alerts.js
│   └── users.js
├── config.js         # MongoDB connection
├── index.js          # Main server entry (Express + Socket.IO)
├── .env
├── package.json
└── README.md
```

---

## 🧪 API Endpoints

### Users

- `POST   /api/users/register` — Register a new user/device
- `GET    /api/users` — List all users
- `PUT    /api/users/:id` — Update user info
- `DELETE /api/users/:id` — Delete a user

### Alerts

- `POST   /api/alerts` — Create a new alert (fire/gas)
- `GET    /api/alerts/active` — Get all active/acknowledged alerts
- `PATCH  /api/alerts/:alertId` — Update alert status
- `GET    /api/alerts/user/:deviceId` — Get all alerts for a device

---

## 🔌 Real-Time Events

- **WebSocket (Socket.IO) events:**
  - `new_alert` — Sent to all clients when a new alert is created
  - `alert_updated` — Sent to all clients when an alert status changes

---

## 🛡️ Environment Variables

Example `.env`:

```env
MONGO_URI=your_mongodb_connection_string
MONGO_DB=fire-eyes
```

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
Please open an issue or PR for improvements.

---

## 🖼️ Credits

- **Fire & Gas animated icons:**  
  [Freepik - Flaticon](https://www.flaticon.com/free-animated-icons/fire)

---

**Made with ❤️ for fire and gas safety.**
