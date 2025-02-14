# Getting Started with DesiLingo

This guide will help you set up and run the DesiLingo application locally.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git
- A code editor (VS Code recommended)
- Auth0 account (for authentication)

## Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/desilingo.git
   cd desilingo
   ```

2. **Environment Setup**

   a. Frontend (.env in frontend directory):
   ```
   VITE_API_URL=http://localhost:3000
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=your-auth0-api-identifier
   ```

   b. Backend (.env in backend directory):
   ```
   PORT=3000
   DATABASE_URL=postgres://desilingo_user:desilingo_password@localhost:5432/desilingo
   AUTH0_ISSUER_BASE_URL=https://your-auth0-domain/
   AUTH0_AUDIENCE=your-auth0-api-identifier
   ```

3. **Start Database**
   ```bash
   docker compose up -d
   ```

4. **Install Dependencies**

   a. Frontend:
   ```bash
   cd frontend
   npm install
   ```

   b. Backend:
   ```bash
   cd backend
   npm install
   ```

## Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Database Admin (pgAdmin): http://localhost:5050

## Auth0 Setup

1. Create a new Auth0 application:
   - Go to Auth0 Dashboard
   - Create a new Single Page Application
   - Set Allowed Callback URLs to http://localhost:5173/callback
   - Set Allowed Logout URLs to http://localhost:5173
   - Set Allowed Web Origins to http://localhost:5173

2. Create an API in Auth0:
   - Name it "DesiLingo API"
   - Set the identifier (this will be your AUTH0_AUDIENCE)
   - Enable RBAC and Add Permissions in Access Settings

3. Configure Auth0 Rules for user roles (if needed)

## Common Issues and Solutions

1. **Database Connection Issues**
   - Ensure Docker containers are running: `docker ps`
   - Check database logs: `docker logs desilingo_db`
   - Verify .env configuration matches Docker Compose settings

2. **Auth0 Authentication Problems**
   - Verify environment variables are set correctly
   - Check Auth0 application settings
   - Ensure callback URLs are configured properly

3. **Node Module Issues**
   - Clear node_modules and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

## Development Workflow

1. **Code Style**
   - Frontend uses ESLint and Prettier
   - Run `npm run lint` and `npm run format` before committing

2. **Database Changes**
   - All schema changes should be documented in `database/schema.sql`
   - Test data can be added through `database/seed.sql`

3. **Testing**
   - Frontend: Component tests with React Testing Library
   - Backend: API tests with Jest
   - Database: Follow db_testing.md guide

## Additional Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For additional help:
1. Check existing documentation in the `docs` folder
2. Review issues on GitHub
3. Contact the development team 