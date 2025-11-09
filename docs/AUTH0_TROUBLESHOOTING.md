# 🔧 Auth0 Login Issue - Troubleshooting Guide

## Problem

After clicking login, you're redirected back to the home page without being logged in.

## Root Cause

The original implementation was using a manual authorization code flow which doesn't work for Single Page Applications (SPAs) without PKCE (Proof Key for Code Exchange).

## Solution Applied

✅ Updated to use the official `@auth0/auth0-react` SDK which handles PKCE automatically.

## Steps to Fix

### 1. Update Auth0 Application Settings

Go to your Auth0 Dashboard → Applications → Your Application

**Update these URLs:**

#### Allowed Callback URLs

```
http://localhost:3000
```

#### Allowed Logout URLs

```
http://localhost:3000
```

#### Allowed Web Origins

```
http://localhost:3000
```

#### Allowed Origins (CORS)

```
http://localhost:3000
```

**IMPORTANT:** Make sure there are NO trailing slashes and NO extra paths!

### 2. Verify Application Type

- Application Type: **Single Page Application**
- Token Endpoint Authentication Method: **None** (not "Post" or "Basic")

### 3. Check Your .env.local

Your current configuration:

```bash
NEXT_PUBLIC_AUTH0_DOMAIN=dev-45c45mpkbde4sy1b.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=XYahrz2Y7JBc8741L5haK1rAtD0GHQmE
NEXT_PUBLIC_AUTH0_AUDIENCE=https://your-api-identifier  # ⚠️ UPDATE THIS!
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
```

**You need to update `NEXT_PUBLIC_AUTH0_AUDIENCE`:**

- Go to Auth0 Dashboard → Applications → APIs
- Find or create your API
- Copy the "Identifier" (e.g., `https://api.devfoolyou.com`)
- Update the `.env.local` file

### 4. Restart Your Development Server

After making changes:

```bash
# Stop the server (Ctrl+C)
cd frontend
npm run dev
```

### 5. Clear Browser Storage

1. Open DevTools (F12)
2. Go to Application tab
3. Clear:
   - Local Storage
   - Session Storage
   - Cookies for localhost

### 6. Test the Login Flow

1. Click "Log In"
2. You should be redirected to Auth0
3. After login, you should be redirected back to `/dashboard` (or wherever you were)
4. Your profile should appear in the navbar

## How to Verify It's Working

### Check Browser Console

You should NOT see:

- ❌ CORS errors
- ❌ "Failed to exchange code for token"
- ❌ 401 Unauthorized errors

### Check Network Tab

1. Open DevTools → Network tab
2. Click "Log In"
3. You should see:
   - ✅ Redirect to `dev-45c45mpkbde4sy1b.us.auth0.com/authorize`
   - ✅ Redirect back to `localhost:3000` with `code` and `state` parameters
   - ✅ Request to Auth0 token endpoint (handled by SDK)
   - ✅ Request to Auth0 userinfo endpoint

### Check Local Storage

After successful login, you should see in Local Storage:

- `@@auth0spajs@@::CLIENT_ID::AUDIENCE::openid profile email`

## Common Issues

### Issue 1: "Callback URL mismatch"

**Solution:** Make sure Auth0 Allowed Callback URLs exactly matches `http://localhost:3000`

### Issue 2: "Invalid state"

**Solution:** Clear browser storage and try again

### Issue 3: Still redirecting to home

**Solution:**

1. Check that `NEXT_PUBLIC_AUTH0_AUDIENCE` is set correctly
2. Verify the API exists in Auth0 Dashboard
3. Make sure Application Type is "Single Page Application"

### Issue 4: CORS errors

**Solution:** Add `http://localhost:3000` to Allowed Web Origins in Auth0

## Updated Code Changes

The following files were updated:

1. **`frontend/lib/auth0-provider.tsx`** - Now uses official Auth0 React SDK
2. **`frontend/components/LoginButton.tsx`** - Passes appState for redirect
3. **`frontend/components/UserProfile.tsx`** - Uses proper logout method

## API Audience Setup

If you haven't created an API in Auth0 yet:

1. Go to Auth0 Dashboard → Applications → APIs
2. Click "Create API"
3. Name: `DevFoolYou API`
4. Identifier: `https://api.devfoolyou.com` (can be any URL, doesn't need to be real)
5. Signing Algorithm: `RS256`
6. Click "Create"
7. Copy the Identifier
8. Update `NEXT_PUBLIC_AUTH0_AUDIENCE` in `.env.local`

## Testing Checklist

- [ ] Auth0 Application is "Single Page Application" type
- [ ] Allowed Callback URLs includes `http://localhost:3000`
- [ ] Allowed Logout URLs includes `http://localhost:3000`
- [ ] Allowed Web Origins includes `http://localhost:3000`
- [ ] Created an API in Auth0 Dashboard
- [ ] Updated `NEXT_PUBLIC_AUTH0_AUDIENCE` in `.env.local`
- [ ] Restarted development server
- [ ] Cleared browser storage
- [ ] Tested login flow

## Expected Behavior

✅ **After successful login:**

- User is redirected back to the app
- User profile appears in navbar
- Can access protected routes
- Token is stored in local storage
- Can make authenticated API calls

## Need More Help?

If issues persist:

1. Check Auth0 Dashboard → Monitoring → Logs for error details
2. Check browser console for detailed error messages
3. Verify all environment variables are correct
4. Try in incognito/private browsing mode

---

**Once all steps are completed, the Auth0 login should work correctly! 🚀**
