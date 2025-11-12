# Checkout Components - Cluster Fascination Theme 🌸

This directory contains modular, reusable checkout components following the Cluster Fascination theme design system.

## 📁 Component Structure

### 1. **CheckoutHeader.jsx**

Header component for the checkout page with branding and tagline.

**Features:**

- Responsive logo display
- Elegant script tagline with flower emoji
- Gradient background (cream-white to light-mint)
- Link to home page

**Usage:**

```jsx
import CheckoutHeader from "../components/checkout/CheckoutHeader";

<CheckoutHeader />;
```

---

### 2. **OrderSummary.jsx**

Displays order total breakdown with themed styling.

**Props:**

- `salePriceTotal` (number): Total price of items in cart

**Features:**

- Gradient card header (mint green)
- Clear price breakdown (subtotal, delivery, tax)
- Free delivery badge with success-green color
- Rounded borders (20px) with mint border
- Shadow effects for depth

**Usage:**

```jsx
import OrderSummary from "../components/checkout/OrderSummary";

<OrderSummary salePriceTotal={1299} />;
```

---

### 3. **AddressSection.jsx**

Step 1 of checkout - manages shipping address selection.

**Props:**

- `orderAddress` (object): Currently selected address
- `addressDatas` (array): List of all user addresses
- `selectedAddress` (object): Temporarily selected address
- `onRadioChange` (function): Handler for radio selection
- `onChangeAddress` (function): Apply selected address
- `onNext` (function): Proceed to next step
- `onAddNewAddress` (function): Open address modal

**Features:**

- Two-column layout: selected address + address list
- Themed containers with mint-green and beige accents
- Elegant script headings
- Smooth hover effects on buttons
- Empty state with icon and CTA button

**Usage:**

```jsx
<AddressSection
  orderAddress={orderAddress}
  addressDatas={addressDatas}
  selectedAddress={selectedAddress}
  onRadioChange={handleRadioChange}
  onChangeAddress={handleChangeAddress}
  onNext={() => setCurrentStep(2)}
  onAddNewAddress={handleAddressModalShow}
/>
```

---

### 4. **AddressModal.jsx**

Modal form for adding new shipping addresses.

**Props:**

- `show` (boolean): Modal visibility
- `onHide` (function): Close modal handler
- `formData` (object): Address form data
- `onChange` (function): Input change handler
- `onSubmit` (function): Form submission handler

**Features:**

- Gradient modal header (light-mint to soft-pink)
- Two-column responsive layout for name fields
- Themed form inputs with mint borders
- Custom scrollbar styling
- Elegant script title with house emoji

**Usage:**

```jsx
<AddressModal
  show={showModal}
  onHide={handleClose}
  formData={addressFormData}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>
```

---

### 5. **CartItemsList.jsx**

Step 2 of checkout - review cart items with quantity controls.

**Props:**

- `cartItems` (array): Items in shopping cart
- `onQuantityChange` (function): Update item quantity
- `onRemoveItem` (function): Remove item from cart
- `onBack` (function): Go to previous step
- `onContinue` (function): Proceed to next step

**Features:**

- Product image with rounded borders
- Price display with discount badge
- Quantity controls with increment/decrement buttons
- Delete button with trash icon
- Empty cart state
- Responsive three-column layout (image, details, controls)

**Usage:**

```jsx
<CartItemsList
  cartItems={cartData.item}
  onQuantityChange={handleQuantityChange}
  onRemoveItem={handleRemoveItem}
  onBack={() => setCurrentStep(1)}
  onContinue={() => setCurrentStep(3)}
/>
```

---

### 6. **PaymentOptions.jsx**

Step 3 of checkout - payment method selection.

**Props:**

- `paymentOption` (string): Selected payment method ('cod' or 'razorpay')
- `onPaymentChange` (function): Update payment selection
- `onBack` (function): Go to previous step
- `onPlaceOrder` (function): Submit order

**Features:**

- Two payment options: Razorpay (online) and COD
- Warning badge for unavailable Razorpay
- Conditional styling based on selection
- Visual feedback (light-mint background when selected)
- Prominent "Place Order" button with red gradient

**Usage:**

```jsx
<PaymentOptions
  paymentOption={paymentOption}
  onPaymentChange={setPaymentOption}
  onBack={() => setCurrentStep(2)}
  onPlaceOrder={handlePlaceOrder}
/>
```

---

### 7. **Checkout.css**

Global theme styles for all checkout components.

**Includes:**

- CSS variables for theme colors
- `.elegant-script` class for Dancing Script font
- Button hover effects (`.btn-cluster`)
- Floating animations
- Watercolor background spots
- Custom scrollbar styling
- Form input focus states
- Responsive media queries

---

## 🎨 Theme Integration

All components follow the **Cluster Fascination** design system:

### Colors Used

- **Primary Mint**: `#B9EAD8` - Main brand color
- **Light Mint**: `#E8F8F3` - Backgrounds
- **Dark Mint**: `#8FD4BB` - Gradients
- **Success Green**: `#7BC8A4` - CTAs and positive states
- **Accent Beige**: `#E8DCC9` - Secondary containers
- **Accent Pink**: `#F5D5D8` - Decorative elements
- **Text Dark**: `#2C3E50` - Primary text
- **Cream White**: `#FFF9F5` - Light backgrounds

### Typography

- **Elegant Script**: Dancing Script (headings, special text)
- **Body Text**: Montserrat (default)

### Design Patterns

- **Border Radius**: 15-20px for cards, 20px for buttons
- **Shadows**: Layered shadows with mint tint
- **Transitions**: 0.3s ease for interactive elements
- **Gradients**: 135deg angle for consistency
- **Emojis**: 🌸 🏠 🛍️ 🛒 📍 💳 ✨ 🎉

---

## 🔧 Main Checkout Integration

The main `Checkout.jsx` file orchestrates all components:

**State Management:**

- `currentStep`: Controls which step is displayed (1-3)
- `cartData`: Shopping cart items
- `orderAddress`: Selected shipping address
- `paymentOption`: Selected payment method
- `salePriceTotal`: Total order amount

**Business Logic:**

- Address fetching and management
- Cart operations (update qty, remove items)
- Payment processing (COD + Razorpay)
- Order submission

**Refactoring Benefits:**

1. ✅ Separation of concerns (UI vs. logic)
2. ✅ Reusable components across the app
3. ✅ Easier testing and maintenance
4. ✅ Consistent theme application
5. ✅ Improved readability (532 lines vs. 878 lines)
6. ✅ Better prop management and type safety

---

## 📱 Responsive Design

All components are fully responsive:

- **Desktop**: Full layouts with side-by-side columns
- **Tablet**: Stacked layouts with adjusted spacing
- **Mobile**: Single-column layouts with touch-friendly controls

---

## 🚀 Future Enhancements

Potential improvements:

- [ ] Add loading states for async operations
- [ ] Implement address validation
- [ ] Add animation transitions between steps
- [ ] Create progress indicator component
- [ ] Add accessibility attributes (ARIA labels)
- [ ] Implement error boundaries
- [ ] Add PropTypes or TypeScript for type checking

---

## 📝 Notes

- All components use inline styles for theme consistency
- CSS variables defined in `Checkout.css` for easy theming
- Components designed to work independently
- No external UI library dependencies (except React-Bootstrap for Modal/Form)
- Follows React best practices (controlled components, proper key props)

---

**Created**: 2025-10-24  
**Theme**: Cluster Fascination - Fashion Jewellery & Accessories  
**Framework**: React with Vite  
**Styling**: Custom CSS + Bootstrap utilities
