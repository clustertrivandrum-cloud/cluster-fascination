# Client-Side Updates Guide - Subcategories & Delivery

## Overview
This document outlines all necessary client-side updates for:
1. Subcategory support
2. Updated delivery charges
3. WhatsApp enquiry link
4. Removal of "Delivery across India" header

---

## 1. Subcategory Support

### Files to Update

#### A. Add Subcategory API Functions
**File**: `client/src/services/allApi.js`

```javascript
import { ServerURL } from "./baseUrl";
import { commonApi } from "./commonapi";

export const getallproductsapi = async () => {
  return await commonApi("GET", `${ServerURL}/api/v1/products`);
};

// Subcategory API functions
export const getallsubcategoriesapi = async () => {
  return await commonApi("GET", `${ServerURL}/api/v1/subcategory`);
};

export const getsubcategoriesbycategoryapi = async (categoryId) => {
  return await commonApi(
    "GET",
    `${ServerURL}/api/v1/subcategory/category/${categoryId}`,
  );
};
```

---

#### B. Update Allproducts Page
**File**: `client/src/pages/Allproducts.jsx`

**Add State Variables**:
```javascript
const [filterSubcategory, setFilterSubcategory] = useState('');
const [subcategories, setSubcategories] = useState([]);
```

**Add Fetch Subcategories Function**:
```javascript
const fetchSubcategories = async (categoryId) => {
  try {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
    const response = await axiosInstance.get(`/api/v1/subcategory/category/${categoryId}`);
    setSubcategories(Array.isArray(response.data?.data) ? response.data.data : []);
  } catch (error) {
    setSubcategories([]);
    console.error('Error fetching subcategories:', error);
  }
};
```

**Update handleFilterCategory**:
```javascript
const handleFilterCategory = (e) => {
  setProducts([]);
  setFilterCategory(e.target.value);
  setFilterSubcategory(''); // Reset subcategory
  setPage(1);

  // Fetch subcategories for selected category
  fetchSubcategories(e.target.value);

  let urlQ = `/api/v1/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc`;
  if (e.target.value !== '') urlQ += `&category=${e.target.value}`;
  if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
  fetchProducts(urlQ);
};
```

**Add handleFilterSubcategory**:
```javascript
const handleFilterSubcategory = (e) => {
  setProducts([]);
  setFilterSubcategory(e.target.value);
  setPage(1);
  let urlQ = `/api/v1/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc`;
  if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
  if (e.target.value !== '') urlQ += `&subcategory=${e.target.value}`;
  if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
  fetchProducts(urlQ);
};
```

**Update onLoad and onSearch to include subcategory**:
```javascript
const onLoad = async () => {
  setPage((prev) => prev + 1);
  let nextPage = page + 1;
  let urlQ = `/api/v1/products?page=${nextPage}&limit=${limit}&sortField=createdAt&sortOrder=desc`;
  if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
  if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
  if (filterSubcategory !== '') urlQ += `&subcategory=${filterSubcategory}`;
  await fetchProducts(urlQ);
};

const onSearch = async () => {
  setProducts([]);
  setPage(1);
  let urlQ = `/api/v1/products?page=1&limit=${limit}&sortField=createdAt&sortOrder=desc`;
  if (searchTerm !== '') urlQ += `&search=${searchTerm}`;
  if (filterCategory !== '') urlQ += `&category=${filterCategory}`;
  if (filterSubcategory !== '') urlQ += `&subcategory=${filterSubcategory}`;
  fetchProducts(urlQ);
};
```

**Add Subcategory Dropdown in JSX** (After Category Dropdown):
```jsx
{/* Subcategory Filter - Shows only when category is selected */}
{filterCategory && (
  <div className="col-md-4 mb-3">
    <label className="form-label fw-bold">Subcategory</label>
    <select
      className="form-select"
      value={filterSubcategory}
      onChange={handleFilterSubcategory}
      disabled={!subcategories?.length}
      style={{
        border: '2px solid var(--soft-mint)',
        borderRadius: '15px',
        padding: '12px 20px',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <option value="">All Subcategories</option>
      {(subcategories && Array.isArray(subcategories) && subcategories.length > 0) ? (
        subcategories.map((subcat) => (
          <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
        ))
      ) : (
        <option value="" disabled>
          {subcategories.length === 0 ? 'No subcategories available' : 'Loading...'}
        </option>
      )}
    </select>
  </div>
)}
```

---

#### C. Update Category Component (Optional Enhancement)
**File**: `client/src/components/Category.jsx`

