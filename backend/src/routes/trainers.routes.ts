import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireStaff, requireAdmin } from '../middleware/rbac.js';
import { validateBody } from '../middleware/validate.js';
import { createTrainerSchema, updateTrainerSchema } from '../validators/trainer.validator.js';
import * as trainersController from '../controllers/trainers.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all trainers (Staff+)
router.get(
  '/',
  requireStaff,
  asyncHandler(trainersController.getTrainers)
);

// Get single trainer (Staff+)
router.get(
  '/:id',
  requireStaff,
  asyncHandler(trainersController.getTrainerById)
);

// Create trainer (Admin+)
router.post(
  '/',
  requireAdmin,
  validateBody(createTrainerSchema),
  asyncHandler(trainersController.createTrainer)
);

// Update trainer (Admin+)
router.put(
  '/:id',
  requireAdmin,
  validateBody(updateTrainerSchema),
  asyncHandler(trainersController.updateTrainer)
);

// Delete trainer (Admin+)
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(trainersController.deleteTrainer)
);

export default router;
