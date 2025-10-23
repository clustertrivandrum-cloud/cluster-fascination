#!/bin/bash

# ============================================================
# Deploy CORS Fix to AWS
# ============================================================
# This script sets environment variables and restarts the server
# Run this on your AWS EC2 instance
# ============================================================

echo "🚀 Deploying CORS fix to AWS..."
echo ""

# Set environment variables
echo "📝 Setting environment variables..."

export NODE_ENV=production
export CLIENT_URL=https://www.clusterfascination.com
export CLIENT_URL_NO_WWW=https://clusterfascination.com
export ADMIN_URL=https://admin.clusterfascination.com
export CLIENT_PORT_LOCAL=http://localhost:5173
export ADMIN_PORT_LOCAL=http://localhost:3000

# Keep existing MongoDB and JWT settings
# export MONGO_URL_PROD=your_mongodb_url
# export JWT_ACCESS_SECRET=your_secret
# export JWT_REFRESH_SECRET=your_refresh_secret

echo "✅ Environment variables set"
echo ""

# Verify environment variables
echo "🔍 Verifying configuration..."
echo "NODE_ENV: $NODE_ENV"
echo "CLIENT_URL: $CLIENT_URL"
echo "CLIENT_URL_NO_WWW: $CLIENT_URL_NO_WWW"
echo "ADMIN_URL: $ADMIN_URL"
echo ""

# Run test
echo "🧪 Running CORS configuration test..."
node test-cors.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Configuration test passed!"
    echo ""
    
    # Restart server
    echo "🔄 Restarting server..."
    
    # Option 1: PM2 (most common)
    if command -v pm2 &> /dev/null; then
        echo "Using PM2..."
        pm2 restart all --update-env
        pm2 save
        echo "✅ Server restarted with PM2"
    
    # Option 2: systemd
    elif systemctl is-active --quiet cluster-fascination; then
        echo "Using systemd..."
        sudo systemctl restart cluster-fascination
        echo "✅ Server restarted with systemd"
    
    # Option 3: Docker Compose
    elif command -v docker-compose &> /dev/null && [ -f "docker-compose.yml" ]; then
        echo "Using Docker Compose..."
        docker-compose restart
        echo "✅ Server restarted with Docker Compose"
    
    else
        echo "⚠️  Could not detect process manager"
        echo "Please restart your server manually:"
        echo "  pm2 restart all --update-env"
        echo "  OR"
        echo "  sudo systemctl restart your-service-name"
        echo "  OR"
        echo "  npm start"
    fi
    
    echo ""
    echo "🎉 Deployment complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Test CORS endpoint:"
    echo "   curl https://server.clusterfascination.com/api/cors-test"
    echo ""
    echo "2. Test from frontend:"
    echo "   Open https://www.clusterfascination.com in browser"
    echo "   Check browser console for CORS errors (should be none)"
    echo ""
    echo "3. Verify in server logs:"
    echo "   pm2 logs"
    echo "   (Look for: ✅ Origin allowed: https://www.clusterfascination.com)"
    echo ""
    
else
    echo ""
    echo "❌ Configuration test failed!"
    echo "Please check your .env file and try again"
    exit 1
fi
