# Role and Permission Based Authorization System

A role-based web application designed to manage users, departments, and organizational access efficiently. The system supports hierarchical roles and secure workflows, similar to real-world enterprise admin panels.

---

## Features

- Role-based access control with **Super Admin** and **Admin**
- Department creation and management
- User management with status control (active/inactive)
- Secure authentication and authorization using JWT
- Protected routes for admin dashboards
- Dynamic tables and real-time UI updates

---

## Tech Stack

### Frontend
- React.js
- Redux
- Tailwind CSS
- React Router
- Framer Motion (for UI animations)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## Roles & Permissions

### Super Admin
- Create and manage departments
- View and manage all users
- Assign users to departments
- Control admin access

### Admin
- View users within assigned departments
- Manage user status
- Limited administrative privileges

---

## Project Structure

role-permission-project/
│
├── frontend/ # React application
├── backend/ # Node.js + Express REST APIs
├── .gitignore
└── README.md

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or cloud)
- Git

---

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
---

### Environment Variables

Create a .env file inside the backend folder and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Initial Super Admin Setup

Before running the application for the first time, execute the seed script to create the initial Super Admin account:

```bash
cd backend
node seed.js
```

---

### Status

🚧 This project is under active development and is intended for learning and showcasing real-world MERN stack architecture and admin-level access control.
