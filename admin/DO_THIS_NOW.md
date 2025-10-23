# ⚡ FIX 502 ERROR NOW - 3 SIMPLE STEPS

## 🎯 Your admin site shows "502 Bad Gateway"?

### Do these 3 things RIGHT NOW:

---

## Step 1: Open Render

**URL**: https://dashboard.render.com  
**Action**: Click on your admin service

---

## Step 2: Add Environment Variable

1. Click **"Environment"** tab (left side)
2. Click **"Add Environment Variable"** button
3. Fill in:

```
Key:   REACT_APP_API_URL
Value: https://www.clusterfascination.com
```

⚠️ **IMPORTANT**: No slash at the end!

4. Click **"Save Changes"**

---

## Step 3: Deploy

1. Click **"Manual Deploy"** (top right corner)
2. Click **"Deploy latest commit"**
3. Wait 3-5 minutes
4. Visit your admin site again

---

## ✅ Done!

Your site should now load instead of showing 502 error.

---

## 🆘 Still not working?

**Check if you're using Web Service instead of Static Site:**

If the service type shows "Web Service":

1. Go to **Settings** → **Build & Deploy**
2. Change **Start Command** to:

```
serve -s build -p $PORT
```

3. Change **Build Command** to:

```
npm install && npm run build && npm install -g serve
```

4. Save and deploy again

---

## 📞 More Help?

- Full guide: [`FIX_502_ERROR.md`](./FIX_502_ERROR.md)
- Visual guide: [`502_TROUBLESHOOTING.md`](./502_TROUBLESHOOTING.md)
- Complete docs: [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)

---

**That's it! 3 steps to fix your 502 error. 🚀**
