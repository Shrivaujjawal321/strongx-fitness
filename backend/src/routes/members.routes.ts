import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireStaff, requireAdmin } from '../middleware/rbac.js';
import { validateBody, validateQuery } from '../middleware/validate.js';
import {
  createMemberSchema,
  updateMemberSchema,
  memberQuerySchema,
} from '../validators/member.validator.js';
import * as membersController from '../controllers/members.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all members (Staff+)
router.get(
  '/',
  requireStaff,
  validateQuery(memberQuerySchema),
  asyncHandler(membersController.getMembers)
);

// Get single member (Staff+)
router.get(
  '/:id',
  requireStaff,
  asyncHandler(membersController.getMemberById)
);

// Get member's membership history (Staff+)
router.get(
  '/:id/membership-history',
  requireStaff,
  asyncHandler(membersController.getMembershipHistory)
);

// Create member (Staff+)
router.post(
  '/',
  requireStaff,
  validateBody(createMemberSchema),
  asyncHandler(membersController.createMember)
);

// Add membership to member (Staff+)
router.post(
  '/:id/memberships',
  requireStaff,
  asyncHandler(membersController.addMembership)
);

// Update member (Staff+)
router.put(
  '/:id',
  requireStaff,
  validateBody(updateMemberSchema),
  asyncHandler(membersController.updateMember)
);

// Delete member (Admin+)
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(membersController.deleteMember)
);

export default router;
