# Fix for Address Line 2 Validation Error

## Problem
Server crashes with error: `Address validation failed: address_line_2: Path 'address_line_2' is required.`

## Root Cause
The MongoDB database has old schema validation rules or cached schema that still requires `address_line_2`, even though the Mongoose model has been updated to remove it.

## Solution - Follow These Steps

### Step 1: Stop the Server
```bash
# Press Ctrl+C to stop the running server
```

### Step 2: Run the Fix Script
```bash
cd server
node fix-address-schema.js
```

This script will:
- ✅ Connect to your MongoDB database
- ✅ Find the addresses collection
- ✅ Remove any schema validators
- ✅ Remove `address_line_2` field from existing documents
- ✅ Clean up the schema completely

### Step 3: Restart the Server
```bash
npm run dev
```

### Step 4: Test Creating an Address
Try adding a new address from the checkout page. It should now work without errors.

---

## Alternative Manual Fix (If Script Doesn't Work)

### Option A: Using MongoDB Compass or CLI

1. **Connect to your MongoDB database**

2. **Run this command in MongoDB Shell:**
```javascript
use your_database_name

// Remove validator from addresses collection
db.runCommand({
  collMod: "addresses",
  validator: {},
  validationLevel: "off"
})

// Remove address_line_2 from all existing documents
db.addresses.updateMany(
  { address_line_2: { $exists: true } },
  { $unset: { address_line_2: "" } }
)
```

3. **Restart your server**

### Option B: Drop and Recreate Collection (CAUTION: This deletes all addresses!)

⚠️ **WARNING**: This will delete all existing addresses!

```bash
# In MongoDB Shell
use your_database_name
db.addresses.drop()
```

Then restart your server. The collection will be recreated with the correct schema.

---

## What Was Changed

### Files Modified:

1. **`server/models/address.js`** ✅
   - Removed `address_line_2` field completely
   - Only has `address_line_1` now

2. **`server/controllers/addressController.js`** ✅
   - Removed `address_line_2` from `addAddress()`
   - Removed `address_line_2` from `updateAddress()`
   - Fixed error variable typo (`err` → `error`)

3. **`client/src/components/checkout/AddressModal.jsx`** ✅
   - Removed Address Line 2 input field
   - Added Indian states dropdown

4. **`client/src/components/checkout/AddressSection.jsx`** ✅
   - Removed Address Line 2 from display
   - Added "Add New Address" button

5. **`client/src/pages/Checkout.jsx`** ✅
   - Removed `address_line_2` from state
   - Added delivery charge calculation

---

## New Address Schema

```javascript
{
  userId: ObjectId,
  firstname: String (required),
  lastname: String (required),
  country: String (required),
  address_line_1: String (required),  // Single address line
  city: String (required),
  state: String (required),
  zip: String (required),
  mobile: Number (required),
  primary: Boolean (default: false)
}
```

---

## Verification

After running the fix, verify:

1. ✅ Server starts without errors
2. ✅ Can add new addresses from checkout
3. ✅ No `address_line_2` validation errors
4. ✅ Existing addresses still display correctly

---

## If Still Not Working

### Check 1: Mongoose Model Cache
```bash
# Delete node_modules and reinstall
cd server
rm -rf node_modules
npm install
```

### Check 2: MongoDB Connection
Make sure your `.env` file has the correct `MONGODB_URI`:
```
MONGODB_URI=mongodb://localhost:27017/your-database
```

### Check 3: Server Restart
Sometimes Node.js caches modules. Do a hard restart:
```bash
# Kill all node processes
pkill -9 node

# Start fresh
npm run dev
```

### Check 4: Check Model File
Verify the model file has no hidden characters:
```bash
cat server/models/address.js | grep -n "address_line"
```

Should only show `address_line_1`, not `address_line_2`.

---

## Contact Support

If the error persists after trying all steps:
1. Share the exact error message
2. Share output from `node fix-address-schema.js`
3. Share your MongoDB version: `mongod --version`

---

**Last Updated**: December 2024
**Status**: Fix Available - Run the script above