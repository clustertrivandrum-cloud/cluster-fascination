# Checkout Components - Complete Overview 🎯

## 📋 Table of Contents

1. [Component Details](#component-details)
2. [Props Reference](#props-reference)
3. [Styling Guide](#styling-guide)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

---

## Component Details

### 1️⃣ CheckoutHeader

**Purpose**: Displays branded header for checkout page

**Features**:

- Clickable logo linking to home
- Elegant script tagline
- Gradient background
- Fully responsive

**When to Use**: At the top of checkout page (before any checkout steps)

**Dependencies**:

- `logo` image asset
- `Link` from react-router-dom

---

### 2️⃣ OrderSummary

**Purpose**: Shows order pricing breakdown

**Features**:

- Subtotal display
- Delivery fee (FREE)
- Tax amount
- Grand total
- Themed card design

**When to Use**: Display alongside checkout steps for price visibility

**Data Required**: `salePriceTotal` (number)

---

### 3️⃣ AddressSection

**Purpose**: Step 1 - Manage shipping address

**Features**:

- Display selected address
- List all saved addresses
- Radio button selection
- Change address action
- Add new address CTA
- Empty state handling

**When to Use**: When `currentStep === 1`

**Complex Props**: Requires address data and multiple callbacks

---

### 4️⃣ AddressModal

**Purpose**: Form to add new shipping address

**Features**:

- Modal overlay
- Two-column name fields
- Address line 1 & 2
- City, State, ZIP
- Mobile number
- Country
- Form validation
- Custom scrollbar

**When to Use**: Triggered by "Add New Address" button

**Form Fields**: 9 total (8 required, 1 optional)

---

### 5️⃣ CartItemsList

**Purpose**: Step 2 - Review cart items

**Features**:

- Product images
- Product names
- Price display
- Discount badges
- Quantity controls (+/-)
- Remove item button
- Empty cart state
- Navigation buttons

**When to Use**: When `currentStep === 2`

**Interactive Elements**: Increment, Decrement, Remove, Back, Continue

---

### 6️⃣ PaymentOptions

**Purpose**: Step 3 - Select payment method

**Features**:

- Razorpay online payment (with warning)
- Cash on Delivery option
- Visual selection feedback
- Payment descriptions
- Warning messages
- Place order button

**When to Use**: When `currentStep === 3`

**Payment Methods**: COD (active), Razorpay (requires setup)

---

## Props Reference

### CheckoutHeader

```typescript
// No props required
<CheckoutHeader />
```

### OrderSummary

```typescript
interface OrderSummaryProps {
  salePriceTotal: number; // Total price in rupees
}

<OrderSummary salePriceTotal={1299} />;
```

### AddressSection

```typescript
interface AddressSectionProps {
  orderAddress: {
    firstname: string;
    lastname: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    mobile: string;
    _id: string;
  };
  addressDatas: Address[]; // Array of addresses
  selectedAddress: Address | null;
  onRadioChange: (address: Address) => void;
  onChangeAddress: () => void;
  onNext: () => void;
  onAddNewAddress: () => void;
}
```

### AddressModal

```typescript
interface AddressModalProps {
  show: boolean;
  onHide: () => void;
  formData: {
    firstname: string;
    lastname: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    zip: string;
    mobile: string;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
```

### CartItemsList

```typescript
interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    image: string[];
    sale_rate: number;
    price: number;
    discount: number;
    stock: number;
  };
  qty: number;
}

interface CartItemsListProps {
  cartItems: CartItem[];
  onQuantityChange: (
    item: CartItem,
    operation: "increment" | "decrement"
  ) => void;
  onRemoveItem: (itemId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}
```

### PaymentOptions

```typescript
interface PaymentOptionsProps {
  paymentOption: "cod" | "razorpay";
  onPaymentChange: (option: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
}
```

---

## Styling Guide

### CSS Variables (from Checkout.css)

```css
--primary-mint: #B9EAD8    /* Main brand color */
--soft-mint: #D4F1E8       /* Light backgrounds */
--light-mint: #E8F8F3      /* Very light backgrounds */
--dark-mint: #8FD4BB       /* Darker shade for gradients */
--success-green: #7BC8A4   /* Success states, CTAs */
--accent-beige: #E8DCC9    /* Secondary containers */
--accent-pink: #F5D5D8     /* Decorative elements */
--soft-pink: #FADDE1       /* Light pink accents */
--text-dark: #2C3E50       /* Primary text */
--text-muted: #6C757D      /* Secondary text */
--cream-white: #FFF9F5     /* Light backgrounds */
```

### Common Patterns

**Card Container**:

```jsx
<div
  className="card mb-4"
  style={{
    borderRadius: '20px',
    border: '2px solid var(--primary-mint)',
    boxShadow: '0 5px 20px rgba(185, 234, 216, 0.15)'
  }}
>
```

**Card Header**:

```jsx
<div
  className="card-header text-white"
  style={{
    background: 'linear-gradient(135deg, var(--primary-mint) 0%, var(--dark-mint) 100%)',
    borderRadius: '18px 18px 0 0'
  }}
>
```

**Primary Button**:

```jsx
<button
  style={{
    background: 'linear-gradient(135deg, var(--success-green) 0%, var(--dark-mint) 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '12px 30px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }}
>
```

**Outline Button**:

```jsx
<button
  style={{
    background: 'white',
    color: 'var(--text-dark)',
    border: '2px solid var(--primary-mint)',
    borderRadius: '20px',
    padding: '12px 30px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }}
>
```

---

## Usage Examples

### Basic Checkout Flow

```jsx
import { useState, useEffect } from "react";
import {
  CheckoutHeader,
  OrderSummary,
  AddressSection,
  CartItemsList,
  PaymentOptions,
} from "../components/checkout";

function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [total, setTotal] = useState(0);

  return (
    <>
      <CheckoutHeader />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <OrderSummary salePriceTotal={total} />

            {currentStep === 1 && <AddressSection {...addressProps} />}
            {currentStep === 2 && <CartItemsList {...cartProps} />}
            {currentStep === 3 && <PaymentOptions {...paymentProps} />}
          </div>
        </div>
      </div>
    </>
  );
}
```

### Standalone OrderSummary (e.g., Cart Page)

```jsx
import { OrderSummary } from "../components/checkout";

function Cart() {
  const total = calculateCartTotal();

  return (
    <div className="cart-page">
      <OrderSummary salePriceTotal={total} />
      {/* Rest of cart UI */}
    </div>
  );
}
```

### Reusing AddressModal in Profile Page

```jsx
import { AddressModal } from '../components/checkout';

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({...});

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Add Address
      </button>

      <AddressModal
        show={showModal}
        onHide={() => setShowModal(false)}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

---

## Best Practices

### ✅ DO

1. **Pass all required props**

   ```jsx
   <OrderSummary salePriceTotal={total} />
   ```

2. **Handle empty states**

   ```jsx
   <CartItemsList
     cartItems={cartData?.item || []}
     // ... other props
   />
   ```

3. **Validate data before rendering**

   ```jsx
   {
     orderAddress?.address_line_1 && <AddressSection {...props} />;
   }
   ```

4. **Use callbacks for actions**

   ```jsx
   <PaymentOptions
     onBack={() => setCurrentStep(2)}
     onPlaceOrder={handleOrderSubmit}
   />
   ```

5. **Import from central export**
   ```jsx
   import { CheckoutHeader, OrderSummary } from "../components/checkout";
   ```

### ❌ DON'T

1. **Don't mutate props directly**

   ```jsx
   // ❌ Bad
   const handleChange = () => {
     formData.firstname = "John";
   };

   // ✅ Good
   const handleChange = () => {
     setFormData({ ...formData, firstname: "John" });
   };
   ```

2. **Don't forget error handling**

   ```jsx
   // ❌ Bad
   <CartItemsList cartItems={cartData.item} />

   // ✅ Good
   <CartItemsList cartItems={cartData?.item || []} />
   ```

3. **Don't hardcode values**

   ```jsx
   // ❌ Bad
   <OrderSummary salePriceTotal={1299} />

   // ✅ Good
   <OrderSummary salePriceTotal={calculateTotal()} />
   ```

4. **Don't skip step validation**

   ```jsx
   // ❌ Bad
   onClick={() => setCurrentStep(2)}

   // ✅ Good
   onClick={() => {
     if (validateStep1()) {
       setCurrentStep(2);
     }
   }}
   ```

5. **Don't override theme colors randomly**

   ```jsx
   // ❌ Bad
   style={{ background: '#ff0000' }}

   // ✅ Good
   style={{ background: 'var(--primary-mint)' }}
   ```

---

## Performance Optimization

### Code Splitting

```jsx
import { lazy, Suspense } from "react";

const PaymentOptions = lazy(() =>
  import("../components/checkout").then((module) => ({
    default: module.PaymentOptions,
  }))
);

function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentOptions {...props} />
    </Suspense>
  );
}
```

### Memoization

```jsx
import { useMemo } from "react";

function Checkout() {
  const orderSummaryProps = useMemo(
    () => ({
      salePriceTotal: calculateTotal(cartItems),
    }),
    [cartItems]
  );

  return <OrderSummary {...orderSummaryProps} />;
}
```

---

## Testing Recommendations

### Unit Tests

```jsx
import { render, screen } from "@testing-library/react";
import { OrderSummary } from "../components/checkout";

test("displays correct total", () => {
  render(<OrderSummary salePriceTotal={1299} />);
  expect(screen.getByText("₹1299")).toBeInTheDocument();
});
```

### Integration Tests

```jsx
test("completes checkout flow", async () => {
  render(<Checkout />);

  // Step 1: Select address
  fireEvent.click(screen.getByText("Next"));

  // Step 2: Review items
  fireEvent.click(screen.getByText("Continue"));

  // Step 3: Place order
  fireEvent.click(screen.getByText("Place Your Order"));

  await waitFor(() => {
    expect(screen.getByText("Success")).toBeInTheDocument();
  });
});
```

---

## Accessibility

All components include:

- ✅ Semantic HTML
- ✅ Keyboard navigation support
- ✅ Focus states
- ✅ Color contrast compliance
- ⚠️ ARIA labels (recommended to add)

### Recommended Improvements

```jsx
<button aria-label="Remove item from cart" onClick={onRemove}>
  <FaRegTrashAlt />
</button>

<input
  type="radio"
  aria-labelledby="payment-option-label"
  {...props}
/>
```

---

**Last Updated**: October 24, 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team
