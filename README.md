# MERN JWT Authentication

A basic beginner-level MERN stack application demonstrating user authentication using **JSON Web Tokens (JWT)** with an **Express.js** backend and a **React (Vite)** frontend.

---

## 🚀 Features

- **User Registration (`/register`)**: Register new users (stored in memory).
- **User Login (`/login`)**: Authenticate user credentials and issue a JWT.
- **Protected Route (`/protected`)**: Access restricted resources by providing a Bearer token in the request header.
- **React Frontend**:
  - Forms for User Registration and Login.
  - Automatic JWT storage in `localStorage`.
  - Token-based request to access protected route.
  - Logout functionality to clear token from `localStorage`.

---

## 📁 Project Structure

```text
mern-jwt-auth/
├── server/           # Express.js backend API
│   ├── index.js      # Server logic & auth routes
│   └── package.json  # Backend dependencies
└── client/           # React frontend (Vite)
    ├── src/
    │   ├── App.jsx   # Main UI component & API fetch calls
    │   ├── App.css   # Basic styling
    │   └── main.jsx
    └── package.json  # Frontend dependencies