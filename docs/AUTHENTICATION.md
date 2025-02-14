# Authentication and Login Pathways in DesiLingo

## Overview

DesiLingo uses Auth0 for authentication and authorization. This document details the authentication flow, login pathways, and integration details.

## Auth0 Integration

### Frontend Integration

1. **Auth0 Provider Setup**
   ```tsx
   // AuthProvider.tsx
   import { Auth0Provider } from '@auth0/auth0-react';
   
   export const AuthProvider: React.FC = ({ children }) => {
     return (
       <Auth0Provider
         domain={import.meta.env.VITE_AUTH0_DOMAIN}
         clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
         authorizationParams={{
           redirect_uri: window.location.origin,
           audience: import.meta.env.VITE_AUTH0_AUDIENCE
         }}
       >
         {children}
       </Auth0Provider>
     );
   };
   ```

2. **Login Button Implementation**
   ```tsx
   import { useAuth0 } from '@auth0/auth0-react';
   
   export const LoginButton: React.FC = () => {
     const { loginWithRedirect } = useAuth0();
     
     return (
       <Button onClick={() => loginWithRedirect()}>
         Log In
       </Button>
     );
   };
   ```

### Backend Integration

1. **JWT Validation Middleware**
   ```javascript
   const { auth } = require('express-oauth2-jwt-bearer');
   
   const validateAuth0Token = auth({
     audience: process.env.AUTH0_AUDIENCE,
     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
   });
   ```

2. **Protected Route Implementation**
   ```javascript
   app.get('/api/protected', validateAuth0Token, (req, res) => {
     // Access token is valid
     res.json({ message: 'Protected resource accessed' });
   });
   ```

## Login Pathways

### 1. Direct Login Flow

1. User clicks "Login" button
2. Redirected to Auth0 Universal Login Page
3. User enters credentials or chooses social login
4. Redirected back to application with tokens
5. Application validates tokens and establishes session

### 2. Social Login Providers

Currently supported providers:
- Google
- Facebook
- GitHub

Configuration in Auth0 Dashboard:
1. Enable social connections
2. Configure client IDs and secrets
3. Set up appropriate callback URLs

### 3. Sign-Up Flow

1. New user clicks "Sign Up"
2. Redirected to Auth0 signup page
3. Enters details or uses social provider
4. Account created in Auth0
5. User data synchronized with DesiLingo database

## Token Management

### Access Tokens

- JWT format
- Used for API authorization
- Contains user permissions and roles
- 1-hour expiration by default

### ID Tokens

- Contains user profile information
- Used for client-side user context
- Also JWT format
- Same expiration as access tokens

### Refresh Tokens

- Used to obtain new access tokens
- 30-day rotation
- Secure storage in HTTP-only cookies

## Role-Based Access Control (RBAC)

### User Roles

1. **Learner** (default)
   - Access to learning content
   - Track progress
   - Take quizzes

2. **Teacher**
   - Create content
   - Monitor student progress
   - Access analytics

3. **Admin**
   - Full system access
   - User management
   - Content management

### Role Assignment

1. **Via Auth0 Rules**
   ```javascript
   function (user, context, callback) {
     const namespace = 'https://desilingo.com';
     const assignedRoles = (context.authorization || {}).roles;
     
     const idTokenClaims = context.idToken || {};
     idTokenClaims[`${namespace}/roles`] = assignedRoles;
     
     context.idToken = idTokenClaims;
     callback(null, user, context);
   }
   ```

2. **Manual Assignment**
   - Through Auth0 Dashboard
   - API endpoints for admin users

## Security Considerations

### Token Storage

1. **Access Token**
   - Stored in memory
   - Never in localStorage
   - Refreshed automatically

2. **Refresh Token**
   - HTTP-only cookie
   - Secure flag enabled
   - SameSite=Strict

### CSRF Protection

1. **State Parameter**
   - Generated on login
   - Validated on callback

2. **Double Submit Cookie**
   - For API requests
   - Validated on server

### Logout Handling

1. **Client-Side**
   ```tsx
   const { logout } = useAuth0();
   
   const handleLogout = () => {
     logout({
       logoutParams: {
         returnTo: window.location.origin
       }
     });
   };
   ```

2. **Server-Side**
   - Clear session data
   - Revoke refresh tokens
   - Redirect to home

## Troubleshooting

### Common Issues

1. **Token Validation Failures**
   - Check audience and issuer configuration
   - Verify token expiration
   - Check for clock skew

2. **Callback URL Errors**
   - Verify allowed callback URLs in Auth0
   - Check for HTTP vs HTTPS mismatches
   - Ensure proper URL encoding

3. **Role/Permission Issues**
   - Check Auth0 rules
   - Verify token claims
   - Check API permissions

## Monitoring and Maintenance

1. **Auth0 Logs**
   - Failed login attempts
   - Token issuance
   - Rule execution

2. **Application Logs**
   - Token validation
   - Role assignment
   - API access

3. **Security Alerts**
   - Suspicious IP addresses
   - Multiple failed attempts
   - Token revocation events 