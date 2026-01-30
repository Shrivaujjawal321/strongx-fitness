import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireStaff, requireAdmin } from '../middleware/rbac.js';
import { validateBody, validateQuery } from '../middleware/validate.js';
import { createPaymentSchema, paymentQuerySchema } from '../validators/payment.validator.js';
import * as paymentsController from '../controllers/payments.controller.js';
import { generateInvoicePdf } from '../services/pdf.service.js';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all payments (Staff+)
router.get(
  '/',
  requireStaff,
  validateQuery(paymentQuerySchema),
  asyncHandler(paymentsController.getPayments)
);

// Get single payment (Staff+)
router.get(
  '/:id',
  requireStaff,
  asyncHandler(paymentsController.getPaymentById)
);

// Create payment (Staff+)
router.post(
  '/',
  requireStaff,
  validateBody(createPaymentSchema),
  asyncHandler(paymentsController.createPayment)
);

// Refund payment (Admin+)
router.post(
  '/:id/refund',
  requireAdmin,
  asyncHandler(paymentsController.refundPayment)
);

// Generate invoice PDF
router.get(
  '/invoices/:id/pdf',
  requireStaff,
  asyncHandler(async (req, res) => {
    await generateInvoicePdf(req.params.id, res);
  })
);

export default router;
