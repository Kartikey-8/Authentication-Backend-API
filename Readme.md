# Authentication & User Management API

A production-style REST API built with Node.js, Express.js, MongoDB, and JWT authentication. This project follows a scalable architecture using Controllers, Services, Middleware, Validators, and Utility layers to maintain clean separation of concerns.
 
## Features

* User Registration
* User Login
* JWT Access Token Authentication
* Refresh Token Authentication
* Secure Password Hashing using bcrypt
* Role-Based Authorization
* Protected Routes
* Profile Management
* Password Change Functionality
* Input Validation
* Centralized Error Handling
* Logging with Winston
* Rate Limiting
* Environment-Based Configuration

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* Zod
* Winston
* Helmet
* CORS
* Morgan
* Cookie Parser

## Project Structure

src/
├── config/
├── constants/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js
```

## Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. Server generates:

   * Access Token
   * Refresh Token
4. Refresh Token is stored securely in the database and sent as an HTTP-only cookie.
5. Access Token is used to access protected routes.
6. When the Access Token expires, a new one can be generated using the Refresh Token.
7. User can logout, invalidating the stored Refresh Token.

## API Endpoints

### Authentication

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | /api/auth/register      | Register a new user       |
| POST   | /api/auth/login         | Login user                |
| POST   | /api/auth/refresh-token | Generate new access token |
| POST   | /api/auth/logout        | Logout user               |

### User Management

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | /api/users/me              | Get logged-in user profile |
| PATCH  | /api/users/profile         | Update user profile        |
| PATCH  | /api/users/change-password | Change user password       |

## Security Features

* Passwords hashed using bcrypt
* JWT Authentication
* HTTP-only Refresh Token Cookies
* Centralized Error Handling
* Request Validation
* Role-Based Access Control
* Rate Limiting
* Secure HTTP Headers using Helmet

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGODB_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

## Installation

git clone <repository-url>

cd project-name

npm install

npm run dev
```

## Learning Outcomes

This project demonstrates:

* REST API Development
* JWT Authentication & Authorization
* Middleware Design Patterns
* Service Layer Architecture
* Error Handling Strategies
* MongoDB Data Modeling
* Secure Authentication Practices
* Production-Oriented Backend Structure

```
```
