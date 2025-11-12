# 🔑 Setup Razorpay Credentials - Required!

## ⚠️ Server is Running but Razorpay is NOT Configured

Your server is now running successfully, but **online payments will not work** until you add valid Razorpay credentials.

---

## 🚀 Quick Setup (3 Minutes)

### Step 1: Create Razorpay Account (1 minute)

1. Go to **https://razorpay.com**
2. Click "Sign Up" (or "Login" if you have an account)
3. Complete the registration

### Step 2: Get Your Test Keys (1 minute)

1. Login to Razorpay Dashboard
2. Click on **Settings** (left sidebar)
3. Click on **API Keys**
4. Under **Test Mode**, click **Generate Test Keys** button
5. You'll see two keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click "Show" to reveal)
6. **Copy both keys**

### Step 3: Update `.env` File (1 minute)

1. Open `/server/.env` file in your editor
2. Find these lines (around line 26-27):

   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret_key_here
   ```

3. Replace with your actual credentials:

   ```env
   RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
   RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_KEY_HERE
   ```

4. **Save the file**

### Step 4: Restart Server

The server will automatically restart (if using nodemon), or restart manually:

```bash
# Ctrl+C to stop server, then:
npm start
```

### Step 5: Verify

You should see this message in the terminal:

```
✅ Razorpay initialized successfully
```

Instead of:

```
⚠️  Razorpay credentials not configured
```

---

## ✅ Test Payment

Once configured, test with these credentials:

**Test Card:**

- Card Number: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: `12/25`
- Name: `Test User`

**Test UPI:**

- UPI ID: `success@razorpay`

---

## 🔒 Security Notes

1. **NEVER commit `.env` file to Git** (it's already in `.gitignore`)
2. **Use TEST keys for development** (starts with `rzp_test_`)
3. **Use LIVE keys only in production** (starts with `rzp_live_`)
4. **Keep your keys secret** - don't share publicly

---

## 📊 Monitor Payments

View all transactions in Razorpay Dashboard:

- **Test Mode:** https://dashboard.razorpay.com/app/dashboard
- Switch to "Test Mode" using toggle in top-left

---

## 🆘 Troubleshooting

### Issue: Still showing "not configured" after adding keys

**Solution:**

1. Check for extra spaces in `.env` file
2. Make sure no quotes around the values
3. Restart the server completely
4. Check the keys are copied correctly (no truncation)

### Issue: Keys are correct but payments fail

**Solution:**

1. Verify you're using TEST mode keys
2. Check Razorpay Dashboard for any account issues
3. Ensure internet connection is stable
4. Check browser console for errors

### Issue: "Invalid API Key" error

**Solution:**

1. Regenerate keys in Razorpay Dashboard
2. Make sure using TEST keys (not LIVE)
3. Verify account is active

---

## 📚 Resources

- **Razorpay Documentation:** https://razorpay.com/docs/
- **API Keys Guide:** https://razorpay.com/docs/dashboard/access-and-roles/api-keys/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/

---

## 🎯 Current Status

**Server Status:** ✅ Running  
**Razorpay Status:** ⚠️ Not Configured  
**COD Payments:** ✅ Working  
**Online Payments:** ❌ Will work after adding credentials

---

**Next Step:** Add your Razorpay credentials to `.env` file now! 🚀
