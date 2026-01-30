import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';
import { validateBody } from '../middleware/validate.js';
import { createStaffSchema, updateStaffSchema } from '../validators/staff.validator.js';
import * as staffController from '../controllers/staff.controller.js';

const router = Router();

// All routes require authentication and admin privileges
router.use(authenticateToken);
router.use(requireAdmin);

// Get all staff
router.get(
  '/',
  asyncHandler(staffController.getStaff)
);

// Get single staff
router.get(
  '/:id',
  asyncHandler(staffController.getStaffById)
);

// Create staff
router.post(
  '/',
  validateBody(createStaffSchema),
  asyncHandler(staffController.createStaff)
);

// Update staff
router.put(
  '/:id',
  validateBody(updateStaffSchema),
  asyncHandler(staffController.updateStaff)
);

// Delete staff
router.delete(
  '/:id',
  asyncHandler(staffController.deleteStaff)
);

export default router;
