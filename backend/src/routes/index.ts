import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import membersRoutes from './members.routes.js';
import plansRoutes from './plans.routes.js';
import paymentsRoutes from './payments.routes.js';
import staffRoutes from './staff.routes.js';
import trainersRoutes from './trainers.routes.js';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
router.use('/auth', authRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/members', membersRoutes);
router.use('/plans', plansRoutes);
router.use('/payments', paymentsRoutes);
router.use('/staff', staffRoutes);
router.use('/trainers', trainersRoutes);

export default router;