**Add Subcategory Display** (if you want to show subcategories under categories):
```javascript
const [selectedCategory, setSelectedCategory] = useState(null);
const [subcategories, setSubcategories] = useState([]);

const handleCategoryClick = async (categoryId) => {
  // Fetch subcategories for the category
  try {
    const response = await axiosInstance.get(`/api/v1/subcategory/category/${categoryId}`);
    if (response.data.data && response.data.data.length > 0) {
      setSubcategories(response.data.data);
      setSelectedCategory(categoryId);
    } else {
      // If no subcategories, go directly to products
      navigate(`/allproducts?category=${categoryId}`);
    }
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    navigate(`/allproducts?category=${categoryId}`);
  }
};

const handleSubcategoryClick = (categoryId, subcategoryId) => {
  navigate(`/allproducts?category=${categoryId}&subcategory=${subcategoryId}`);
};
```

---

## 2. Remove "Delivery Across India" Header

### File: `client/src/components/TopNav.jsx`

**Replace the entire file with**:
```javascript
import React from "react";
import "../App.css";

function TopNav() {
  const whatsappNumber = "919072415009"; // Replace with actual WhatsApp business number
  const whatsappMessage = "Hello! I have an enquiry about your products.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="top-nav-cluster">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-script mb-0 text-decoration-none"
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#25D366";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "inherit";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span className="flower-accent">✿</span>
            <i
              className="fa-brands fa-whatsapp"
              style={{ fontSize: "18px" }}
            ></i>
            Chat with us for enquiry
            <span className="flower-accent">✿</span>
          </a>
        </div>
        <div className="social-media">
          <a href="" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
```

