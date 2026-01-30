import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';

// Role hierarchy: SUPER_ADMIN > ADMIN > STAFF
const roleHierarchy: Record<Role, number> = {
  SUPER_ADMIN: 3,
  ADMIN: 2,
  STAFF: 1,
};

/**
 * Middleware to check if user has required role or higher
 */
export const requireRole = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const userRole = req.user.role as Role;

    // Check if user's role is in the allowed roles
    if (allowedRoles.includes(userRole)) {
      next();
      return;
    }

    // Check if user has a higher role than any of the allowed roles
    const userRoleLevel = roleHierarchy[userRole] || 0;
    const hasHigherRole = allowedRoles.some(
      (role) => userRoleLevel > roleHierarchy[role]
    );

    if (hasHigherRole) {
      next();
      return;
    }

    res.status(403).json({
      error: 'Insufficient permissions',
      required: allowedRoles,
      current: userRole
    });
  };
};

/**
 * Middleware to check if user is at least ADMIN
 */
export const requireAdmin = requireRole('ADMIN', 'SUPER_ADMIN');

/**
 * Middleware to check if user is SUPER_ADMIN
 */
export const requireSuperAdmin = requireRole('SUPER_ADMIN');

/**
 * Middleware to check if user is at least STAFF (any authenticated user)
 */
export const requireStaff = requireRole('STAFF', 'ADMIN', 'SUPER_ADMIN');
