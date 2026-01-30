import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireStaff } from '../middleware/rbac.js';
import * as dashboardController from '../controllers/dashboard.controller.js';

const router = Router();

// All dashboard routes require authentication
router.use(authenticateToken);
router.use(requireStaff);

router.get(
  '/summary',
  asyncHandler(dashboardController.getDashboardSummary)
);

router.get(
  '/revenue',
  asyncHandler(dashboardController.getRevenueSummary)
);

export default router;