**What Changed**:
- ❌ Removed: "Delivering Across India"
- ✅ Added: WhatsApp link with icon
- ✅ Hover effect shows green color (#25D366 - WhatsApp green)
- ✅ Opens WhatsApp chat in new tab with pre-filled message

---

## 3. Update Delivery Charges

### A. Update Shipping Policy Page
**File**: `client/src/pages/ShippingPolicy.jsx`

**Update the "What are the shipping charges" section**:
```jsx
<li>
  <strong>
    What are the shipping charges associated with an order?
  </strong>
  <p>Our delivery charges are as follows:</p>
  <ul>
    <li>
      <strong>Within Kerala:</strong> ₹49
    </li>
    <li>
      <strong>Tamil Nadu, Karnataka & Andhra Pradesh:</strong> ₹49
    </li>
    <li>
      <strong>Other States:</strong> ₹79
    </li>
    <li>
      <strong>Orders above ₹799:</strong> FREE delivery
    </li>
  </ul>
  <p>
    The applicable shipping charges will be calculated and
    displayed at checkout based on your delivery location.
  </p>
</li>
```

**Update COD availability**:
```jsx
<li>
  <strong>Do you offer COD (Cash on Delivery)?</strong>
  <p>
    Yes, we offer Cash on Delivery (COD) as a payment option. You
    can also use other online payment methods as mentioned in the
    above FAQ.
  </p>
</li>
```

---

### B. Update Cart Page Delivery Charges
**File**: `client/src/pages/Cart.jsx`

**Add Delivery Charge Calculation Function**:
```javascript
const calculateDeliveryCharges = (state, totalAmount) => {
  // Free delivery for orders above ₹799
  if (totalAmount >= 799) {
    return 0;
  }

  // Define states and their charges
  const keralaCities = ['kerala'];
  const southernStates = ['tamil nadu', 'karnataka', 'andhra pradesh'];

  const normalizedState = state.toLowerCase().trim();

  if (keralaCities.some(s => normalizedState.includes(s))) {
    return 49;
  } else if (southernStates.some(s => normalizedState.includes(s))) {
    return 49;
  } else {
    return 79;
  }
};
```

**Update Delivery Charges Display**:
```javascript
const [deliveryCharges, setDeliveryCharges] = useState(0);

// Calculate delivery charges based on user's state and cart total
useEffect(() => {
  if (userDetails?.state && salePriceTotal > 0) {
    const charges = calculateDeliveryCharges(userDetails.state, salePriceTotal);
    setDeliveryCharges(charges);
  }
}, [userDetails, salePriceTotal]);
```

**Update Cart Summary**:
```jsx
<div className="d-flex justify-content-between mb-2">
  <span>Delivery Charges:</span>
  <span className="fw-bold">
    {deliveryCharges === 0 ? (
      <span className="text-success">FREE</span>
    ) : (
      `₹${deliveryCharges}`
    )}
  </span>
</div>

{salePriceTotal >= 799 && (
  <div className="alert alert-success" style={{ fontSize: '0.9rem' }}>
    🎉 You've qualified for FREE delivery!
  </div>
)}

{salePriceTotal < 799 && salePriceTotal > 0 && (
  <div className="alert alert-info" style={{ fontSize: '0.9rem' }}>
    Add ₹{(799 - salePriceTotal).toFixed(2)} more for FREE delivery!
  </div>
)}
```

---

### C. Update Checkout Page
**File**: `client/src/pages/Checkout.jsx`

**Add Same Delivery Calculation**:
```javascript
const calculateDeliveryCharges = (address, totalAmount) => {
  if (totalAmount >= 799) return 0;

  const state = address?.state?.toLowerCase().trim() || '';

  if (state.includes('kerala')) return 49;
  if (['tamil nadu', 'karnataka', 'andhra pradesh'].some(s => state.includes(s))) return 49;
  return 79;
};

const [deliveryCharges, setDeliveryCharges] = useState(0);

// Update delivery charges when address changes
useEffect(() => {
  if (deliveryAddress && salePriceTotal > 0) {
    const selectedAddress = addressDatas.find(addr => addr._id === deliveryAddress);
    if (selectedAddress) {
      const charges = calculateDeliveryCharges(selectedAddress, salePriceTotal);
      setDeliveryCharges(charges);
    }
  }
}, [deliveryAddress, salePriceTotal, addressDatas]);
```

**Update Order Summary**:
```jsx
<div className="d-flex justify-content-between mb-2">
  <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
    Delivery Fee:
  </span>
  <span style={{
    color: deliveryCharges === 0 ? 'var(--success-green)' : 'var(--text-dark)',
    fontWeight: '600'
  }}>
    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
  </span>
</div>

<div className="d-flex justify-content-between pt-3 border-top">
  <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Total:</span>
  <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary-mint)' }}>
    ₹{(salePriceTotal + deliveryCharges).toFixed(2)}
  </span>
</div>
```

---

## 4. Configuration Changes

### Environment Variables
**File**: `client/.env` or `client/.env.local`

Add WhatsApp business number:
```env
VITE_WHATSAPP_NUMBER=919072415009
```

Then update TopNav.jsx:
```javascript
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919072415009";
```

---

## 5. Testing Checklist

### Subcategory Features
- [ ] Category dropdown loads all categories
- [ ] Selecting category loads its subcategories
- [ ] Subcategory dropdown appears only when category is selected
- [ ] Filtering by subcategory shows correct products
- [ ] Resetting category clears subcategory selection
- [ ] URL parameters work: `?category=xxx&subcategory=yyy`

### WhatsApp Integration
- [ ] WhatsApp link appears in TopNav
- [ ] Clicking opens WhatsApp Web/App
- [ ] Pre-filled message is correct
- [ ] Hover effect shows green color
- [ ] Icon displays correctly
- [ ] Opens in new tab

### Delivery Charges
- [ ] Kerala addresses show ₹49
- [ ] TN/Karnataka/AP addresses show ₹49
- [ ] Other states show ₹79
- [ ] Orders above ₹799 show FREE
- [ ] Cart shows correct delivery charge
- [ ] Checkout calculates correctly
- [ ] "Add more for free delivery" message appears
- [ ] "Qualified for free delivery" message appears

### UI/UX
- [ ] Subcategory dropdown is styled consistently
- [ ] Loading states work correctly
- [ ] Empty states show appropriate messages
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] Smooth transitions

---

## 6. Backend API Requirements

Ensure these endpoints are working:

1. **Get Subcategories by Category**
   ```
   GET /api/v1/subcategory/category/:categoryId
   ```

2. **Get All Subcategories**
   ```
   GET /api/v1/subcategory
   ```

3. **Products with Subcategory Filter**
   ```
   GET /api/v1/products?category=xxx&subcategory=yyy
   ```

---

## 7. Delivery Charge Logic

### States Mapping
```javascript
const DELIVERY_CHARGES = {
  kerala: 49,
  'tamil nadu': 49,
  karnataka: 49,
  'andhra pradesh': 49,
  others: 79,
  freeThreshold: 799
};
```

### Implementation Notes
- State name matching should be case-insensitive
- Handle variations (e.g., "Tamil Nadu", "TamilNadu", "tamilnadu")
- Default to "others" (₹79) for unrecognized states
- Always check total amount first for free delivery eligibility

