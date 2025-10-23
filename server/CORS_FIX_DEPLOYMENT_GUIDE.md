# 🔒 CORS Fix - AWS Backend + Render Frontend

## ✅ Issues Fixed

1. **Trailing slash mismatch** - Removed trailing slashes from URLs in .env
2. **Missing environment variables** - Added CLIENT_URL and ADMIN_URL
3. **Helmet CSP blocking CORS** - Disabled CSP for API endpoints
4. **No origin logging** - Added diagnostic logging for debugging
5. **Missing trust proxy** - Added for AWS/Nginx deployments
6. **No preflight caching** - Added maxAge for OPTIONS requests
7. **Missing exposed headers** - Added for cookie/auth support

---

## 📋 Changes Made

### 1. **Updated `.env` File**

Added missing CORS origins (NO trailing slashes):

```env
# CORS Origins - Frontend URLs (NO trailing slashes)
CLIENT_PORT_LOCAL=http://localhost:5173
ADMIN_PORT_LOCAL=http://localhost:3000
CLIENT_URL=https://clusterfascination.onrender.com
ADMIN_URL=https://admin.clusterfascination.com
NODE_ENV=production  # Set to 'production' on AWS
```

### 2. **Enhanced `app.js` with Production-Safe CORS**

Key improvements:

- ✅ Dynamic origin validation with logging
- ✅ Trust proxy for AWS/Nginx
- ✅ Preflight caching (24 hours)
- ✅ Diagnostic endpoints for testing
- ✅ Helmet configured for API use
- ✅ Proper error messages for blocked origins

### 3. **Created `nginx-cors-config.conf`**

Optional Nginx configuration if you use Nginx/Load Balancer on AWS.

---

## 🚀 Deployment Steps

### **Step 1: Update Environment Variables on AWS**

On your AWS instance (EC2, Elastic Beanstalk, etc.), set these environment variables:

```bash
export NODE_ENV=production
export CLIENT_URL=https://clusterfascination.onrender.com
export ADMIN_URL=https://admin.clusterfascination.com
export CLIENT_PORT_LOCAL=http://localhost:5173
export ADMIN_PORT_LOCAL=http://localhost:3000
```

**For AWS Elastic Beanstalk:**

- Go to Configuration → Software → Environment Properties
- Add each variable

**For AWS EC2 with PM2:**

```bash
pm2 start server.js --update-env
pm2 save
```

**For Docker:**
Add to your `docker-compose.yml` or Dockerfile `ENV` statements.

---

### **Step 2: Verify .env File is Loaded**

Test that environment variables are loaded correctly:

```bash
# Make a request to the diagnostic endpoint
curl https://your-aws-backend.com/api/env-check
```

Expected response:

```json
{
  "message": "Environment variables loaded",
  "hasClientUrl": true,
  "hasAdminUrl": true,
  "nodeEnv": "production",
  "allowedOriginsCount": 4
}
```

---

### **Step 3: Test CORS from Frontend**

From your Render frontend, make a test request:

```javascript
// In your frontend (client or admin)
fetch("https://your-aws-backend.com/api/cors-test", {
  method: "GET",
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => console.log("CORS Test:", data))
  .catch((err) => console.error("CORS Error:", err));
```

Expected response:

```json
{
  "message": "CORS is working!",
  "origin": "https://clusterfascination.onrender.com",
  "allowedOrigins": [...],
  "timestamp": "2025-10-23T...",
  "environment": "production"
}
```

---

### **Step 4: Check Server Logs**

Your server will now log CORS requests:

```
🔒 CORS Configuration:
Allowed Origins: [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://clusterfascination.onrender.com',
  'https://admin.clusterfascination.com'
]
Environment: production

📨 Incoming request from origin: https://clusterfascination.onrender.com
✅ Origin allowed: https://clusterfascination.onrender.com
```

If you see `❌ Origin blocked`, the origin is not in your allowed list.

---

## 🔧 If Using Nginx on AWS

### **Option A: Let Express Handle CORS (Recommended)**

Use the simpler Nginx config in `nginx-cors-config.conf` (bottom section):

