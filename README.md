# Journal

A personal journaling web application that lets users securely create, organize, and revisit their private entries over time.

## Overview

Journal is a full-stack application built around a simple idea: a clean, reliable space to write and manage personal entries. Every user has their own private, authenticated space — entries are tied to accounts, protected behind login, and fully under the user's control (create, read, update, delete).

The project is designed to grow into a complete product, with a mobile application planned as a future extension of the same backend.

## Features

- **User accounts** — register and log in securely
- **Authenticated access** — JSON Web Tokens (JWT) protect all journal data per user
- **Full journal management** — create, view, edit, and delete personal entries
- **Password security** — credentials are hashed with bcrypt, never stored in plain text

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Supertest for API testing

**Frontend**
- React (Vite)
- Styled Components
- Axios
- Vitest + Playwright for testing

## Project Structure

```
journal/
├── backend/
│   ├── models/       # User, Journal
│   ├── controllers/  # users, login, journals
│   ├── middleware/   # tokenExtractor, userExtractor, errorHandler
│   ├── tests/        # Supertest suite
│   ├── utils/        # config, logger
│   ├── app.js
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/  # LoginForm, JournalForm, JournalList, Navbar
    │   ├── services/    # API calls (axios)
    │   ├── hooks/       # token/auth state
    │   └── App.jsx
    └── tests/           # Vitest + Playwright
```

## Getting Started

### Prerequisites
- Node.js
- A MongoDB connection (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
MONGODB_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
PORT=3001
```

Run the server:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint              | Description                     | Auth required |
|--------|-----------------------|----------------------------------|----------------|
| POST   | `/api/users`          | Register a new user             | No             |
| POST   | `/api/login`          | Log in and receive a JWT         | No             |
| GET    | `/api/journals`       | Get all journals for the user    | Yes            |
| GET    | `/api/journals/:id`   | Get a single journal entry        | Yes            |
| POST   | `/api/journals`       | Create a new journal entry        | Yes            |
| PUT    | `/api/journals/:id`   | Update a journal entry            | Yes            |
| DELETE | `/api/journals/:id`   | Delete a journal entry            | Yes            |

## Roadmap

- [ ] Web frontend (React)
- [ ] Deployment (backend + frontend)
- [ ] Mobile application

## License

This project is currently unlicensed. All rights reserved by the author.