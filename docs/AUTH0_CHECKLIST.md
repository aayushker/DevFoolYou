# 📋 Auth0 Setup Checklist

Use this checklist to ensure you've completed all steps for Auth0 integration.

## ✅ Backend Setup

### 1. Environment Configuration

- [ ] Copy `backend/.env.example` to `backend/.env`
- [ ] Update `AUTH0_DOMAIN` in `backend/.env`
- [ ] Update `AUTH0_API_AUDIENCE` in `backend/.env`
- [ ] Update `AUTH0_ISSUER` in `backend/.env`
- [ ] Verify `MONGODB_URL` is correct
- [ ] Verify `CORS_ORIGINS` includes your frontend URL

### 2. Dependencies Installation

- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment: `source venv/bin/activate`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Verify `authlib` is installed
- [ ] Verify `httpx` is installed

### 3. Testing

- [ ] Start backend: `python main.py`
- [ ] Verify server starts on port 8080
- [ ] Visit http://localhost:8080/docs
- [ ] Check `/api/auth/config` endpoint works

## ✅ Frontend Setup

### 1. Environment Configuration

- [ ] Copy `frontend/.env.example` to `frontend/.env.local`
- [ ] Update `NEXT_PUBLIC_AUTH0_DOMAIN` in `frontend/.env.local`
- [ ] Update `NEXT_PUBLIC_AUTH0_CLIENT_ID` in `frontend/.env.local`
- [ ] Update `NEXT_PUBLIC_AUTH0_AUDIENCE` in `frontend/.env.local`
- [ ] Verify `NEXT_PUBLIC_API_URL` points to backend

### 2. Dependencies Installation

- [ ] Install dependencies: `npm install --legacy-peer-deps`
- [ ] Verify `@auth0/auth0-react` is installed
- [ ] Check `package.json` for Auth0 package

### 3. Testing

- [ ] Start frontend: `npm run dev`
- [ ] Verify server starts on port 3000
- [ ] Visit http://localhost:3000
- [ ] Check "Log In" button appears in navbar

## ✅ Auth0 Dashboard Setup

### 1. Create Auth0 Account

- [ ] Sign up at https://auth0.com
- [ ] Create a new tenant
- [ ] Note your tenant name (e.g., `your-tenant`)

### 2. Create Single Page Application

- [ ] Go to Applications → Applications
- [ ] Click "Create Application"
- [ ] Name: "DevFoolYou Frontend"
- [ ] Type: "Single Page Web Applications"
- [ ] Click "Create"

### 3. Configure Application Settings

- [ ] Add to **Allowed Callback URLs**: `http://localhost:3000`
- [ ] Add to **Allowed Logout URLs**: `http://localhost:3000`
- [ ] Add to **Allowed Web Origins**: `http://localhost:3000`
- [ ] Add to **Allowed Origins (CORS)**: `http://localhost:3000`
- [ ] Click "Save Changes"
- [ ] Copy **Domain** (e.g., `your-tenant.auth0.com`)
- [ ] Copy **Client ID**

### 4. Create API

- [ ] Go to Applications → APIs
- [ ] Click "Create API"
- [ ] Name: "DevFoolYou API"
- [ ] Identifier: `https://api.devfoolyou.com` (or your choice)
- [ ] Signing Algorithm: "RS256"
- [ ] Click "Create"
- [ ] Copy **API Identifier** (Audience)

### 5. Configure API Settings (Optional)

- [ ] Enable RBAC if needed
- [ ] Set token expiration
- [ ] Configure permissions/scopes

## ✅ Integration Testing

### 1. Basic Authentication Flow

- [ ] Open http://localhost:3000
- [ ] Click "Log In" button
- [ ] Redirects to Auth0 login page
- [ ] Complete login (create account or use existing)
- [ ] Redirects back to your app
- [ ] User profile appears in navbar

### 2. Token Verification

