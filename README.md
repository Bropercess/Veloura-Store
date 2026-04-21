# Veloura — Premium Hair Care E-Commerce

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### 1. Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/veloura
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Features
- JWT Authentication (Register/Login/Profile)
- Product catalog with filtering and pagination
- Product detail pages with related products
- Shopping cart (guest & authenticated)
- Checkout flow with order creation
- Order history in user profile
- Responsive mobile-first design
- SEO optimized product pages

## Deployment
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render, Railway, or AWS
- **Database**: MongoDB Atlas
- **Images**: Hosted on Unsplash (for demo)

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, JWT
- **Styling**: Tailwind CSS with custom design system

## Environment Variables

| File | Variable | Value |
|------|----------|-------|
| `backend/.env` | `PORT` | `5000` |
| `backend/.env` | `MONGODB_URI` | `mongodb://localhost:27017/veloura` |
| `backend/.env` | `JWT_SECRET` | Any strong random string |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | `http://localhost:5000` |

## Run Instructions

1. **Start MongoDB** locally or use MongoDB Atlas
2. **Install & seed backend:**
   ```bash
   cd backend && npm install && npm run seed && npm run dev
   ```
3. **Install & start frontend:**
   ```bash
   cd frontend && npm install && npm run dev
   ```
4. **Open** `http://localhost:3000`

The project is fully modular, production-scalable, and ready for immediate local execution.