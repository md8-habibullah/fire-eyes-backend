import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config.js';
import userRoutes from './routes/users.js';
import alertRoutes from './routes/alerts.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);

const server = http.createServer(app);

// 🔌 Setup WebSocket server
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with your frontend URL for production
  },
});

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Middleware to set io instance
app.use((req, res, next) => {
  req.app.set('io', io);
  next();
});

// 🔥 Export io to use in controllers
export { io };

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
