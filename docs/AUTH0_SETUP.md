# Auth0 Integration Guide

This guide will help you set up Auth0 authentication for the DevFoolYou project.

## Table of Contents

1. [Auth0 Dashboard Setup](#auth0-dashboard-setup)
2. [Backend Configuration](#backend-configuration)
3. [Frontend Configuration](#frontend-configuration)
4. [Testing the Integration](#testing-the-integration)
5. [Usage Examples](#usage-examples)

## Auth0 Dashboard Setup

### 1. Create an Auth0 Account

1. Go to [auth0.com](https://auth0.com) and sign up for a free account
2. Create a new tenant (e.g., `devfoolyou` or `your-company-name`)

### 2. Create an Application (Frontend - SPA)

1. In Auth0 Dashboard, go to **Applications** → **Applications**
2. Click **Create Application**
3. Name: `DevFoolYou Frontend`
4. Choose: **Single Page Web Applications**
5. Click **Create**

#### Configure Application Settings:

- **Allowed Callback URLs**:
  ```
  http://localhost:3000, http://localhost:3001, https://your-production-domain.com
  ```
- **Allowed Logout URLs**:
  ```
  http://localhost:3000, http://localhost:3001, https://your-production-domain.com
  ```
- **Allowed Web Origins**:
  ```
  http://localhost:3000, http://localhost:3001, https://your-production-domain.com
  ```
- **Allowed Origins (CORS)**:
  ```
  http://localhost:3000, http://localhost:3001, https://your-production-domain.com
  ```

Save changes.

**Note the following values:**

- Domain (e.g., `your-tenant.auth0.com`)
- Client ID

### 3. Create an API (Backend)

1. In Auth0 Dashboard, go to **Applications** → **APIs**
2. Click **Create API**
3. Name: `DevFoolYou API`
4. Identifier: `https://api.devfoolyou.com` (can be any unique identifier)
5. Signing Algorithm: `RS256`
6. Click **Create**

**Note the following values:**

- API Identifier (Audience)

## Backend Configuration

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create or update `backend/.env`:

```bash
# MongoDB Settings
MONGODB_URL=your-mongodb-connection-string
MONGODB_DATABASE=DevFoolYou
MONGODB_COLLECTION=Cluster0

# Auth0 Settings
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_API_AUDIENCE=https://api.devfoolyou.com
AUTH0_ISSUER=https://your-tenant.auth0.com/
AUTH0_ALGORITHMS=RS256

# Google AI
GOOGLE_API_KEY=your-google-api-key

# Server Settings
HOST=0.0.0.0
PORT=8080
DEBUG=True
LOG_LEVEL=INFO

# CORS Settings
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

**Replace the following:**

- `your-tenant` with your Auth0 tenant name
- `https://api.devfoolyou.com` with your API identifier from Auth0

### 3. Start the Backend

```bash
cd backend
python main.py
```

The backend will be available at `http://localhost:8080`

## Frontend Configuration

### 1. Install Dependencies

```bash
cd frontend
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Create or update `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080

# Auth0 Configuration
NEXT_PUBLIC_AUTH0_DOMAIN=your-tenant.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.devfoolyou.com
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
```

**Replace the following:**

- `your-tenant` with your Auth0 tenant name
- `your-client-id` with your Auth0 Application Client ID
- `https://api.devfoolyou.com` with your API identifier

### 3. Start the Frontend

```bash
cd frontend
npm run dev
# or
yarn dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Testing the Integration

### 1. Test Authentication Flow

1. Open your browser and go to `http://localhost:3000`
2. Click the "Log In" button
3. You'll be redirected to Auth0's login page
4. Sign up or log in with:
   - Email/Password
   - Google (if configured)
   - GitHub (if configured)
5. After successful authentication, you'll be redirected back to your app

### 2. Test Protected API Endpoints

```bash
# Get your access token from localStorage after logging in
# Then test the API

curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:8080/api/auth/me
```

Expected response:

```json
{
  "user": {
    "sub": "auth0|...",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://...",
    "email_verified": true
  }
}
```

## Usage Examples

### Frontend: Using Authentication in Components

#### 1. Get Current User

```tsx
"use client";

import { useAuth } from "@/lib/auth0-provider";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

#### 2. Protect a Route

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Your protected content */}
      </div>
    </ProtectedRoute>
  );
}
```

#### 3. Add Auth Navigation to Navbar

```tsx
import AuthNav from "@/components/AuthNav";

export default function Navbar() {
  return (
    <nav>
      <div>DevFoolYou</div>
      <AuthNav />
    </nav>
  );
}
```

#### 4. Make Authenticated API Calls

```tsx
"use client";

import { authAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth0-provider";

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      authAPI
        .getProfile()
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  return <div>{/* Display profile */}</div>;
}
```

### Backend: Protecting Routes

#### 1. Protect a Single Route

```python
from fastapi import APIRouter, Depends
from typing import Dict
from services.auth0 import get_current_user

router = APIRouter()

@router.get("/protected")
async def protected_route(user: Dict = Depends(get_current_user)):
    return {
        "message": "This is a protected route",
        "user_id": user.get("sub"),
        "email": user.get("email")
    }
```

#### 2. Optional Authentication

```python
from fastapi import APIRouter, Depends
from typing import Optional, Dict
from services.auth0 import get_current_user_optional

router = APIRouter()

@router.get("/optional-auth")
async def optional_route(user: Optional[Dict] = Depends(get_current_user_optional)):
    if user:
        return {
            "message": "Authenticated user",
            "user_id": user.get("sub")
        }
    return {"message": "Anonymous user"}
```

#### 3. Get User Information

```python
from fastapi import APIRouter, Depends
from typing import Dict
from services.auth0 import get_current_user

router = APIRouter()

@router.post("/create-project")
async def create_project(
    project_data: dict,
    user: Dict = Depends(get_current_user)
):
    # Access user information
    user_id = user.get("sub")  # Auth0 user ID
    email = user.get("email")

    # Create project with user association
    project = {
        **project_data,
        "owner_id": user_id,
        "owner_email": email
    }

    # Save to database...

    return {"project": project}
```

## Troubleshooting

### Issue: "Invalid token"

- Check that `AUTH0_DOMAIN`, `AUTH0_API_AUDIENCE`, and `AUTH0_ISSUER` are correct
- Ensure the token is being sent in the Authorization header
- Verify the API Audience matches what's configured in Auth0

### Issue: CORS errors

- Add your frontend URL to `CORS_ORIGINS` in backend `.env`
- Add your frontend URL to Allowed Origins in Auth0 Application settings

### Issue: "Unable to verify authentication"

- Check that the backend can reach `https://your-tenant.auth0.com/.well-known/jwks.json`
- Verify your internet connection

### Issue: Redirect not working

- Ensure `NEXT_PUBLIC_AUTH0_REDIRECT_URI` matches one of the Allowed Callback URLs in Auth0
- Check browser console for errors

## Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` as a template
2. **Use HTTPS in production** - Update all URLs to use `https://`
3. **Rotate secrets regularly** - Especially in production
4. **Enable MFA** - In Auth0 Dashboard → Security → Multi-factor Auth
5. **Set token expiration** - Configure in Auth0 API settings
6. **Use environment-specific tenants** - Separate Auth0 tenants for dev/staging/prod

## Additional Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [JWT.io](https://jwt.io) - Decode and inspect JWT tokens
