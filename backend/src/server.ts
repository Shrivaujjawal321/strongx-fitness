import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const server = app.listen(env.PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║                                                   ║
  ║   STRONGX Admin Backend Server                    ║
  ║                                                   ║
  ║   Environment: ${env.NODE_ENV.padEnd(32)}║
  ║   Port: ${String(env.PORT).padEnd(40)}║
  ║   URL: http://localhost:${String(env.PORT).padEnd(27)}║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const shutdown = () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
