# Cluster Fascination - Quick Theme Reference 🌿

## Colors (Copy & Paste Ready)

```css
/* Mint Greens */
--primary-mint: #B9EAD8
--soft-mint: #D4F1E8
--light-mint: #E8F8F3
--dark-mint: #8FD4BB
--success-green: #7BC8A4

/* Accents */
--accent-beige: #E8DCC9
--accent-pink: #F5D5D8
--soft-pink: #FADDE1

/* Neutrals */
--text-dark: #2C3E50
--text-muted: #6C757D
--wreath-black: #1A1A1A
--cream-white: #FFF9F5
```

## Typography Classes

| Class             | Font           | Use For                   |
| ----------------- | -------------- | ------------------------- |
| `.brand-name`     | Pacifico       | Brand name, main logo     |
| `.elegant-script` | Dancing Script | Subheadings, special text |
| `.signature-text` | Great Vibes    | Decorative signatures     |
| Default           | Montserrat     | Body text, UI             |

## Common Components

### Buttons

```jsx
<button className="btn btn-cluster">Primary Button</button>
<button className="btn btn-outline-cluster">Outline Button</button>
```

### Cards

```jsx
<div className="card-cluster">Your content</div>
```

### Watercolor Section

```jsx
<section className="watercolor-bg">
  <div
    className="watercolor-spot spot-mint"
    style={{ width: "300px", height: "300px", top: "10%", right: "5%" }}
  ></div>
  {/* Content */}
</section>
```

### Decorative Elements

```jsx
import { WreathDecoration, FlowerAccent, SectionDivider } from './components/DecorativeElements';

<WreathDecoration size={150} />
<FlowerAccent size={30} color="#F5D5D8" />
<SectionDivider width={200} />
```

## Utility Classes

| Class               | Effect                     |
| ------------------- | -------------------------- |
| `.flower-accent`    | Pink flower emoji spacing  |
| `.section-divider`  | Horizontal decorative line |
| `.floating-element` | Gentle float animation     |
| `.watercolor-spot`  | Blurred color spot         |
| `.spot-mint`        | Mint green watercolor      |
| `.spot-pink`        | Pink watercolor            |
| `.spot-beige`       | Beige watercolor           |
| `.badge-cluster`    | Themed badge/tag           |

## Common Patterns

### Hero Section

```jsx
<div className="watercolor-bg py-5">
  <h1 className="brand-name">Cluster Fascination</h1>
  <p className="elegant-script">Your tagline</p>
</div>
```

### Section Header

```jsx
<h2 className="elegant-script" style={{fontSize: '2.5rem', color: 'var(--text-dark)'}}>
  Section Title
</h2>
<div className="section-divider"></div>
```

### Icon Button (Cart/Wishlist)

```jsx
<button
  className="btn position-relative"
  style={{
    background: "white",
    border: "2px solid var(--primary-mint)",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  }}
>
  <i className="fa-solid fa-heart"></i>
</button>
```

## Border Radius Standards

- Cards: `20-25px`
- Buttons: `20-25px`
- Images: `15-20px`
- Badges: `20px`

## Animation Timing

- Hover transitions: `0.3-0.4s ease`
- Transform animations: `0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`

## Shadow Standards

```css
/* Light shadow */
box-shadow: 0 3px 15px rgba(185, 234, 216, 0.1);

/* Medium shadow */
box-shadow: 0 5px 20px rgba(185, 234, 216, 0.15);

/* Heavy shadow (hover) */
box-shadow: 0 12px 35px rgba(185, 234, 216, 0.3);
```

## Gradient Patterns

### Primary Gradient

```css
background: linear-gradient(
  135deg,
  var(--primary-mint) 0%,
  var(--dark-mint) 100%
);
```

### Soft Background

```css
background: linear-gradient(
  135deg,
  var(--cream-white) 0%,
  var(--light-mint) 100%
);
```

### Multi-color

```css
background: linear-gradient(
  135deg,
  var(--cream-white) 0%,
  var(--light-mint) 50%,
  var(--soft-pink) 100%
);
```

## Font Sizes

| Element      | Desktop     | Mobile  |
| ------------ | ----------- | ------- |
| H1 (Script)  | 3rem        | 2rem    |
| H2 (Elegant) | 2.5rem      | 1.8rem  |
| H3           | 2rem        | 1.5rem  |
| Body         | 1rem        | 0.95rem |
| Small        | 0.85-0.9rem | 0.8rem  |

## Spacing Standards

- Section padding: `60px 0` (desktop), `40px 0` (mobile)
- Card padding: `20-25px`
- Gap between elements: `15-25px`

## Decorative Emojis

- 🌿 Leaf/nature theme
- ✿ Flower accents
- 🌸 Blossom for special sections

---

**Quick Tip**: Always use CSS variables for colors instead of hardcoded values for consistency!
