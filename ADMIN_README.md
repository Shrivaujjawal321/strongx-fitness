# StrongX Admin Panel - Complete Setup Guide

This document provides instructions for setting up and running the StrongX Gym Management Admin Panel.

## Overview

The admin panel consists of:
- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **Frontend**: React (integrated into the existing StrongX website)

## Directory Structure

```
strongx-fitness/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, RBAC, validation
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (PDF, etc.)
│   │   ├── validators/        # Zod validation schemas
│   │   ├── utils/             # Helper functions
│   │   └── server.ts          # Entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Seed data
│   └── package.json
├── components/
│   └── admin/                 # Admin UI components
├── pages/
│   └── admin/                 # Admin page components
├── contexts/                  # React contexts (Auth)
├── services/                  # API client
├── types/                     # TypeScript types
└── App.tsx                    # Updated with admin routes
```

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/strongx_db"

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed

# Start backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# In the root directory (strongx-fitness)
# Add environment variable
echo "VITE_API_URL=http://localhost:5000/api" >> .env.local

# Install any new dependencies if needed
npm install

# Start frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Access Admin Panel

- Open `http://localhost:3000/#/admin/login`
- Login with default credentials:
  - **Email**: `admin@strongx.com`
  - **Password**: `admin123`

## Features

### Dashboard
- Member statistics (total, active, expired, new this month)
- Revenue overview (today, this month, this year)
- Expiring memberships alert
- Recent payments list

### Members Management
- View all members with pagination and search
- Add/Edit members
- View member details and history
- Assign membership plans
- Deactivate members

### Membership Plans
- View all plans (card grid layout)
- Create/Edit plans with features
- Activate/Deactivate plans
- Delete plans (only if no active memberships)

### Payments
- View payment history with pagination
- Record new payments
- Auto-assign memberships when payment includes a plan
- Generate and download invoice PDFs
- Process refunds (Admin only)

### Staff Management (Admin only)
- View all staff members
- Add/Edit staff
- Manage salaries and roles
- Deactivate staff

### Trainers Management
- View all trainers
- Add/Edit trainers with specializations
- Manage certifications and experience
- Deactivate trainers

## User Roles

| Role | Access Level |
|------|--------------|
| SUPER_ADMIN | Full access to all features |
| ADMIN | Manage all entities, cannot create other admins |
| STAFF | View members, record payments, view plans/trainers |

## API Authentication

All API requests (except login) require a JWT token:

```
Authorization: Bearer <token>
```

The token is automatically managed by the frontend and stored in localStorage.

## Design System

The admin panel follows the existing StrongX design system:

- **Colors**:
  - Primary: `#f0dd35` (yellow/gold)
  - Background: `#121212` (dark)
  - Cards: `#1a1a1a` (dark-card)

- **Fonts**:
  - Headings: Orbitron (bold, uppercase)
  - Labels: Space Grotesk (uppercase, tracked)
  - Body: Inter
  - UI Elements: Plus Jakarta Sans

- **Components**: All admin components use Tailwind CSS with the same utility classes as the main site.

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/strongx_db"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```env
VITE_API_URL="http://localhost:5000/api"
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Make sure the database exists

### Login Not Working
- Run `npm run db:seed` to create default users
- Check browser console for errors
- Verify VITE_API_URL is correct

### CORS Errors
- Ensure FRONTEND_URL in backend .env matches your frontend URL
- Restart the backend server after changing .env

### PDF Generation Not Working
- The backend generates PDFs server-side
- Check for pdfkit installation: `npm install pdfkit`

## Production Deployment

### Backend
1. Build: `npm run build`
2. Set `NODE_ENV=production`
3. Use a process manager like PM2
4. Set up SSL/HTTPS
5. Use a production database

### Frontend
1. Build: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Set VITE_API_URL to production API URL

## Support

For issues or questions, refer to:
- `backend/README.md` - Backend-specific documentation
- `ADMIN_IMPLEMENTATION_PLAN.md` - Full implementation details
