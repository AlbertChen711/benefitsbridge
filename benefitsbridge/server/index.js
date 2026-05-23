import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/application.js';
import statusRoutes from './routes/status.js';
import aiRoutes from './routes/ai.js';
import documentsRoutes from './routes/documents.js';
import notificationsRoutes from './routes/notifications.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationsRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║           BenefitsBridge Server Running                   ║
║           http://localhost:${PORT}                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
