# Authentication Service with RBAC Implementation

This project is an authentication service built with NestJS and MongoDB, featuring role-based access control (RBAC) and JWT authentication.

## Features
- User registration and login
- JWT-based authentication
- Role-based access control
- Password reset functionality
- Email confirmation

## Installation Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   Copy the `.env.example` file to `.env` and fill in the required values.
   ```bash
   cp .env.example .env
   ```

4. **Run the application:**
   ```bash
   npm run start
   ```

## .env.example
```
MONGODB_URI=mongodb://localhost:27017/nest
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
SMTP_FROM='"No Reply" <no-reply@example.com>'
```

## API Cost
The estimated cost for API usage is $1.1173.

## Time Spent
Approximately 1.5 hours were spent on this project.

