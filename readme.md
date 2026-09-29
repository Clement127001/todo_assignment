# ZipTrrip Assigment

- The fullstack TODO application

## Frontend:

- Tech Stack
  - React
  - Typescript
  - React Router DOM
  - Vite
  - Tailwind
  - Shadcn UI - Component library
  - React hook form

## Backend:

- Tech Stack
  - Express
  - Node
  - Typescript
  - Mongo DB
  - Mongoose
  - Zod

## Routes

- Auth Routes
  - Register User - /api/auth/register
  - Login User - /api/auth/login

- Todo Routes
  - List Todos - /api/todos
  - Get Todo - /api/todos/:todoId
  - Create Todo - /api/todos
  - Update Todo - /api/todos/:todoId
  - Delete Todo - /api/todos/:todoId

### setup for backend

- note : setup the env file before starting the backend

```
PORT=3000
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
JWT_LIFETIME=7d
```

- install all packages

```
npm i
```

- start dev server:

```
npm run dev
```
