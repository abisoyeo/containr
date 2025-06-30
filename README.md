# Containr

Containr is a full-stack todo application built with Node.js, Express, and React. It features Auth0 authentication, MongoDB persistence, and Docker containerization for streamlined development and deployment.

## Features

- **Secure Authentication**: Auth0 integration with Redis-based session management
- **User Management**: Custom user models with profile preferences
- **Todo Management**: Full CRUD operations with user-specific data isolation
- **Modern Frontend**: React with protected routes and context-based authentication
- **Containerized Deployment**: Docker setup for development and production
- **RESTful API**: Clean, documented endpoints with proper error handling
- **CI/CD Pipeline**: GitHub Actions for automated testing and linting

## Technology Stack

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Redis** - Session storage
- **Auth0** - Authentication provider (express-openid-connect)
- **Docker** - Containerization

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS** - Styling

## Project Structure

### Backend (`/server`)

```
/config          # Configuration files (Auth0, CORS, DB, session)
/routes          # API route handlers (auth, todos)
  - auth.js      # Authentication routes
  - todos.js     # Todo CRUD operations
/models          # Mongoose schemas
  - user.js      # User model with preferences
  - todo.js      # Todo model with user association
/middleware      # Custom middleware
  - syncUser.js  # User synchronization middleware
 app.js        # Application entry point
```

### Frontend (`/client`)

```
/components      # Reusable React components
  - Header.jsx    # Navigation header
  - AuthContext.jsx # Authentication context provider
  - TodoForm.jsx  # Todo creation form
  - TodoItem.jsx  # Individual todo component
  - TodoList.jsx  # Todo list container
  - ProtectedRoute.jsx # Route protection wrapper
/pages           # Page components
  - LoginPage.jsx     # Login page
App.jsx          # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Auth0 account for authentication setup

### 1. Clone the Repository

```bash
git clone https://github.com/abisoyeo/containr.git
cd containr
```

### 2. Environment Configuration

Create `.env` files for both server and client:

**Server `.env`:**

```env
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
MONGODB_URI=mongodb://localhost:27017/containr
REDIS_HOST=redis://localhost
REDIS_PORT=6379
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-session-secret
```

### 3. Run with Docker

```bash
docker-compose up --build
```

This command will:

- Start the MongoDB container
- Build and run the backend server (port 3000)
- Build and run the frontend client (port 5173)

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

## API Reference

### Authentication Endpoints

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/login`       | Initiate Auth0 login        |
| GET    | `/api/logout`      | Logout and clear session    |
| GET    | `/api/auth-status` | Check authentication status |
| GET    | `/api/profile`     | Get user profile data       |
| PUT    | `/api/profile`     | Update user preferences     |

### Todo Endpoints

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/todos`     | Fetch user's todos     |
| POST   | `/api/todos`     | Create a new todo      |
| PUT    | `/api/todos/:id` | Update a specific todo |
| DELETE | `/api/todos/:id` | Delete a specific todo |

All todo endpoints require authentication and automatically filter data by the authenticated user.

## Development Notes

### Authentication Flow

- Auth0 handles user authentication with Redis-based session management
- Custom middleware (`syncUser.js`) synchronizes Auth0 users with the local database
- Frontend uses `AuthContext` to manage authentication state
- Protected routes automatically redirect unauthenticated users

### Data Security

- All todo operations are scoped to the authenticated user
- Database queries include user filtering to prevent data leakage
- Session-based authentication with Redis storage and secure cookie handling

### Frontend Architecture

- Context API provides global authentication state
- Protected routes wrap components requiring authentication
- API calls include proper error handling and loading states

### Testing & Quality Assurance

- GitHub Actions workflow for automated linting and code quality checks
- Test suite structure ready for implementation (tests not yet written)
- ESLint configuration for consistent code style

## License

This project is licensed under the MIT License. See the LICENSE file for details.
