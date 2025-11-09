#!/bin/bash

# Auth0 Setup Script for DevFoolYou
# This script helps you set up Auth0 authentication

echo "=========================================="
echo "  Auth0 Setup for DevFoolYou"
echo "=========================================="
echo ""

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env from .env.example..."
    cp backend/.env.example backend/.env
    echo "✓ Created backend/.env"
else
    echo "✓ backend/.env already exists"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend/.env.local from .env.example..."
    cp frontend/.env.example frontend/.env.local
    echo "✓ Created frontend/.env.local"
else
    echo "✓ frontend/.env.local already exists"
fi

echo ""
echo "=========================================="
echo "  Next Steps:"
echo "=========================================="
echo ""
echo "1. Create an Auth0 account at https://auth0.com"
echo ""
echo "2. Create a Single Page Application in Auth0:"
echo "   - Go to Applications → Applications → Create Application"
echo "   - Choose 'Single Page Web Applications'"
echo "   - Configure:"
echo "     * Allowed Callback URLs: http://localhost:3000"
echo "     * Allowed Logout URLs: http://localhost:3000"
echo "     * Allowed Web Origins: http://localhost:3000"
echo ""
echo "3. Create an API in Auth0:"
echo "   - Go to Applications → APIs → Create API"
echo "   - Set an identifier (e.g., https://api.devfoolyou.com)"
echo "   - Use RS256 signing algorithm"
echo ""
echo "4. Update backend/.env with your Auth0 credentials:"
echo "   - AUTH0_DOMAIN=your-tenant.auth0.com"
echo "   - AUTH0_API_AUDIENCE=your-api-identifier"
echo "   - AUTH0_ISSUER=https://your-tenant.auth0.com/"
echo ""
echo "5. Update frontend/.env.local with your Auth0 credentials:"
echo "   - NEXT_PUBLIC_AUTH0_DOMAIN=your-tenant.auth0.com"
echo "   - NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id"
echo "   - NEXT_PUBLIC_AUTH0_AUDIENCE=your-api-identifier"
echo ""
echo "6. Install dependencies:"
echo "   Backend:  cd backend && pip install -r requirements.txt"
echo "   Frontend: cd frontend && npm install"
echo ""
echo "7. Start the servers:"
echo "   Backend:  cd backend && python main.py"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "For detailed instructions, see docs/AUTH0_SETUP.md"
echo ""
