# Cluster Fascination Theme Guide

## 🌿 Design Overview

This project has been transformed to match the "Cluster Fascination" logo theme with a soft pastel aesthetic, elegant typography, and minimalist design principles.

## 🎨 Color Palette

### Primary Colors

- **Primary Mint**: `#B9EAD8` - Main brand color
- **Soft Mint**: `#D4F1E8` - Lighter variant
- **Light Mint**: `#E8F8F3` - Background accents
- **Dark Mint**: `#8FD4BB` - Hover states and emphasis
- **Success Green**: `#7BC8A4` - Buttons and actions

### Accent Colors

- **Accent Beige**: `#E8DCC9` - Muted earth tone
- **Accent Pink**: `#F5D5D8` - Soft floral accent
- **Soft Pink**: `#FADDE1` - Light pink variant

### Neutrals

- **Text Dark**: `#2C3E50` - Primary text
- **Text Muted**: `#6C757D` - Secondary text
- **Wreath Black**: `#1A1A1A` - Decorative elements
- **Cream White**: `#FFF9F5` - Background

## 📝 Typography

### Font Families

All fonts are loaded from Google Fonts:

- **Script Font** (`Pacifico`): Brand names and main headings
- **Elegant Script** (`Dancing Script`): Subheadings and special text
- **Serif Font** (`Cormorant Garamond`): Product names and elegant text
- **Sans Font** (`Montserrat`): Body text and UI elements
- **Signature Font** (`Great Vibes`): Decorative signatures

### Usage Examples

```jsx
// Brand name
<h1 className="brand-name">Cluster Fascination</h1>

// Elegant heading
<h2 className="elegant-script">Fashion Jewellery &amp; Accessories Store</h2>

// Signature text
<p className="signature-text">Cluster Fascination</p>
```

## 🎯 CSS Custom Properties

All theme variables are available in `:root`:

```css
/* Colors */
--primary-mint: #b9ead8;
--soft-mint: #d4f1e8;
--light-mint: #e8f8f3;
--dark-mint: #8fd4bb;
--accent-beige: #e8dcc9;
--accent-pink: #f5d5d8;
--soft-pink: #fadde1;
--text-dark: #2c3e50;
--text-muted: #6c757d;
--wreath-black: #1a1a1a;
--cream-white: #fff9f5;
--success-green: #7bc8a4;

/* Typography */
--font-script: "Pacifico", cursive;
--font-elegant-script: "Dancing Script", cursive;
--font-serif: "Cormorant Garamond", serif;
--font-sans: "Montserrat", sans-serif;
--font-signature: "Great Vibes", cursive;
```

## 🧩 Component Classes

### Buttons

```jsx
// Primary button with gradient
<button className="btn btn-cluster">Click Me</button>

// Outline button
<button className="btn btn-outline-cluster">Click Me</button>
```

### Cards

```jsx
// Elegant card with shadow
<div className="card-cluster">{/* Content */}</div>
```

### Watercolor Backgrounds

```jsx
// Section with watercolor effect
<section className="watercolor-bg">
  {/* Content */}
</section>

// Individual watercolor spots
<div className="watercolor-spot spot-mint"
     style={{width: '300px', height: '300px', top: '10%', right: '5%'}}>
</div>
```

### Badges and Tags

```jsx
<span className="badge-cluster">New</span>
```

### Decorative Elements

```jsx
// Flower accent
<span className="flower-accent">✿</span>

// Section divider
<div className="section-divider"></div>
```

## 🖼️ Decorative SVG Components

Import decorative elements from `components/DecorativeElements.jsx`:

```jsx
import {
  WreathDecoration,
  FlowerAccent,
  LeafDecoration,
  BranchDecoration,
  CornerDecoration,
  SectionDivider
} from './components/DecorativeElements';

// Usage
<WreathDecoration size={150} style={{opacity: 0.5}} />
<FlowerAccent size={30} color="#F5D5D8" />
<LeafDecoration size={40} />
<BranchDecoration width={100} />
<CornerDecoration size={80} />
<SectionDivider width={200} />
```