- [ ] Open browser DevTools
- [ ] Go to Application → Local Storage
- [ ] Verify `auth0_token` exists
- [ ] Verify `auth0_user` exists

### 3. API Authentication

- [ ] Open browser DevTools → Network tab
- [ ] Make an API call from frontend
- [ ] Check request headers for `Authorization: Bearer <token>`
- [ ] Verify API responds successfully

### 4. Protected Routes

- [ ] Visit a protected page
- [ ] Verify you can access when logged in
- [ ] Log out
- [ ] Verify you're redirected when not logged in

## ✅ Production Readiness (Optional)

### 1. Auth0 Production Tenant

- [ ] Create separate Auth0 tenant for production
- [ ] Configure production URLs
- [ ] Set up custom domain (optional)

### 2. Environment Variables

- [ ] Create production `.env` files
- [ ] Use production Auth0 credentials
- [ ] Enable HTTPS URLs only
- [ ] Set secure CORS origins

### 3. Security

- [ ] Enable MFA in Auth0
- [ ] Configure password policies
- [ ] Set up brute force protection
- [ ] Review Auth0 security checklist

### 4. Monitoring

- [ ] Set up Auth0 logs
- [ ] Configure alerts
- [ ] Monitor authentication metrics

## 🎯 Quick Reference

### Backend URLs

- **API Docs**: http://localhost:8080/docs
- **Health Check**: http://localhost:8080/health
- **Auth Config**: http://localhost:8080/api/auth/config
- **User Profile**: http://localhost:8080/api/auth/me (requires auth)

### Frontend URLs

- **Home**: http://localhost:3000
- **Check**: http://localhost:3000/check

### Auth0 Dashboard

- **Dashboard**: https://manage.auth0.com
- **Applications**: https://manage.auth0.com/dashboard/us/{tenant}/applications
- **APIs**: https://manage.auth0.com/dashboard/us/{tenant}/apis
- **Users**: https://manage.auth0.com/dashboard/us/{tenant}/users

## 📝 Configuration Values

| Variable   | Backend (.env)       | Frontend (.env.local)         |
| ---------- | -------------------- | ----------------------------- |
| Domain     | `AUTH0_DOMAIN`       | `NEXT_PUBLIC_AUTH0_DOMAIN`    |
| Client ID  | -                    | `NEXT_PUBLIC_AUTH0_CLIENT_ID` |
| Audience   | `AUTH0_API_AUDIENCE` | `NEXT_PUBLIC_AUTH0_AUDIENCE`  |
| Issuer     | `AUTH0_ISSUER`       | -                             |
| Algorithms | `AUTH0_ALGORITHMS`   | -                             |

## ✨ Success Criteria

You've successfully integrated Auth0 when:

✅ Users can log in via Auth0
✅ User profile appears in navbar after login
✅ Protected routes work correctly
✅ API calls include authentication token
✅ Backend verifies tokens successfully
✅ Logout functionality works
✅ No console errors

## 🆘 Common Issues

### Issue: "externally-managed-environment"

**Solution**: Create and activate a Python virtual environment

### Issue: npm install errors

**Solution**: Use `npm install --legacy-peer-deps`

### Issue: "Invalid token"

**Solution**: Check Auth0 configuration matches in both frontend and backend

### Issue: CORS errors

**Solution**: Add frontend URL to backend `CORS_ORIGINS` and Auth0 Allowed Origins

### Issue: Redirect not working

**Solution**: Verify redirect URI in Auth0 matches `NEXT_PUBLIC_AUTH0_REDIRECT_URI`

## 📚 Documentation Links

- **Setup Guide**: `docs/AUTH0_SETUP.md`
- **Implementation Summary**: `docs/AUTH0_INTEGRATION_SUMMARY.md`
- **Main README**: `AUTH0_README.md`
- **Auth0 Docs**: https://auth0.com/docs

---

**Once all items are checked, your Auth0 integration is complete! 🎉**
