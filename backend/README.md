# StrongX Admin Backend

Backend API for the StrongX Gym Management Admin System.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod
- **PDF Generation**: PDFKit

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the following variables:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/strongx_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Or run migrations (production)
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 4. Start the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

The server will start at `http://localhost:5000`

## Default Credentials

After seeding, you can login with:

- **Admin**: `admin@strongx.com` / `admin123`
- **Staff**: `staff@strongx.com` / `staff123`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/summary` | Get dashboard stats |
| GET | `/api/admin/dashboard/revenue` | Get revenue stats |

### Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | List members (paginated) |
| GET | `/api/members/:id` | Get member details |
| POST | `/api/members` | Create member |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Deactivate member |
| GET | `/api/members/:id/membership-history` | Get membership history |
| POST | `/api/members/:id/memberships` | Add membership |

### Plans
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/plans` | List plans |
| GET | `/api/plans/:id` | Get plan details |
| POST | `/api/plans` | Create plan (Admin+) |
| PUT | `/api/plans/:id` | Update plan (Admin+) |
| DELETE | `/api/plans/:id` | Delete plan (Admin+) |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | List payments (paginated) |
| GET | `/api/payments/:id` | Get payment details |
| POST | `/api/payments` | Create payment |
| POST | `/api/payments/:id/refund` | Refund payment (Admin+) |
| GET | `/api/payments/invoices/:id/pdf` | Download invoice PDF |

### Staff
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/staff` | List staff (Admin+) |
| GET | `/api/staff/:id` | Get staff details (Admin+) |
| POST | `/api/staff` | Create staff (Admin+) |
| PUT | `/api/staff/:id` | Update staff (Admin+) |
| DELETE | `/api/staff/:id` | Deactivate staff (Admin+) |

### Trainers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trainers` | List trainers |
| GET | `/api/trainers/:id` | Get trainer details |
| POST | `/api/trainers` | Create trainer (Admin+) |
| PUT | `/api/trainers/:id` | Update trainer (Admin+) |
| DELETE | `/api/trainers/:id` | Deactivate trainer (Admin+) |

## Role-Based Access Control

| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | Full access to everything |
| ADMIN | Manage members, plans, payments, staff, trainers |
| STAFF | View and manage members, payments, view plans & trainers |

## Database Schema

See `prisma/schema.prisma` for the complete database schema including:

- Users (authentication)
- Members
- MembershipPlans
- MembershipHistory
- Payments
- Invoices
- Staff
- Trainers
- AuditLog

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```
