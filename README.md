# Fire Eyes Backend

This is the backend API for the **Fire Eyes** project: a real-time fire and gas leak detection and notification system.

---

## Features

- User registration with device ID
- Alert creation (fire/gas leak)
- Real-time alert broadcasting via Socket.io
- REST API for users and alerts
- CORS enabled for any frontend
- MongoDB Atlas for cloud database

---

## Tech Stack

- Node.js + Express
- MongoDB Atlas (cloud database)
- Socket.io (real-time)
- CORS (open for development)
- Deployed easily to Render, Railway, Heroku, etc.

---

## Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/your-username/fire-eyes-backend.git
cd fire-eyes-backend
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Environment Variables**

Create a `.env` file in the root directory:

```
MONGO_URI=your_mongodb_atlas_connection_string
MONGO_DB=fire-eyes
```

> You can use the provided `.env` as a template.

### 4. **Run the server locally**

```sh
npm run dev
```

The backend will start on `http://localhost:5000`

---

## API Endpoints

### **Users**

- `POST /api/users/register` — Register a new user
- `GET /api/users` — Get all registered users

### **Alerts**

- `POST /api/alerts` — Create a new alert
- `GET /api/alerts/active` — Get all active alerts
- `PATCH /api/alerts/:alertId` — Update alert status
- `GET /api/alerts/user/:deviceId` — Get all alerts for a user by device ID

---

## Real-time

- WebSocket server runs on the same port (`/`)
- Emits `new_alert` and `alert_updated` events

---

## CORS

CORS is enabled for all origins for development.  
**For production, restrict the `origin` in `index.js` to your frontend domain.**

---

## Deployment

You can deploy this backend to any Node.js hosting provider:

### **Render.com (Recommended for beginners)**
1. Create a new Web Service, connect your repo.
2. Set build command: `npm install`
3. Set start command: `npm run dev`
4. Add your environment variables in the dashboard.

### **Railway.app / Heroku / Vercel**
- Similar steps: connect repo, set environment variables, and deploy.

---

## License

MIT

---

**Made for WICE 2025 by Team Fire Eyes**