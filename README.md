# LuxStay - Premium Hotel Booking Application

![LuxStay Banner](https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop)

## 🌐 Live Demo

**[View Live App](https://hotel.trihonor.com)** 🚀

## Overview

**LuxStay** is a modern, full-stack hotel booking platform built to deliver a seamless and luxurious user experience. Engineered with performance and scalability in mind, it leverages the latest web technologies to provide real-time availability, secure payments, user authentication, and instant customer support via an integrated AI-powered chatbot.

## 🚀 Key Features

- **Modern User Interface**: A fully responsive, high-fidelity design crafted with **Tailwind CSS**.
- **Seamless Booking Flow**: Intuitive room selection, detailed amenities view, and a streamlined reservation process.
- **Secure Authentication**: Google OAuth integration via **NextAuth.js** for secure user authentication.
- **Real-time Availability**: Database-backed room availability checking with conflict detection.
- **Stripe Payment Integration**: Secure payment processing with **Stripe** and webhook support.
- **Admin Dashboard**: Comprehensive admin panel for managing bookings, rooms, and users with role-based access control.
- **Review & Rating System**: Users can leave reviews with ratings, photos, and helpful voting.
- **Advanced Search & Filters**: Filter rooms by price, capacity, amenities, and sort by various criteria.
- **Interactive Chatbot**: A floating support widget providing instant assistance to guests.
- **Dynamic Routing**: SEO-friendly pages for every room and content section.
- **Database Persistence**: All bookings, payments, and user data stored in **PostgreSQL**.

## 🛠 Technology Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth
- **Payments**: [Stripe](https://stripe.com/)
- **Validation**: [Zod](https://zod.dev/)

## 📂 Project Structure

The project follows a modern, modular architecture within the `src` directory:

```bash
src/
├── app/                    # Next.js App Router (Pages & API)
│   ├── page.tsx            # Landing Page (Hero & Featured Rooms)
│   ├── layout.tsx          # Root Layout (Navbar, Footer, Global Providers)
│   ├── api/                # API Routes
│   │   ├── auth/           # NextAuth.js authentication endpoints
│   │   ├── rooms/          # Room CRUD operations
│   │   ├── bookings/       # Booking management
│   │   ├── payments/       # Stripe payment processing
│   │   ├── availability/   # Room availability checking
│   │   ├── reviews/        # Review & rating management
│   │   └── user/           # User profile management
│   ├── rooms/              # Room Listing & Dynamic Detail Pages
│   │   ├── page.tsx        # /rooms (Grid View with Filters)
│   │   └── [id]/           # /rooms/[id] (Dynamic Room Details)
│   ├── booking/            # Booking Workflow
│   │   ├── page.tsx        # Reservation Form (Server Actions)
│   │   └── success/        # Confirmation Page
│   ├── my-bookings/        # User's Booking History
│   ├── admin/              # Admin Dashboard (Protected)
│   │   ├── page.tsx        # Dashboard Overview
│   │   ├── bookings/       # Booking Management
│   │   ├── rooms/          # Room Management
│   │   ├── users/          # User Management
│   │   └── reviews/        # Review Moderation
│   ├── auth/               # Authentication Pages
│   │   └── signin/         # Sign In Page
│   ├── about/              # About Us Page
│   ├── contact/            # Contact Page
│   ├── faq/                # FAQ Page
│   ├── privacy/            # Privacy Policy
│   ├── terms/              # Terms of Service
│   ├── cookies/            # Cookie Policy
│   └── cancellation/       # Cancellation Policy
│
├── components/             # Reusable UI Components
│   ├── layout/             # Application Shell (Navbar, Footer)
│   ├── ui/                 # Atomic Design Elements (Buttons, Inputs)
│   ├── chatbot/            # Floating Chat Widget Logic
│   └── providers/          # Context Providers (Auth)
│
└── lib/                    # Shared Utilities
    ├── data.ts             # Data Access Layer
    ├── types.ts            # TypeScript Interfaces & Models
    ├── utils.ts            # Helper Functions (CN, Class Merging)
    ├── db.ts               # Prisma Client Singleton
    ├── stripe.ts           # Stripe SDK Configuration
    └── auth.config.ts      # NextAuth Configuration

prisma/
├── schema.prisma           # Database Schema
└── seed.ts                 # Database Seed Script
```

## 🏁 Getting Started

### Prerequisites

Before you begin, ensure you have the following:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
4. **Stripe Account** - [Create one here](https://stripe.com/)
5. **Google Cloud Console** - For OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/kapucuonur/hotel-booking-app.git
cd hotel-booking-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### Getting Your Credentials

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**Stripe:**
1. Create account at [stripe.com](https://stripe.com/)
2. Get your test API keys from Dashboard → Developers → API keys
3. For webhooks, use Stripe CLI or create webhook endpoint in Dashboard

**NextAuth Secret:**
```bash
openssl rand -base64 32
```

### 4. Database Setup

Push the Prisma schema to your database:

```bash
npm run db:push
```

Seed the database with initial data:

```bash
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

### 6. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Management

- **Prisma Studio**: Visual database browser
  ```bash
  npm run db:studio
  ```

- **Push Schema Changes**: Update database schema
  ```bash
  npm run db:push
  ```

- **Seed Database**: Populate with sample data
  ```bash
  npm run db:seed
  ```

## 🌍 Self-Hosting (Docker & Raspberry Pi)

LuxStay can be easily self-hosted on a server or a Raspberry Pi using Docker Compose and Cloudflare Tunnels for secure exposure to the public internet without opening router ports.

### 1. Docker Compose Setup

First, ensure you have both a `Dockerfile` and `docker-compose.yml` configured. The `docker-compose.yml` spins up:
- The **Next.js Application** on port `3000`.
- A **PostgreSQL Database** on port `5432` with a persistent volume (`pgdata`).

Start the environment:
```bash
docker compose up -d --build
```

### 2. Database Restoration (Optional)

If migrating from an external provider (like Neon.tech), you can restore your `.sql` dump into the fresh Docker database:
```bash
cat /tmp/hotel_backup.sql | docker compose exec -T db psql -U pi -d hoteldb
```

### 3. Exposing via Cloudflare Tunnels

To securely access your application via a custom domain (e.g., `hotel.trihonor.com`):
1. Navigate to your **Cloudflare Zero Trust** dashboard.
2. Go to **Networks > Tunnels** and configure your tunnel.
3. Under **Public Hostname**, map your domain to your local port:
   - **Type**: `HTTP`
   - **URL**: `127.0.0.1:3000`
4. Ensure your `.env` file contains `NEXTAUTH_URL=https://hotel.trihonor.com` so Google Auth redirects properly.

## 🔐 Authentication Flow

1. User clicks "Sign In" in the navbar
2. Redirected to `/auth/signin`
3. Authenticates via Google OAuth
4. Session created and stored in database
5. User redirected back to the application
6. Protected routes (booking, my-bookings) now accessible

## 💳 Payment Flow

1. User selects room and dates
2. Creates booking (requires authentication)
3. Payment intent created via Stripe API
4. User completes payment
5. Stripe webhook confirms payment
6. Booking status updated to "CONFIRMED"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

© 2024 LuxStay Inc. All rights reserved.

