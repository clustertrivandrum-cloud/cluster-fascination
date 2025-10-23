# 🚨 URGENT: Deploy This CORS Fix NOW

## 🔴 Your Current Problem

Your website at **`https://www.clusterfascination.com`** cannot connect to your API at **`https://server.clusterfascination.com`**.

All these requests are failing with CORS errors:

- ❌ `/api/v1/user/getcarts`
- ❌ `/api/v1/auth/user`
- ❌ `/api/v1/user/getwishlist`
- ❌ `/api/v1/banners`
- ❌ `/api/v1/category`
- ❌ `/api/v1/products/productshome`
- ❌ `/api/v1/testimonials`
- ❌ `/api/v1/brands`

**Root cause:** Your backend only allows `https://clusterfascination.com` but your frontend is at `https://www.clusterfascination.com` (with `www.`).

---

## ✅ The Fix (Ready to Deploy)

### **What Changed:**

**File: `server/.env`**

```env
# OLD (only non-www)
CLIENT_URL=https://clusterfascination.com

# NEW (both www and non-www)
CLIENT_URL=https://www.clusterfascination.com
CLIENT_URL_NO_WWW=https://clusterfascination.com
```

**File: `server/app.js`**

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

## 🚀 Deploy in 3 Steps

### **Step 1: Update Your Code on AWS**

SSH into your AWS server and pull the latest code:

```bash
cd /path/to/your/server
git pull origin main
```

### **Step 2: Set Environment Variables**

**Option A: Using the deployment script (easiest)**

```bash
cd /path/to/your/server
./deploy-to-aws.sh
```

**Option B: Manual export (if script doesn't work)**

```bash
export NODE_ENV=production
export CLIENT_URL=https://www.clusterfascination.com
export CLIENT_URL_NO_WWW=https://clusterfascination.com
export ADMIN_URL=https://admin.clusterfascination.com

# Then restart server
pm2 restart all --update-env
pm2 save
```

**Option C: Update PM2 Ecosystem File**

Edit `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "cluster-fascination-api",
      script: "./server.js",
      env_production: {
        NODE_ENV: "production",
        CLIENT_URL: "https://www.clusterfascination.com",
        CLIENT_URL_NO_WWW: "https://clusterfascination.com",
        ADMIN_URL: "https://admin.clusterfascination.com",
        // ... other vars
      },
    },
  ],
};
```

Then:

```bash
pm2 delete all
pm2 start ecosystem.config.js --env production
pm2 save
```

### **Step 3: Verify It's Working**

**Test 1: Check CORS endpoint**

```bash
curl https://server.clusterfascination.com/api/cors-test
```

Should return:

```json
{
  "message": "CORS is working!",
  "allowedOrigins": [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://www.clusterfascination.com",
    "https://clusterfascination.com",
    "https://admin.clusterfascination.com"
  ]
}
```

**Test 2: Simulate browser request**

```bash
curl -H "Origin: https://www.clusterfascination.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     -v \
     https://server.clusterfascination.com/api/v1/banners
```

Should show:

```
Access-Control-Allow-Origin: https://www.clusterfascination.com
Access-Control-Allow-Credentials: true
```

**Test 3: Check in browser**

1. Open https://www.clusterfascination.com
2. Open browser console (F12)
3. Look for CORS errors ➜ **Should be NONE** ✅
4. Check that banners, products, categories load ➜ **Should all work** ✅

---

## 📊 Expected Server Logs

After restarting, you should see:

```
🔒 CORS Configuration:
Allowed Origins: [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://www.clusterfascination.com',
  'https://clusterfascination.com',
  'https://admin.clusterfascination.com'
]
Environment: production

📨 Incoming request from origin: https://www.clusterfascination.com
✅ Origin allowed: https://www.clusterfascination.com
GET /api/v1/banners 200 45.123 ms

📨 Incoming request from origin: https://www.clusterfascination.com
✅ Origin allowed: https://www.clusterfascination.com
GET /api/v1/category 200 32.456 ms
```

---

## 🆘 If It's Still Not Working

### **Problem: Environment variables not loading**

Check if they're set:

```bash
echo $CLIENT_URL
echo $CLIENT_URL_NO_WWW
```

If empty, they're not set. Re-export them or add to your PM2 config.

### **Problem: Server not restarting with new env**

Force restart:

```bash
pm2 kill
pm2 start server.js --update-env
pm2 save
```

### **Problem: Still getting CORS errors**

Check server logs:

```bash
pm2 logs --lines 100
```

Look for:

- ❌ `Origin blocked: https://www.clusterfascination.com` ← Env vars not loaded
- ✅ `Origin allowed: https://www.clusterfascination.com` ← Working correctly!

---

## 📝 Quick Checklist

- [ ] Pull latest code from Git
- [ ] Set `CLIENT_URL=https://www.clusterfascination.com` on AWS
- [ ] Set `CLIENT_URL_NO_WWW=https://clusterfascination.com` on AWS
- [ ] Set `ADMIN_URL=https://admin.clusterfascination.com` on AWS
- [ ] Set `NODE_ENV=production` on AWS
- [ ] Restart server with `--update-env` flag
- [ ] Test `/api/cors-test` endpoint
- [ ] Test with curl using Origin header
- [ ] Open website in browser - no CORS errors
- [ ] Verify all API calls work (banners, products, etc.)

---

## 🎯 Summary

**The issue:** Frontend uses `www.` but backend didn't allow it.

**The fix:** Backend now allows BOTH:

- ✅ `https://www.clusterfascination.com` (with www)
- ✅ `https://clusterfascination.com` (without www)

**To deploy:**

1. Pull code on AWS
2. Set environment variables
3. Restart server

**Result:** All CORS errors will be gone! 🎉

---

## 📞 Files to Reference

- **This guide**: `DEPLOY_NOW.md` ← You are here
- **WWW fix details**: `WWW_SUBDOMAIN_FIX.md`
- **Full CORS guide**: `CORS_FIX_DEPLOYMENT_GUIDE.md`
- **Deployment script**: `deploy-to-aws.sh`
- **Test script**: `test-cors.js`

---

**Deploy this fix NOW to restore your website!** 🚀
