# StrongX Admin Panel Implementation Plan

## Phase 1: Tech Stack Analysis Summary

### Frontend Stack
- **Framework**: React 19.2.4 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Routing**: react-router-dom 7.13.0 (HashRouter)
- **CSS/Styling**: Tailwind CSS (CDN) + Custom CSS variables
- **Icons**: lucide-react
- **State Management**: React useState/useEffect (no external state library)
- **API Client**: None currently (will implement with fetch)

### Design System Tokens
```
Colors:
- Primary: #f0dd35 (yellow/gold)
- Primary Hover: #efd915
- Dark Background: #121212
- Dark Card: #1a1a1a
- Neutral Gray: #989898
- Neutral Border: #656565
- White: #ffffff

Fonts:
- Headings: Orbitron (black, uppercase, italic for large headings)
- Labels: Space Grotesk (uppercase, tracking-[0.3em])
- Body: Inter
- Buttons/UI: Plus Jakarta Sans (uppercase, tracking-widest)

Styling Patterns:
- Cards: bg-dark-card border border-neutral-border/20 rounded-2xl/3xl
- Buttons Primary: bg-primary text-dark font-jakarta font-bold uppercase tracking-widest
- Buttons Secondary: border border-neutral-border text-white hover:border-primary
- Inputs: bg-dark border border-neutral-border/30 rounded-xl p-4 text-white
- Shadows: shadow-[0_0_30px_-10px_#f0dd35] for glow effects
```

### Folder Structure
```
strongx-fitness/
├── components/          # React components
├── services/            # API services (gemini.ts)
├── App.tsx              # Main app with routes
├── index.tsx            # Entry point
├── index.css            # Global styles
├── index.html           # HTML template with Tailwind config
├── constants.tsx        # Data constants
├── types.ts             # TypeScript interfaces
└── vite.config.ts       # Vite configuration
```

---

## Phase 2: Admin Implementation Structure

### Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── env.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── models/
│   │   └── index.ts (Prisma client export)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── dashboard.routes.ts
│   │   ├── members.routes.ts
│   │   ├── plans.routes.ts
│   │   ├── payments.routes.ts
│   │   ├── staff.routes.ts
│   │   ├── trainers.routes.ts
│   │   └── index.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── dashboard.controller.ts
│   │   ├── members.controller.ts
│   │   ├── plans.controller.ts
│   │   ├── payments.controller.ts
│   │   ├── staff.controller.ts
│   │   └── trainers.controller.ts
│   ├── services/
│   │   ├── pdf.service.ts
│   │   └── notification.service.ts
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── member.validator.ts
│   │   └── payment.validator.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── package.json
├── tsconfig.json
└── .env.example
```

### Frontend Admin Structure (integrated into existing)
```
strongx-fitness/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── RevenueCard.tsx
│   │   ├── ExpiringMembersAlert.tsx
│   │   ├── DataTable.tsx
│   │   ├── MemberForm.tsx
│   │   ├── MemberDetailModal.tsx
│   │   ├── PlanForm.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── StaffForm.tsx
│   │   ├── TrainerForm.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── SearchInput.tsx
│   │   ├── FilterDropdown.tsx
│   │   └── StatusBadge.tsx
│   └── ... (existing components)
├── pages/
│   └── admin/
│       ├── LoginPage.tsx
│       ├── DashboardPage.tsx
│       ├── MembersPage.tsx
│       ├── PlansPage.tsx
│       ├── PaymentsPage.tsx
│       ├── StaffPage.tsx
│       └── TrainersPage.tsx
├── services/
│   ├── api.ts (API client)
│   └── auth.ts (Auth service)
├── hooks/
│   ├── useAuth.ts
│   └── useApi.ts
├── contexts/
│   └── AuthContext.tsx
└── types/
    └── admin.ts
```

---

## Phase 3: Database Schema (Prisma)

```prisma
// User model for admin/staff authentication
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  name          String
  role          Role      @default(STAFF)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  auditLogs     AuditLog[]
}

enum Role {
  SUPER_ADMIN
  ADMIN
  STAFF
}