## 🎭 Component Styling

### Products

- Rounded cards with 20px border radius
- Hover effects with scale and shadow
- Watercolor gradient overlay on hover
- Smooth transitions (0.4s ease)

### Categories

- Large rounded cards (25px border radius)
- Flower accent appears on hover
- Image zoom and watercolor overlay
- Elegant script typography for titles

### Reviews

- Left border accent in mint green
- Rounded corners (20px)
- Hover slide effect
- Watercolor background

### Navigation

- Gradient background from mint to light mint
- Underline animation on hover
- Circular icon buttons with borders
- Floating logo animation

### Footer

- Dark gradient background
- Elegant script headings in theme colors
- Hover color transitions
- Signature font for brand name

## 🌊 Watercolor Effects

### Background Gradients

```css
background: linear-gradient(
  135deg,
  var(--cream-white) 0%,
  var(--light-mint) 100%
);
```

### Spot Decorations

Use watercolor spots for subtle background effects:

```jsx
<div
  className="watercolor-spot spot-mint"
  style={{
    width: "300px",
    height: "300px",
    top: "-100px",
    right: "10%",
  }}
></div>
```

## 🎬 Animations

### Floating Element

```jsx
<div className="floating-element">{/* Content will float gently */}</div>
```

### Hover Transforms

- Cards: `translateY(-8px)` with increased shadow
- Images: `scale(1.05)` on hover
- Buttons: `scale(1.05)` with gradient reverse

## 📱 Responsive Design

All components are mobile-responsive with breakpoints:

- **Small** (576px+): Adjusted heights and spacing
- **Medium** (768px+): Increased font sizes
- **Large** (992px+): Full desktop experience

## 🎨 Design Principles

1. **Minimalist**: Clean layouts with ample whitespace
2. **Elegant**: Sophisticated typography and subtle animations
3. **Organic**: Watercolor effects and natural decorative elements
4. **Accessible**: High contrast ratios and clear hierarchy
5. **Cohesive**: Consistent use of theme colors throughout

## 🚀 Quick Start

1. All theme variables are globally available in CSS
2. Import decorative components as needed
3. Use utility classes for consistent styling
4. Combine watercolor backgrounds with decorative SVGs
5. Apply elegant script fonts for headings

## 💡 Best Practices

- Use `var(--primary-mint)` instead of hardcoded colors
- Prefer `font-family: var(--font-script)` for brand elements
- Add watercolor spots sparingly for subtle effects
- Maintain 20-25px border radius for consistency
- Use 0.3-0.4s transitions for smooth interactions

## 🎯 Examples

### Hero Section

```jsx
<section className="watercolor-bg py-5">
  <div
    className="watercolor-spot spot-mint"
    style={{ width: "400px", height: "400px", top: "-50px", right: "5%" }}
  ></div>
  <div className="container text-center">
    <h1 className="brand-name mb-3">Cluster Fascination</h1>
    <p className="elegant-script" style={{ fontSize: "24px" }}>
      Fashion Jewellery & Accessories Store{" "}
    </p>
    <SectionDivider width={200} />
    <button className="btn btn-cluster mt-4">Explore Collection</button>
  </div>
</section>
```

### Product Card

```jsx
<div className="product-card">
  <img src={product.image} alt={product.name} />
  <div className="product-info">
    <h5>{product.name}</h5>
    <p className="price">₹{product.salePrice}</p>
    <p className="original-price">₹{product.originalPrice}</p>
    <div className="product-actions">
      <button className="btn-add-cart">Add to Cart</button>
      <button className="btn-wishlist">♡</button>
    </div>
  </div>
</div>
```

---

**Created for Cluster Fascination Boutique Wellness**  
_Designed with elegance and nature in mind_ 🌿✿
