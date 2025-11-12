# Razorpay Payment Integration Setup Guide

## Overview

This guide explains how to set up Razorpay payment gateway integration for the e-commerce platform, replacing the previous PhonePe integration.

## Prerequisites

1. A Razorpay account (Sign up at https://razorpay.com)
2. Access to Razorpay Dashboard
3. Node.js server with Express

## Environment Variables Setup

Add the following environment variables to your `.env` file in the server directory:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Remove old PhonePe variables (no longer needed)
# MERCHANT_ID=...
# SALT_KEY=...
```

## Getting Razorpay Credentials

### For Testing (Test Mode):

1. Login to Razorpay Dashboard
2. Navigate to Settings → API Keys
3. Under "Test Mode", generate test keys
4. Copy the `Key ID` and `Key Secret`

### For Production (Live Mode):

1. Complete KYC verification on Razorpay
2. Activate your account
3. Navigate to Settings → API Keys
4. Under "Live Mode", generate live keys
5. Copy the `Key ID` and `Key Secret`

⚠️ **Important**: Never commit your `.env` file to version control!

## Implementation Details

### Backend Changes

1. **Installed Package**: `razorpay` npm package
2. **New Controller Methods**:

   - `createRazorpayOrder`: Creates a Razorpay order and returns order ID
   - `verifyRazorpayPayment`: Verifies payment signature and creates order in database

3. **New Routes**:
   - `POST /api/v1/orders/create-razorpay-order`: Create Razorpay order
   - `POST /api/v1/orders/verify-payment`: Verify payment and create order

### Frontend Changes

1. **Razorpay Checkout Script**: Loaded dynamically from CDN
2. **Payment Flow**:
   - User selects Razorpay payment option
   - Clicks "Place Order"
   - Razorpay order is created on backend
   - Razorpay checkout modal opens
   - User completes payment
   - Payment signature is verified on backend
   - Order is created and cart is cleared

## Security Features

1. **Payment Signature Verification**: All payments are verified using HMAC SHA256
2. **Server-side Validation**: All payment data is validated on the server
3. **Secure Credentials**: API secrets are stored in environment variables
4. **HTTPS Required**: Razorpay requires HTTPS in production

## Payment Flow

```
User → Select Items → Checkout → Choose Razorpay → Place Order
  ↓
Backend creates Razorpay order
  ↓
Razorpay checkout modal opens
  ↓
User completes payment (Card/UPI/NetBanking/Wallet)
  ↓
Razorpay sends payment response
  ↓
Backend verifies payment signature
  ↓
Order created, Cart cleared, Stock updated
  ↓
Success confirmation to user
```

## Testing

### Test Cards for Testing Mode:

**Successful Payment:**

- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**UPI Testing:**

- UPI ID: success@razorpay
- For failures: failure@razorpay

### Testing Checklist:

- [ ] Razorpay modal opens correctly
- [ ] Payment succeeds with test card
- [ ] Order is created in database
- [ ] Cart is cleared after successful payment
- [ ] Product stock is updated
- [ ] User is redirected to home page
- [ ] Payment failure is handled gracefully
- [ ] User can cancel payment
- [ ] COD orders still work correctly

## Razorpay Dashboard

Monitor your transactions at:

- Test Mode: https://dashboard.razorpay.com/app/dashboard
- Live Mode: https://dashboard.razorpay.com/app/dashboard (after activation)

## Webhook Integration (Optional - for advanced tracking)

For production, you may want to set up webhooks to handle payment events:

1. Go to Settings → Webhooks in Razorpay Dashboard
2. Add your webhook URL: `https://yourdomain.com/api/v1/orders/webhook`
3. Select events to listen for (payment.captured, payment.failed, etc.)
4. Implement webhook handler in your backend

## Support

- Razorpay Documentation: https://razorpay.com/docs/
- Integration Guide: https://razorpay.com/docs/payments/payment-gateway/
- API Reference: https://razorpay.com/docs/api/

## Migration Notes

### Removed PhonePe Code:

- ✅ Removed `phonepeIntagretion` function
- ✅ Removed `phonepeStatus` function
- ✅ Removed PhonePe routes
- ✅ Removed PhonePe frontend integration
- ✅ Removed axios dependency for payment gateway calls
- ✅ Removed PhonePe environment variables

### Added Razorpay Code:

- ✅ Added Razorpay SDK
- ✅ Added `createRazorpayOrder` function
- ✅ Added `verifyRazorpayPayment` function
- ✅ Added Razorpay routes
- ✅ Added Razorpay frontend integration
- ✅ Added Razorpay environment variables

## Troubleshooting

### Common Issues:

1. **Razorpay script fails to load**

   - Check internet connection
   - Verify HTTPS is enabled in production
   - Check browser console for errors

2. **Payment verification fails**

   - Verify RAZORPAY_KEY_SECRET is correct
   - Check signature calculation logic
   - Review backend logs

3. **Order not created after successful payment**

   - Check backend logs
   - Verify database connection
   - Ensure all required fields are present

4. **Razorpay modal doesn't open**
   - Check if script loaded successfully
   - Verify key_id is correct
   - Check browser console for errors

## Next Steps

1. Add your Razorpay credentials to `.env` file
2. Test the payment flow in test mode
3. Complete Razorpay KYC for production
4. Switch to live mode credentials
5. Test thoroughly before going live
6. Monitor transactions in Razorpay Dashboard