```nginx
server {
    listen 80;
    server_name your-backend-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### **Option B: Handle CORS in Nginx**

Use the full config in `nginx-cors-config.conf` (top section).

**Important:** Update the `map $http_origin` with your actual domains.

Then reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🐛 Troubleshooting

### **Problem: Still getting CORS errors**

1. **Check origin spelling:**

   ```bash
   # From your frontend, log the exact origin
   console.log('Frontend origin:', window.location.origin);
   ```

2. **Verify backend sees correct origin:**

   - Check server logs for `📨 Incoming request from origin:`
   - Compare with allowed origins

3. **Check for HTTPS/HTTP mismatch:**

   - Frontend: `https://clusterfascination.onrender.com` ✅
   - Backend: `http://your-backend.com` ❌ (should be HTTPS)

4. **Verify environment variables:**

   ```bash
   # On AWS, check env vars are set
   echo $CLIENT_URL
   echo $ADMIN_URL
   ```

5. **Check for trailing slashes:**
   - ❌ `https://clusterfascination.onrender.com/`
   - ✅ `https://clusterfascination.onrender.com`

### **Problem: Preflight (OPTIONS) requests failing**

- Check Nginx is not blocking OPTIONS
- Verify `app.options('*', cors(corsOptions))` is in code
- Check firewall allows OPTIONS method

### **Problem: Cookies not being sent**

- Ensure `credentials: true` in both frontend and backend
- Use `withCredentials: true` in Axios/Fetch
- Backend must use `credentials: true` in CORS options

---

## 📦 Frontend Configuration

Update your frontend environment variables:

**Client (Vite) - `client/.env`:**

```env
VITE_BACKEND_URL=https://your-aws-backend.com
```

**Admin (React) - `admin/.env`:**

```env
REACT_APP_API_URL=https://your-aws-backend.com
```

### **Axios Configuration**

Ensure your Axios instance uses `withCredentials`:

```javascript
// client/src/axios.js or admin/src/utils/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_API_URL,
  withCredentials: true, // ← Important for CORS with credentials
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
```

---

## 🔐 Security Best Practices

1. **Never use `origin: '*'` with `credentials: true`** - This is forbidden by browsers
2. **Remove diagnostic endpoints in production** - Or add authentication
3. **Use HTTPS everywhere** - Mixed content (HTTP/HTTPS) will fail
4. **Validate origins strictly** - Don't accept wildcards like `*.onrender.com`
5. **Set maxAge for preflight** - Reduces OPTIONS requests
6. **Use environment variables** - Never hardcode URLs

---

## 📊 Testing Checklist

- [ ] Environment variables loaded on AWS (`/api/env-check`)
- [ ] CORS test passes (`/api/cors-test`)
- [ ] Server logs show allowed origins on startup
- [ ] Frontend can make GET requests
- [ ] Frontend can make POST requests
- [ ] Cookies/Auth headers are sent and received
- [ ] No CORS errors in browser console
- [ ] Preflight OPTIONS requests succeed
- [ ] Both client and admin can connect
- [ ] Local development still works

---

## 🆘 Quick Fix Commands

**Restart server with environment variables:**

```bash
NODE_ENV=production CLIENT_URL=https://clusterfascination.onrender.com ADMIN_URL=https://admin.clusterfascination.com npm start
```

**Check what origin browser is sending:**

```javascript
// In browser console on frontend
console.log("Origin:", window.location.origin);
```

**Test CORS with curl:**

```bash
curl -H "Origin: https://clusterfascination.onrender.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     -v \
     https://your-aws-backend.com/api/cors-test
```

---

## 📝 Next Steps

1. Deploy updated code to AWS
2. Set environment variables on AWS
3. Restart your Node.js application
4. Update frontend .env files with AWS backend URL
5. Redeploy frontend to Render
6. Test with diagnostic endpoints
7. Remove diagnostic endpoints (optional) after confirming it works

---

## 💡 Why This Fix Works

1. **Trust proxy** - Allows Express to see real client IP behind AWS load balancers
2. **Dynamic origin validation** - Checks each request against allowed list
3. **Logging** - Helps debug issues immediately
4. **Helmet disabled CSP** - CSP was blocking CORS headers
5. **Explicit OPTIONS handler** - Handles preflight requests properly
6. **maxAge** - Caches preflight for 24h, reducing OPTIONS spam
7. **No trailing slashes** - Origin matching is exact, slashes matter

---

## 🎯 Summary

Your backend is now fully configured for production CORS with AWS + Render:

- ✅ Secure origin validation
- ✅ Diagnostic logging
- ✅ AWS/Nginx compatible
- ✅ Cookie/credentials support
- ✅ Preflight optimization
- ✅ Easy debugging

The CORS errors should be completely resolved! 🎉
