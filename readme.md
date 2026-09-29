# ZipTrrip Assignment

A full-stack TODO application built with React and Node.js. The application provides user authentication and allows authenticated users to create, view, update, and delete their own TODOs.

---

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected TODO routes
- Users can only access their own TODOs

### TODO Management

- Create a TODO
- List all TODOs belonging to the logged-in user
- View TODO details
- Update TODO title, description, and completion status
- Delete TODO
- TODO completion tracking

### Validation & Error Handling

- Request validation using Zod
- Mongoose schema validation
- Centralized error handling
- Custom API error classes
- MongoDB/Mongoose error handling
- Invalid JWT handling

---

# Frontend

## Tech Stack

- React
- TypeScript
- React Router DOM
- Vite
- Tailwind CSS
- shadcn/ui - Component Library
- React Hook Form

## Frontend Setup

Navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL provided by Vite, usually:

```text
http://localhost:5173
```

---

# Backend

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod
- JWT
- bcrypt

## Backend Setup

Navigate to the backend directory:

```bash
cd server
```

### Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
JWT_LIFETIME=7d
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

# API Summary

| Method | Endpoint             | Authentication | Description         |
| ------ | -------------------- | -------------- | ------------------- |
| POST   | `/api/auth/register` | No             | Register a new user |
| POST   | `/api/auth/login`    | No             | Login user          |
| GET    | `/api/todos`         | Yes            | Get user's TODOs    |
| GET    | `/api/todos/:todoId` | Yes            | Get a TODO          |
| POST   | `/api/todos`         | Yes            | Create a TODO       |
| PATCH  | `/api/todos/:todoId` | Yes            | Update a TODO       |
| DELETE | `/api/todos/:todoId` | Yes            | Delete a TODO       |

---

# API Documentation

Base URL:

```text
http://localhost:3000/api
```

## Authentication Routes

### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "user": {
    "name": "John Doe"
  },
  "token": "<jwt_token>"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "user": {
    "name": "John Doe",
    "userId": "<user_id>"
  },
  "token": "<jwt_token>"
}
```

The returned JWT should be sent with protected requests using:

```http
Authorization: Bearer <jwt_token>
```

---

# TODO Routes

All TODO routes require authentication.

## List Todos

```http
GET /api/todo
```

Headers:

```http
Authorization: Bearer <jwt_token>
```

Returns all TODOs belonging to the authenticated user.

---

## Get Todo

```http
GET /api/todo/:todoId
```

Example:

```text
GET /api/todo/65f123456789abcdef123456
```

Headers:

```http
Authorization: Bearer <jwt_token>
```

Returns the requested TODO if it belongs to the authenticated user.

---

## Create Todo

```http
POST /api/todo
```

Headers:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish the ZipTrrip full-stack TODO assignment"
}
```

The `author` is automatically assigned using the authenticated user's ID.

A newly created TODO has:

```json
{
  "completed": false
}
```

---

## Update Todo

```http
PATCH /api/todos/:todoId
```

Headers:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

Example request:

```json
{
  "title": "Complete assignment",
  "completed": true
}
```

The following fields can be updated:

- `title`
- `description`
- `completed`

---

## Delete Todo

```http
DELETE /api/todos/:todoId
```

Headers:

```http
Authorization: Bearer <jwt_token>
```

Deletes the specified TODO if it belongs to the authenticated user.

---

# Data Model

## User

```text
User
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

Passwords are hashed using bcrypt before being stored in the database.

---

## Todo

```text
Todo
├── title
├── description
├── author → User
├── completed
├── createdAt
└── updatedAt
```

The `author` field references the authenticated user who created the TODO.

---

# Authentication Flow

The application uses JWT-based authentication.

```text
User
  │
  ├── Register / Login
  │
  ▼
Backend
  │
  ├── Validate credentials
  ├── Hash/compare password
  └── Generate JWT
  │
  ▼
Frontend
  │
  └── Stores authentication token
  │
  ▼
Protected API Request
  │
  └── Authorization: Bearer <token>
  │
  ▼
Authentication Middleware
  │
  ├── Verify JWT
  └── Attach user information to request
  │
  ▼
Todo Controller
```

This ensures that TODO operations are performed in the context of the authenticated user.

---

# Validation

Zod is used to validate incoming API requests.

Examples of validation include:

- Required fields
- Name length
- Email format
- Password length
- TODO title length
- TODO description length
- MongoDB ObjectId format
- TODO update fields

Invalid requests are rejected before reaching the controller.

---

# Error Handling

The backend uses centralized error handling.

The application handles:

- Custom API errors
- Validation errors
- Zod validation errors
- Mongoose validation errors
- Invalid MongoDB ObjectIds
- Duplicate MongoDB records
- Authentication errors
- Unexpected server errors

A typical error response follows this structure:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Project Structure

```text
todo-app/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── config/
│       │   ├── env.ts
│       │   └── database.ts
│       │
│       ├── middleware/
│       │   ├── error-handler.ts
│       │   └── validate.middleware.ts
│       │
│       ├── errors/
│       │   ├── custom-api.ts
│       │   ├── bad-request.ts
│       │   ├── not-found.ts
│       │   ├── unauthenticated.ts
│       │   └── index.ts
│       │
│       ├── modules/
│       │   ├── auth/
│       │   └── todo/
│       │
│       ├── types/
│       ├── app.ts
│       └── server.ts
│
└── README.md
```

---

# Running the Complete Application

### 1. Start MongoDB

Make sure MongoDB is running locally or provide a valid MongoDB connection string in `.env`.

### 2. Start Backend

```bash
cd server
npm install
npm run dev
```

### 3. Start Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

### 4. Open the Application

Open the frontend URL provided by Vite, typically:

```text
http://localhost:5173
```

---

# Design Decisions

### JWT Authentication

JWT was used to keep authentication stateless and to protect TODO APIs.

### User-Owned TODOs

Every TODO is associated with its creator through the `author` field. Protected operations verify the authenticated user's identity before accessing or modifying a TODO.

### Zod Validation

Zod provides request-level validation before data reaches the application logic, reducing invalid data entering the system.

### Centralized Error Handling

Errors are handled through a centralized Express middleware instead of duplicating error-response logic across controllers.

### Separation of Concerns

The backend is organized into controllers, models, middleware, validation schemas, configuration, and error handling to keep responsibilities separated and make the application easier to maintain.

---