---

## 8. Mobile Responsiveness

### Subcategory Dropdown
```css
@media (max-width: 768px) {
  .subcategory-filter {
    margin-top: 1rem;
  }
}
```

### WhatsApp Link
```css
@media (max-width: 576px) {
  .whatsapp-link-text {
    font-size: 13px;
  }
  .whatsapp-icon {
    font-size: 16px;
  }
}
```

---

## 9. SEO Considerations

### Update Meta Tags
When on subcategory pages:
```jsx
<Helmet>
  <title>{subcategoryName} - {categoryName} Cluster Fascination</title>
  <meta name="description" content={`Shop ${subcategoryName} from our ${categoryName} collection`} />
</Helmet>
```

---

## 10. Analytics Tracking

### Track Subcategory Interactions
```javascript
// When subcategory is selected
const handleFilterSubcategory = (e) => {
  const subcategoryId = e.target.value;

  // Analytics
  if (window.gtag) {
    window.gtag('event', 'filter_subcategory', {
      category_id: filterCategory,
      subcategory_id: subcategoryId
    });
  }

  // Rest of the code...
};
```

### Track WhatsApp Clicks
```javascript
const handleWhatsAppClick = () => {
  if (window.gtag) {
    window.gtag('event', 'whatsapp_enquiry', {
      location: 'topnav',
      source: window.location.pathname
    });
  }
  window.open(whatsappUrl, '_blank');
};
```

---

## 11. Performance Optimization

### Lazy Load Subcategories
```javascript
const fetchSubcategories = useCallback(async (categoryId) => {
  if (!categoryId) {
    setSubcategories([]);
    return;
  }

  try {
    const response = await axiosInstance.get(`/api/v1/subcategory/category/${categoryId}`);
    setSubcategories(Array.isArray(response.data?.data) ? response.data.data : []);
  } catch (error) {
    setSubcategories([]);
    console.error('Error fetching subcategories:', error);
  }
}, []);
```

### Memoize Delivery Calculation
```javascript
const deliveryCharges = useMemo(() => {
  return calculateDeliveryCharges(userState, salePriceTotal);
}, [userState, salePriceTotal]);
```

---

## 12. Error Handling

### Subcategory Fetch Errors
```javascript
const fetchSubcategories = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/subcategory/category/${categoryId}`);
    setSubcategories(response.data.data || []);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    setSubcategories([]);
    // Optional: Show toast notification
    toast.error('Unable to load subcategories. Please try again.');
  }
};
```

### WhatsApp Link Fallback
```javascript
const handleWhatsAppClick = (e) => {
  try {
    window.open(whatsappUrl, '_blank');
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    // Fallback: copy number to clipboard
    navigator.clipboard.writeText(whatsappNumber);
    toast.info('WhatsApp number copied to clipboard');
  }
};
```

---

## 13. Accessibility

### ARIA Labels
```jsx
<select
  className="form-select"
  value={filterSubcategory}
  onChange={handleFilterSubcategory}
  aria-label="Filter by subcategory"
  aria-describedby="subcategory-help"
>
  <option value="">All Subcategories</option>
  {/* ... */}
</select>
<small id="subcategory-help" className="form-text">
  Select a subcategory to filter products
</small>
```

### WhatsApp Link
```jsx
<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contact us on WhatsApp for enquiries"
>
  {/* ... */}
</a>
```

---

## Summary of Changes

### ✅ Completed
1. **Subcategory Support**
   - API integration
   - Filtering in products page
   - Dynamic dropdown
   - URL parameter support

2. **WhatsApp Enquiry Link**
   - Replaced "Delivery Across India"
   - Direct WhatsApp integration
   - Pre-filled messages
   - Hover effects

3. **Delivery Charges**
   - Kerala: ₹49
   - TN/Karnataka/AP: ₹49
   - Other states: ₹79
   - Free above ₹799
   - Updated in Cart, Checkout, Shipping Policy

### 📋 Files Modified
- `client/src/services/allApi.js`
- `client/src/components/TopNav.jsx`
- `client/src/pages/Allproducts.jsx`
- `client/src/pages/ShippingPolicy.jsx`
- `client/src/pages/Cart.jsx`
- `client/src/pages/Checkout.jsx`

### 🎯 Next Steps
1. Test all features thoroughly
2. Update social media links in TopNav
3. Configure actual WhatsApp business number
4. Test delivery charge calculation with real addresses
5. Monitor analytics for subcategory usage

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: ✅ Ready for Implementation
