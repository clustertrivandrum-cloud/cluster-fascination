# 🌐 WWW Subdomain CORS Fix

## 🔴 The Problem

Your frontend is deployed at **`https://www.clusterfascination.com`** (with `www.`), but your backend CORS was only allowing **`https://clusterfascination.com`** (without `www.`).

**Browsers treat these as DIFFERENT origins:**

- ❌ `https://clusterfascination.com`
- ❌ `https://www.clusterfascination.com`

This caused all API requests to be blocked with:

```
Access to XMLHttpRequest at 'https://server.clusterfascination.com/api/v1/...'
from origin 'https://www.clusterfascination.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

---

## ✅ The Solution

Updated your backend `.env` to allow **BOTH** versions:

```env
# Support BOTH www and non-www versions
CLIENT_URL=https://www.clusterfascination.com
CLIENT_URL_NO_WWW=https://clusterfascination.com
ADMIN_URL=https://admin.clusterfascination.com
```

And updated `app.js` to include both:

```javascript
const allowedOrigins = [
  process.env.CLIENT_PORT_LOCAL,
  process.env.ADMIN_PORT_LOCAL,
  process.env.CLIENT_URL, // https://www.clusterfascination.com
  process.env.CLIENT_URL_NO_WWW, // https://clusterfascination.com
  process.env.ADMIN_URL,
].filter(Boolean);
```

---

## 🚀 Deploy This Fix

### **On AWS (Your Backend Server):**

1. **Update environment variables:**

   ```bash
   export CLIENT_URL=https://www.clusterfascination.com
   export CLIENT_URL_NO_WWW=https://clusterfascination.com
   export ADMIN_URL=https://admin.clusterfascination.com
   export NODE_ENV=production
   ```

2. **Restart your server:**

   ```bash
   # If using PM2
   pm2 restart all --update-env
   pm2 save

   # If using systemd
   sudo systemctl restart your-app-name

   # If running directly
   npm start
   ```

3. **Verify the fix:**

   ```bash
   # Check environment variables are loaded
   curl https://server.clusterfascination.com/api/env-check

   # Test CORS from www subdomain
   curl -H "Origin: https://www.clusterfascination.com" \
        -H "Access-Control-Request-Method: GET" \
        -X OPTIONS \
        https://server.clusterfascination.com/api/cors-test
   ```

   Should return:

   ```
   Access-Control-Allow-Origin: https://www.clusterfascination.com
   ```

---

## 🔍 How to Check Which URL Your Frontend Uses

### **Method 1: Browser Console**

On your frontend, open browser console and run:

```javascript
console.log("My origin:", window.location.origin);
```

### **Method 2: Check Server Logs**

Your backend now logs every request origin:

```
📨 Incoming request from origin: https://www.clusterfascination.com
✅ Origin allowed: https://www.clusterfascination.com
```

---

## 📝 Best Practice: Use URL Redirects

You should set up a redirect so all users go to ONE version (either www or non-www).

### **Option A: Redirect www → non-www**

In your Netlify settings (or DNS provider):

```
# Redirect www to non-www
https://www.clusterfascination.com/* → https://clusterfascination.com/:splat 301
```

Then you only need:

```env
CLIENT_URL=https://clusterfascination.com
```

### **Option B: Redirect non-www → www** (Current Setup)

In your Netlify settings:

```
# Redirect non-www to www
https://clusterfascination.com/* → https://www.clusterfascination.com/:splat 301
```

Then you only need:

```env
CLIENT_URL=https://www.clusterfascination.com
```

**For now, your backend supports BOTH**, so it will work regardless of which users visit.

---

## 🎯 Summary

### **What was wrong:**

- Frontend: `https://www.clusterfascination.com` ✅
- Backend allowed: `https://clusterfascination.com` ❌
- **Mismatch!** Browsers blocked the requests

### **What we fixed:**

- Backend now allows:
  - `https://www.clusterfascination.com` ✅
  - `https://clusterfascination.com` ✅
  - Both work!

### **Current Allowed Origins:**

1. `http://localhost:5173` (local dev - client)
2. `http://localhost:3000` (local dev - admin)
3. `https://www.clusterfascination.com` (production - client with www)
4. `https://clusterfascination.com` (production - client without www)
5. `https://admin.clusterfascination.com` (production - admin)

---

## ✅ Verification Checklist

After deploying:

- [ ] Environment variables set on AWS
- [ ] Server restarted with new env vars
- [ ] `/api/env-check` returns success
- [ ] `/api/cors-test` returns allowed origins
- [ ] Frontend at `www.clusterfascination.com` works
- [ ] No CORS errors in browser console
- [ ] All API calls succeed (banners, products, cart, etc.)

---

## 🆘 If Still Not Working

1. **Check server logs** - they will show the exact origin being blocked
2. **Verify env vars on AWS:**
   ```bash
   echo $CLIENT_URL
   echo $CLIENT_URL_NO_WWW
   ```
3. **Test with curl:**
   ```bash
   curl -H "Origin: https://www.clusterfascination.com" \
        https://server.clusterfascination.com/api/v1/banners
   ```
4. **Clear browser cache** - old CORS errors might be cached

---

## 📚 Related Documentation

- Main CORS fix: `CORS_FIX_DEPLOYMENT_GUIDE.md`
- Configuration summary: `FINAL_CORS_CONFIGURATION.md`
- Quick deployment: `QUICK_START.md`

---

**Your CORS issue is now fixed!** 🎉

Just deploy the updated environment variables to AWS and restart your server.
