# Razorpay Integration Testing Guide

## Pre-Testing Checklist

### 1. Environment Setup

- [ ] Razorpay npm package installed (`npm install razorpay`)
- [ ] `.env` file configured with test credentials
- [ ] Server restarted after adding environment variables
- [ ] Client application running
- [ ] Database connected

### 2. Razorpay Account Setup

- [ ] Razorpay account created (https://razorpay.com)
- [ ] Test mode keys obtained from dashboard
- [ ] Test credentials added to `.env` file

## Test Credentials

### Razorpay Test Keys

Get your test keys from: https://dashboard.razorpay.com/app/keys (Test Mode)

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxx
```

### Test Payment Methods

#### 1. Test Credit/Debit Cards

**Success Scenario:**

```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date (e.g., 12/25)
Cardholder Name: Test User
```

**Other Test Cards:**

```
Mastercard: 5555 5555 5555 4444
Rupay: 6074 8200 0000 0007
American Express: 3782 822463 10005
```

**Failure Scenarios:**

- Card Number: 4000 0000 0000 0002 (Declined)
- Card Number: 4000 0000 0000 0069 (Expired Card)

#### 2. Test UPI

**Success:**

- UPI ID: `success@razorpay`

**Failure:**

- UPI ID: `failure@razorpay`

#### 3. Test Net Banking

- Select any bank
- Will show test authentication screen
- Click "Success" or "Failure" button

#### 4. Test Wallets

- Select any wallet
- Will redirect to test page
- Click "Success" or "Failure" button

## Testing Scenarios

### Scenario 1: Successful Razorpay Payment

**Steps:**

1. Add products to cart
2. Navigate to checkout
3. Fill in delivery address
4. Select "Online Payment (Razorpay)"
5. Click "Place Your Order"
6. Razorpay modal should open
7. Enter test card details (4111 1111 1111 1111)
8. Click "Pay"
9. Wait for payment processing

**Expected Results:**

- ✅ Payment successful message displayed
- ✅ Order created in database
- ✅ Cart cleared
- ✅ Product stock reduced
- ✅ Razorpay order ID, payment ID, and signature stored
- ✅ User redirected to home page
- ✅ Order visible in "My Orders"

**Verify in Database:**

```javascript
// Check order document
{
  userId: "...",
  payment_mode: "razorpay",
  amount: 1999,
  razorpay_order_id: "order_xxxxxxxxxxxxx",
  razorpay_payment_id: "pay_xxxxxxxxxxxxx",
  razorpay_signature: "xxxxxxxxxxxxx",
  status: "Placed"
}
```

### Scenario 2: Cash on Delivery (COD)

**Steps:**

1. Add products to cart
2. Navigate to checkout
3. Fill in delivery address
4. Select "Cash on Delivery"
5. Click "Place Your Order"

**Expected Results:**

- ✅ Order placed immediately without payment gateway
- ✅ Order created with payment_mode: "cod"
- ✅ No Razorpay transaction details
- ✅ Cart cleared
- ✅ Product stock reduced
- ✅ Success message shown

### Scenario 3: Payment Cancellation

**Steps:**

1. Add products to cart
2. Navigate to checkout
3. Select "Online Payment (Razorpay)"
4. Click "Place Your Order"
5. When Razorpay modal opens, click "X" or press ESC

**Expected Results:**

- ✅ "Payment Cancelled" warning message
- ✅ No order created in database
- ✅ Cart remains intact
- ✅ Product stock unchanged
- ✅ User stays on checkout page

### Scenario 4: Payment Failure

**Steps:**

1. Add products to cart
2. Navigate to checkout
3. Select "Online Payment (Razorpay)"
4. Click "Place Your Order"
5. Enter failure test card: 4000 0000 0000 0002
6. Click "Pay"

**Expected Results:**

- ✅ Payment failure error message from Razorpay
- ✅ No order created in database
- ✅ Cart remains intact
- ✅ Product stock unchanged
- ✅ User can retry payment

### Scenario 5: Network Failure

**Steps:**

1. Disable internet connection temporarily
2. Add products to cart
3. Navigate to checkout
4. Select "Online Payment (Razorpay)"
5. Click "Place Your Order"

**Expected Results:**

- ✅ Error message: "Razorpay SDK failed to load"
- ✅ User informed to check internet connection
- ✅ No order created
- ✅ Cart remains intact

### Scenario 6: Invalid Signature Verification

This is a security test (requires manual modification for testing):

**Note:** This should naturally never happen in production. For testing, you can temporarily modify the signature verification logic.

**Expected Results:**

- ✅ Payment rejected with "Invalid payment signature"
- ✅ No order created despite payment success
- ✅ Security maintained

## API Testing (Using Postman/Curl)

### Test 1: Create Razorpay Order

**Endpoint:** `POST /api/v1/orders/create-razorpay-order`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Body:**

```json
{
  "orderData": {
    "payment_mode": "razorpay",
    "amount": 1999,
    "address": "60d5ecb4c5f5f53d2c8e4e3a",
    "products": {
      "item": [
        {
          "product_id": "60d5ecb4c5f5f53d2c8e4e3b",
          "qty": 2,
          "price": 999.5
        }
      ],
      "totalPrice": 1999
    }
  }
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "orderId": "order_xxxxxxxxxxxxx",
  "amount": 199900,
  "currency": "INR",
  "keyId": "rzp_test_xxxxxxxxxxxxx"
}
```

### Test 2: Verify Payment

**Endpoint:** `POST /api/v1/orders/verify-payment`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Body:**

```json
{
  "razorpay_order_id": "order_xxxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_signature": "calculated_signature_here",
  "orderData": {
    "payment_mode": "razorpay",
    "amount": 1999,
    "address": "60d5ecb4c5f5f53d2c8e4e3a",
    "products": {
      "item": [...],
      "totalPrice": 1999
    }
  }
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Payment verified and order created successfully",
  "orderId": "60d5ecb4c5f5f53d2c8e4e3c"
}
```

## Browser Console Checks

### Success Flow Console Output:

```
Creating Razorpay order: {...}
Razorpay order created: {...}
Payment successful
Verifying payment...
Payment verified and order created
```

### Error Flow Console Output:

```
Creating Razorpay order: {...}
Razorpay order creation error: ...
OR
Payment verification error: ...
```

## Razorpay Dashboard Verification

After successful test payments:

1. Login to Razorpay Dashboard
2. Navigate to Transactions → Payments
3. Verify test payments appear in the list
4. Check payment status (Captured/Failed)
5. View payment details (order ID, amount, method)

## Common Issues and Solutions

### Issue 1: Razorpay script not loading

**Solution:**

- Check internet connection
- Verify script URL in browser console
- Clear browser cache
- Try different browser

### Issue 2: "Key ID is required"

**Solution:**

- Verify RAZORPAY_KEY_ID in .env file
- Restart server after adding environment variables
- Check environment variable is being read correctly

### Issue 3: Signature verification fails

**Solution:**

- Verify RAZORPAY_KEY_SECRET is correct
- Check for extra spaces in .env file
- Ensure using correct key (test vs live)

### Issue 4: Amount mismatch

**Solution:**

- Razorpay expects amount in paise (multiply by 100)
- Check conversion in both frontend and backend
- Verify database stores amount in rupees

### Issue 5: Order created before payment verification

**Solution:**

- Ensure order creation only happens in `verifyRazorpayPayment`
- Don't create order in `createRazorpayOrder`
- Wait for payment handler callback

## Performance Testing

### Load Testing Checklist:

- [ ] Multiple concurrent orders
- [ ] Large cart (10+ items)
- [ ] Rapid order cancellations
- [ ] Network latency simulation
- [ ] Mobile device testing
- [ ] Different browsers (Chrome, Firefox, Safari, Edge)

## Security Testing

### Security Checklist:

- [ ] Signature verification working correctly
- [ ] API keys not exposed in frontend
- [ ] Authorization required for all order endpoints
- [ ] Amount manipulation prevented
- [ ] SQL/NoSQL injection tests
- [ ] HTTPS enforcement in production
- [ ] CORS configured correctly

## Production Deployment Checklist

Before going live:

- [ ] Switch to Razorpay LIVE keys
- [ ] Complete Razorpay KYC verification
- [ ] Test with real small amount transaction
- [ ] Enable HTTPS on server
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure webhook for payment events
- [ ] Set up payment reconciliation process
- [ ] Train customer support on refund process
- [ ] Create rollback plan
- [ ] Monitor first few transactions closely

## Support Resources

- **Razorpay Docs:** https://razorpay.com/docs/
- **Test Mode Guide:** https://razorpay.com/docs/payments/payments/test-card-details/
- **Integration Checklist:** https://razorpay.com/docs/payments/payment-gateway/integration-checklist/
- **Support:** support@razorpay.com

## Test Results Template

```
Date: _______________
Tester: _______________
Environment: Test/Production

| Test Scenario | Status | Notes |
|--------------|--------|-------|
| Razorpay Card Payment | ✅/❌ | |
| UPI Payment | ✅/❌ | |
| Net Banking | ✅/❌ | |
| Wallet Payment | ✅/❌ | |
| COD Payment | ✅/❌ | |
| Payment Cancellation | ✅/❌ | |
| Payment Failure | ✅/❌ | |
| Network Failure | ✅/❌ | |
| Cart Clearing | ✅/❌ | |
| Stock Update | ✅/❌ | |
| Order Creation | ✅/❌ | |
| Signature Verification | ✅/❌ | |

Overall Result: ✅ Pass / ❌ Fail
```
