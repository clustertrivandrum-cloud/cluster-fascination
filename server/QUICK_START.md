# 🚀 Quick Start - CORS Fix Deployment

## 📋 Pre-Deployment Checklist

1. ✅ Updated `server/app.js` with enhanced CORS configuration
2. ✅ Updated `server/.env` with production URLs
3. ✅ Created diagnostic endpoints for testing
4. ✅ Added trust proxy for AWS compatibility
5. ✅ Fixed Helmet CSP blocking issue

---

## ⚡ Deploy in 5 Steps

### **Step 1: Update .env on AWS**

SSH into your AWS instance and set:

```bash
export NODE_ENV=production
export CLIENT_URL=https://clusterfascination.onrender.com
export ADMIN_URL=https://admin.clusterfascination.com
```

Or add to your deployment configuration (Elastic Beanstalk, ECS, etc.)

### **Step 2: Verify Configuration**

```bash
cd /path/to/your/server
node test-cors.js
```

Should show: `✅ Configuration looks good!`

### **Step 3: Deploy Code**

```bash
# Pull latest code
git pull origin main

# Install dependencies (if needed)
npm install

# Restart server
pm2 restart all --update-env
# OR
npm start
```

### **Step 4: Test Endpoints**

```bash
# Test CORS
curl https://your-aws-backend.com/api/cors-test

# Test env vars
curl https://your-aws-backend.com/api/env-check
```

### **Step 5: Update Frontend**

**Client (.env):**

```env
VITE_BACKEND_URL=https://your-aws-backend.com
```

**Admin (.env):**

```env
REACT_APP_API_URL=https://your-aws-backend.com
```

Then redeploy your frontends on Render.

---

## 🎯 That's It!

Your CORS issue should now be resolved. Check server logs for:

```
🔒 CORS Configuration:
Allowed Origins: [...]
📨 Incoming request from origin: https://clusterfascination.onrender.com
✅ Origin allowed: https://clusterfascination.onrender.com
```

---

## 🆘 If Still Not Working

1. **Check server logs** for blocked origins
2. **Verify environment variables** are set on AWS
3. **Test with curl** from command line
4. **Check frontend is using correct backend URL**
5. **Ensure HTTPS is used everywhere** (no mixed content)

See `FINAL_CORS_CONFIGURATION.md` for detailed troubleshooting.

---

## 📞 Support

- Full guide: `CORS_FIX_DEPLOYMENT_GUIDE.md`
- Configuration: `FINAL_CORS_CONFIGURATION.md`
- Nginx config: `nginx-cors-config.conf`
- Test script: `test-cors.js`
