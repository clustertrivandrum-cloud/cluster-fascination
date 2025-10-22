# 🛡️ Theme-Safe Coding Quick Reference

## ⚡ Quick Rules (Print & Post!)

### 1. **ALWAYS** Use Safe Destructuring

```javascript
// ❌ DANGER
const { borderRadius } = theme.borders;

// ✅ SAFE
const { borderRadius } = theme.borders || {};
```

### 2. **ALWAYS** Use Optional Chaining

```javascript
// ❌ DANGER
const color = theme.palette.info.main;

// ✅ SAFE
const color = theme.palette.info?.main || "#11cdef";
```

### 3. **ALWAYS** Check Before Dynamic Access

```javascript
// ❌ DANGER
const gradient = linearGradient(gradients[color].main, gradients[color].state);

// ✅ SAFE
const gradient =
  gradients[color]?.main && gradients[color]?.state
    ? linearGradient(gradients[color].main, gradients[color].state)
    : "transparent";
```

---

## 📋 Copy-Paste Snippets

### Safe Styled Component Template

```javascript
import { styled } from "@mui/material/styles";
import Component from "@mui/material/Component";

export default styled(Component)(({ theme, ownerState }) => {
  // ✅ Safe destructuring
  const { palette = {}, functions = {}, borders = {}, boxShadows = {} } = theme || {};
  const { color, size } = ownerState || {};

  // ✅ Safe nested destructuring
  const { primary = { main: "#5e72e4" }, gradients = {} } = palette;

  const { pxToRem = (px) => `${px}px` } = functions;

  // ✅ Safe dynamic access
  const bgColor = palette[color]?.main || primary.main;

  return {
    backgroundColor: bgColor,
    borderRadius: borders?.borderRadius?.md || "8px",
    boxShadow: boxShadows?.[size] || "none",
  };
});
```

### Safe Gradient Access

```javascript
// ✅ PATTERN 1: Inline fallback
const bg =
  gradients[color]?.main && gradients[color]?.state
    ? linearGradient(gradients[color].main, gradients[color].state)
    : "transparent";

// ✅ PATTERN 2: Function wrapper
const safeGradient = (colorKey) => {
  return gradients[colorKey]?.main && gradients[colorKey]?.state
    ? linearGradient(gradients[colorKey].main, gradients[colorKey].state)
    : palette.primary?.main || "#5e72e4";
};
```

### Safe Color Access

```javascript
// ✅ Dynamic palette access
const color = palette[colorName]?.main || palette.primary?.main || "#5e72e4";

// ✅ Nested property access
const borderColor =
  theme.palette.inputColors?.borderColor?.main ||
  theme.palette.inputColors?.borderColor ||
  "#d2d6da";
```

---

## 🚨 Common Mistakes

| ❌ **AVOID**                 | ✅ **USE INSTEAD**                  |
| ---------------------------- | ----------------------------------- |
| `theme.borders.borderRadius` | `theme.borders?.borderRadius`       |
| `palette.info.main`          | `palette.info?.main \|\| '#11cdef'` |
| `gradients[color].main`      | `gradients[color]?.main`            |
| `const { x } = theme.y;`     | `const { x } = theme.y \|\| {};`    |
| `boxShadows[size]`           | `boxShadows?.[size] \|\| 'none'`    |

---

## 🎯 Defensive Patterns Checklist

When creating a styled component, check:

- [ ] Theme destructuring has `|| {}` fallback
- [ ] Palette properties use `?.` optional chaining
- [ ] Dynamic keys use `?.[key]` syntax
- [ ] All values have `|| 'fallback'` defaults
- [ ] Functions have fallback implementations
- [ ] Arrays/objects have null checks before `.map()`, `.filter()`, etc.

---

## 🔧 Debug Helpers

### Test Your Component

```javascript
// Add this to your component for debugging
console.log("Theme structure:", {
  hasPalette: !!theme?.palette,
  hasGradients: !!theme?.palette?.gradients,
  hasFunctions: !!theme?.functions,
  borders: theme?.borders,
});
```

### Common Theme Paths

```
theme.palette.primary.main
theme.palette.gradients[color].main
theme.borders.borderRadius.md
theme.boxShadows.md
theme.functions.pxToRem
theme.typography.size.md
```

---

## 📚 More Resources

- Full guide: `THEME_FIX_COMPLETE_GUIDE.md`
- Defensive utils: `src/assets/theme/utils/defensiveComponents.js`
- Bulletproof theme: `src/assets/theme/utils/bulletproofTheme.js`

---

## ✨ One-Liner Reminders

> **"Never trust the theme exists"**  
> **"Optional chain everything"**  
> **"Fallbacks are your friends"**  
> **"Default parameters save lives"**

---

_Last Updated: October 21, 2025_  
_Keep this handy while coding! 📌_

