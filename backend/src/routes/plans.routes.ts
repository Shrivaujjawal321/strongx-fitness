import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireStaff, requireAdmin } from '../middleware/rbac.js';
import { validateBody } from '../middleware/validate.js';
import { createPlanSchema, updatePlanSchema } from '../validators/plan.validator.js';
import * as plansController from '../controllers/plans.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all plans (Staff+)
router.get(
  '/',
  requireStaff,
  asyncHandler(plansController.getPlans)
);

// Get single plan (Staff+)
router.get(
  '/:id',
  requireStaff,
  asyncHandler(plansController.getPlanById)
);

// Create plan (Admin+)
router.post(
  '/',
  requireAdmin,
  validateBody(createPlanSchema),
  asyncHandler(plansController.createPlan)
);

// Update plan (Admin+)
router.put(
  '/:id',
  requireAdmin,
  validateBody(updatePlanSchema),
  asyncHandler(plansController.updatePlan)
);

// Delete plan (Admin+)
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(plansController.deletePlan)
);

export default router;
