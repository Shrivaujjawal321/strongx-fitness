import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(authController.login)
);

router.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(authController.register)
);

router.get(
  '/me',
  authenticateToken,
  asyncHandler(authController.getMe)
);

router.post(
  '/logout',
  authenticateToken,
  asyncHandler(authController.logout)
);

export default router;