// Member model
model Member {
  id                String    @id @default(uuid())
  memberId          String    @unique // Display ID like "SX-001"
  firstName         String
  lastName          String
  email             String    @unique
  phone             String
  dateOfBirth       DateTime?
  gender            Gender?
  address           String?
  emergencyContact  String?
  profileImage      String?
  status            MemberStatus @default(ACTIVE)
  joinDate          DateTime  @default(now())
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  memberships       MembershipHistory[]
  payments          Payment[]
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum MemberStatus {
  ACTIVE
  INACTIVE
  EXPIRED
  SUSPENDED
}

// Membership Plan
model MembershipPlan {
  id            String    @id @default(uuid())
  name          String
  description   String?
  price         Decimal   @db.Decimal(10, 2)
  duration      Int       // in days
  features      String[]
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  memberships   MembershipHistory[]
}

// Membership History (tracks member plan subscriptions)
model MembershipHistory {
  id            String    @id @default(uuid())
  member        Member    @relation(fields: [memberId], references: [id])
  memberId      String
  plan          MembershipPlan @relation(fields: [planId], references: [id])
  planId        String
  startDate     DateTime
  endDate       DateTime
  status        SubscriptionStatus @default(ACTIVE)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum SubscriptionStatus {
  ACTIVE
  EXPIRED
  CANCELLED
}

// Payment
model Payment {
  id            String    @id @default(uuid())
  paymentId     String    @unique // Display ID like "PAY-001"
  member        Member    @relation(fields: [memberId], references: [id])
  memberId      String
  amount        Decimal   @db.Decimal(10, 2)
  paymentMethod PaymentMethod
  paymentDate   DateTime  @default(now())
  status        PaymentStatus @default(COMPLETED)
  description   String?
  invoice       Invoice?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum PaymentMethod {
  CASH
  CARD
  BANK_TRANSFER
  ONLINE
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// Invoice
model Invoice {
  id            String    @id @default(uuid())
  invoiceNumber String    @unique // INV-001
  payment       Payment   @relation(fields: [paymentId], references: [id])
  paymentId     String    @unique
  issuedDate    DateTime  @default(now())
  dueDate       DateTime?
  pdfUrl        String?
  createdAt     DateTime  @default(now())
}

// Staff
model Staff {
  id            String    @id @default(uuid())
  staffId       String    @unique // STF-001
  firstName     String
  lastName      String
  email         String    @unique
  phone         String
  role          String    // e.g., "Front Desk", "Manager"
  salary        Decimal?  @db.Decimal(10, 2)
  joinDate      DateTime  @default(now())
  isActive      Boolean   @default(true)
  profileImage  String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Trainer
model Trainer {
  id            String    @id @default(uuid())
  trainerId     String    @unique // TRN-001
  firstName     String
  lastName      String
  email         String    @unique
  phone         String
  specialization String[]
  certification String[]
  experience    Int       // in years
  salary        Decimal?  @db.Decimal(10, 2)
  joinDate      DateTime  @default(now())
  isActive      Boolean   @default(true)
  profileImage  String?
  bio           String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Audit Log
model AuditLog {
  id            String    @id @default(uuid())
  user          User      @relation(fields: [userId], references: [id])
  userId        String
  action        String    // CREATE, UPDATE, DELETE
  entity        String    // Member, Payment, etc.
  entityId      String
  changes       Json?
  ipAddress     String?
  createdAt     DateTime  @default(now())
}
```

---

## Phase 4: API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/admin/dashboard/summary` - Stats (total members, active, expired, expiring)
- `GET /api/admin/dashboard/revenue` - Revenue stats (today, this month, this year)

### Members
- `GET /api/members` - List with pagination, search, filters
- `GET /api/members/:id` - Get single member
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Soft delete member
- `GET /api/members/:id/membership-history` - Member's subscription history

### Membership Plans
- `GET /api/plans` - List all plans
- `GET /api/plans/:id` - Get single plan
- `POST /api/plans` - Create plan
- `PUT /api/plans/:id` - Update plan
- `DELETE /api/plans/:id` - Deactivate plan

### Payments
- `GET /api/payments` - List with pagination
- `POST /api/payments` - Record payment
- `GET /api/invoices/:id/pdf` - Generate/download invoice PDF

### Staff
- `GET /api/staff` - List all staff
- `POST /api/staff` - Create staff
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Deactivate staff

### Trainers
- `GET /api/trainers` - List all trainers
- `POST /api/trainers` - Create trainer
- `PUT /api/trainers/:id` - Update trainer
- `DELETE /api/trainers/:id` - Deactivate trainer

### Notifications
- `GET /api/notifications/expiring-members` - Members expiring in 7 days

---

## Phase 5: UI Components to Reuse/Extend

### Existing Patterns to Follow:
1. **Section Headers**: `font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em]`
2. **Main Headings**: `font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic`
3. **Cards**: `bg-dark-card rounded-2xl border border-neutral-border/20`
4. **Buttons Primary**: `bg-primary text-dark font-jakarta font-bold uppercase tracking-widest px-6 py-3 rounded-xl`
5. **Inputs**: `bg-dark border border-neutral-border/30 rounded-xl p-4 text-white`
6. **Tables**: Custom styling from ClassSchedule component
7. **Badges**: Colored backgrounds with matching text like level badges

### New Admin Components Needed:
1. **AdminLayout** - Sidebar navigation with header
2. **DataTable** - Reusable table with sorting, pagination
3. **Modal** - Consistent modal for forms
4. **SearchInput** - Search with icon
5. **FilterDropdown** - Dropdown for status filters
6. **StatusBadge** - Member/payment status badges
7. **StatCard** - Dashboard stat cards
8. **RevenueCard** - Revenue display cards
9. **AlertBanner** - Expiring members alert

---

## Implementation Order

1. **Backend Setup** (Day 1)
   - Initialize Node.js/Express project
   - Setup Prisma with PostgreSQL
   - Create database schema
   - Setup middleware (auth, RBAC, validation)

2. **Backend API** (Day 2)
   - Implement all controllers
   - Create API routes
   - Add validation with Zod
   - Seed initial data

3. **Frontend Auth** (Day 3)
   - Create AuthContext
   - Login page
   - Protected route wrapper
   - API client setup

4. **Admin Dashboard** (Day 4)
   - Dashboard layout
   - Stats cards
   - Revenue display
   - Expiring members alert

5. **Members Management** (Day 5)
   - Members list with DataTable
   - Add/Edit member modal
   - Member detail view
   - Membership history

6. **Payments & Plans** (Day 6)
   - Plans management
   - Payment recording
   - Invoice PDF generation

7. **Staff & Trainers** (Day 7)
   - Staff management page
   - Trainers management page

8. **Testing & Polish** (Day 8)
   - End-to-end testing
   - UI polish
   - Documentation

---

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/strongx_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
```

### Frontend (.env.local)
```
VITE_API_URL="http://localhost:5000/api"
```
