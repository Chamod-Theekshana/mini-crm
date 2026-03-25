# Mini CRM Backend

Express + MongoDB backend for authentication and note management.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- express-validator
- Jest + Supertest + mongodb-memory-server

## Setup

1. Install dependencies:
   npm install
2. Create environment file:
   copy .env.example .env
3. Update values in .env (MONGO_URI, JWT_SECRET)
4. Run development server:
   npm run dev

Backend runs on http://localhost:5000 by default.

## Scripts

- npm run dev: Start in watch mode
- npm start: Start production server
- npm test: Run Jest tests

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile (protected)

### Notes (all protected)

- POST /api/notes
- GET /api/notes
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id

## Request Notes

- Send JWT as Authorization: Bearer <token>
- Notes are automatically associated with logged-in user using assignedTo
- Only owner can read/update/delete their notes
