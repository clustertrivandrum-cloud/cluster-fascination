/**
 * EXAMPLE: How to Create a Theme-Safe Styled Component
 * 
 * This file demonstrates best practices for creating styled components
 * that won't crash from undefined theme properties.
 * 
 * Copy this pattern when creating new styled components!
 */

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

/**
 * ✅ SAFE COMPONENT EXAMPLE
 * This component safely accesses all theme properties with proper fallbacks
 */
const SafeCard = styled(Box)(({ theme, ownerState }) => {
  // ═══════════════════════════════════════════════════════════
  // STEP 1: Safe Theme Destructuring with Defaults
  // ═══════════════════════════════════════════════════════════
  const { 
    palette = {}, 
    functions = {}, 
    typography = {},
    borders = {}, 
    boxShadows = {},
    spacing = () => 8 
  } = theme || {};

  // ═══════════════════════════════════════════════════════════
  // STEP 2: Safe Owner State Destructuring
  // ═══════════════════════════════════════════════════════════
  const { 
    color = 'primary',
    variant = 'contained',
    elevation = 'md',
    rounded = false,
    bordered = false
  } = ownerState || {};

  // ═══════════════════════════════════════════════════════════
  // STEP 3: Safe Palette Destructuring with Fallbacks
  // ═══════════════════════════════════════════════════════════
  const { 
    primary = { main: '#5e72e4', light: '#825ee4', dark: '#4c63d2' },
    secondary = { main: '#8392ab' },
    white = { main: '#ffffff' },
    dark = { main: '#344767' },
    grey = { 200: '#dee2e6', 300: '#ced4da' },
    transparent = { main: 'transparent' },
    gradients = {}
  } = palette;

  // ═══════════════════════════════════════════════════════════
  // STEP 4: Safe Functions Destructuring with Fallback Implementations
  // ═══════════════════════════════════════════════════════════
  const { 
    pxToRem = (px) => `${px / 16}rem`,
    linearGradient = (color1, color2) => `linear-gradient(195deg, ${color1}, ${color2})`,
    rgba = (color, opacity) => `rgba(${color}, ${opacity})`,
    boxShadow = (offset, blur, color, opacity) => {
      const [x, y] = offset;
      const [blurX, blurY] = blur;
      return `${x}px ${y}px ${blurX}px ${blurY}px rgba(${color}, ${opacity})`;
    }
  } = functions;

  // ═══════════════════════════════════════════════════════════
  // STEP 5: Safe Typography Destructuring
  // ═══════════════════════════════════════════════════════════
  const { 
    size: fontSize = { xs: '12px', sm: '14px', md: '16px', lg: '18px' },
    fontWeightRegular = 400,
    fontWeightBold = 700
  } = typography;

  // ═══════════════════════════════════════════════════════════
  // STEP 6: Safe Borders & BoxShadows Access
  // ═══════════════════════════════════════════════════════════
  const borderRadius = borders?.borderRadius?.md || '8px';
  const borderRadiusLarge = borders?.borderRadius?.xl || '16px';
  const borderWidth = borders?.borderWidth?.[2] || '2px';
  const borderColor = borders?.borderColor || grey[300];

  const shadow = boxShadows?.[elevation] || boxShadows?.md || 'none';

  // ═══════════════════════════════════════════════════════════
  // STEP 7: Safe Dynamic Color Access
  // ═══════════════════════════════════════════════════════════
  // Get color from palette dynamically with multiple fallback levels
  const getColorSafe = (colorKey) => {
    return palette[colorKey]?.main 
      || palette.primary?.main 
      || primary.main;
  };

  // ═══════════════════════════════════════════════════════════
  // STEP 8: Safe Gradient Access
  // ═══════════════════════════════════════════════════════════
  const getGradientSafe = (colorKey) => {
    // Check if gradient exists for this color
    if (gradients[colorKey]?.main && gradients[colorKey]?.state) {
      return linearGradient(gradients[colorKey].main, gradients[colorKey].state);
    }
    
    // Fallback to solid color gradient
    const solidColor = getColorSafe(colorKey);
    return linearGradient(solidColor, solidColor);
  };

  // ═══════════════════════════════════════════════════════════
  // STEP 9: Calculate Styles Based on Variant
  // ═══════════════════════════════════════════════════════════
  let backgroundColor, textColor, border, boxShadowValue;

  if (variant === 'contained') {
    backgroundColor = getColorSafe(color);
    textColor = white.main;
    border = 'none';
    boxShadowValue = shadow;
  } else if (variant === 'outlined') {
    backgroundColor = transparent.main;
    textColor = getColorSafe(color);
    border = `${borderWidth} solid ${getColorSafe(color)}`;
    boxShadowValue = 'none';
  } else if (variant === 'gradient') {
    backgroundColor = 'transparent';
    textColor = white.main;
    border = 'none';
    boxShadowValue = shadow;
    // Background image for gradient
    backgroundColor = getGradientSafe(color);
  } else {
    // Default variant
    backgroundColor = grey[200];
    textColor = dark.main;
    border = 'none';
    boxShadowValue = 'none';
  }

  // Add border if bordered prop is true
  if (bordered && variant !== 'outlined') {
    border = `${borderWidth} solid ${borderColor}`;
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 10: Return Styles Object
  // ═══════════════════════════════════════════════════════════
  return {
    // Base styles
    padding: spacing(2),
    borderRadius: rounded ? borderRadiusLarge : borderRadius,
    backgroundColor: backgroundColor,
    color: textColor,
    border: border,
    boxShadow: boxShadowValue,
    
    // Typography
    fontSize: fontSize.md,
    fontWeight: fontWeightRegular,
    
    // Transitions
    transition: 'all 0.3s ease-in-out',
    
    // Hover state with safe access
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: boxShadows?.lg || boxShadows?.md || shadow,
    },
    
    // Focus state
    '&:focus': {
      outline: `2px solid ${palette[color]?.main || primary.main}`,
      outlineOffset: '2px',
    },
    
    // Disabled state
    '&:disabled, &.disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  };
});

export default SafeCard;

/**
 * ═══════════════════════════════════════════════════════════
 * USAGE EXAMPLES
 * ═══════════════════════════════════════════════════════════
 */

/*
// Example 1: Basic usage
<SafeCard color="primary" variant="contained">
  This is a safe card component
</SafeCard>

// Example 2: With gradient
<SafeCard color="info" variant="gradient" elevation="lg">
  Gradient card with large shadow
</SafeCard>

// Example 3: Outlined with border
<SafeCard color="success" variant="outlined" bordered rounded>
  Outlined card with rounded corners
</SafeCard>

// Example 4: Using in your component
import SafeCard from './EXAMPLE_SAFE_COMPONENT';

function MyComponent() {
  return (
    <SafeCard 
      color="error" 
      variant="contained" 
      elevation="md"
      sx={{ maxWidth: 400 }}
    >
      <h2>Error Card</h2>
      <p>This will never crash from undefined theme properties!</p>
    </SafeCard>
  );
}
*/

/**
 * ═══════════════════════════════════════════════════════════
 * KEY SAFETY PATTERNS USED IN THIS EXAMPLE
 * ═══════════════════════════════════════════════════════════
 * 
 * 1. ✅ Default parameters in destructuring:
 *    const { palette = {} } = theme || {};
 * 
 * 2. ✅ Optional chaining for nested properties:
 *    borders?.borderRadius?.md
 * 
 * 3. ✅ Multiple fallback levels:
 *    palette[color]?.main || palette.primary?.main || primary.main
 * 
 * 4. ✅ Existence checks before complex operations:
 *    if (gradients[colorKey]?.main && gradients[colorKey]?.state)
 * 
 * 5. ✅ Fallback function implementations:
 *    pxToRem = (px) => `${px / 16}rem`
 * 
 * 6. ✅ Safe dynamic key access:
 *    palette[color]?.main (not palette[color].main)
 * 
 * 7. ✅ Helper functions for complex access patterns:
 *    getColorSafe(), getGradientSafe()
 * 
 * 8. ✅ Default values for all variables:
 *    const { color = 'primary' } = ownerState || {};
 * 
 * ═══════════════════════════════════════════════════════════
 * TESTING THIS COMPONENT
 * ═══════════════════════════════════════════════════════════
 * 
 * Test with incomplete theme:
 * 
 * const incompleteTheme = createTheme({
 *   palette: {
 *     primary: { main: '#5e72e4' }
 *     // Missing: gradients, borders, boxShadows, etc.
 *   }
 * });
 * 
 * <ThemeProvider theme={incompleteTheme}>
 *   <SafeCard color="primary" variant="gradient">
 *     Should render without crashing!
 *   </SafeCard>
 * </ThemeProvider>
 * 
 * ═══════════════════════════════════════════════════════════
 */

/**
 * ⚠️ COMPARISON: UNSAFE vs SAFE
 * ═══════════════════════════════════════════════════════════
 */

// ❌ UNSAFE VERSION (Will crash if theme properties are undefined)
/*
const UnsafeCard = styled(Box)(({ theme, ownerState }) => {
  const { palette, functions, borders } = theme;  // ❌ No fallback
  const { color, variant } = ownerState;  // ❌ No fallback
  
  const { gradients } = palette;  // ❌ No fallback
  const { linearGradient } = functions;  // ❌ No fallback
  const { borderRadius } = borders;  // ❌ No fallback
  
  // ❌ CRASH: If gradients[color] is undefined
  const background = linearGradient(gradients[color].main, gradients[color].state);
  
  return {
    background,
    borderRadius: borderRadius.md,  // ❌ CRASH: If borderRadius is undefined
  };
});
*/

// ✅ SAFE VERSION (Will never crash, uses fallbacks)
/*
const SafeCardFixed = styled(Box)(({ theme, ownerState }) => {
  const { palette = {}, functions = {}, borders = {} } = theme || {};  // ✅ Fallbacks
  const { color = 'primary', variant = 'contained' } = ownerState || {};  // ✅ Defaults
  
  const { gradients = {} } = palette;  // ✅ Fallback
  const { linearGradient = (c1, c2) => `linear-gradient(${c1}, ${c2})` } = functions;  // ✅ Fallback
  const { borderRadius = { md: '8px' } } = borders;  // ✅ Fallback
  
  // ✅ SAFE: Checks if gradient exists before using
  const background = gradients[color]?.main && gradients[color]?.state
    ? linearGradient(gradients[color].main, gradients[color].state)
    : 'transparent';
  
  return {
    background,
    borderRadius: borderRadius.md || '8px',  // ✅ Additional fallback
  };
});
*/

/**
 * ═══════════════════════════════════════════════════════════
 * REMEMBER
 * ═══════════════════════════════════════════════════════════
 * 
 * "Never trust the theme exists"
 * "Optional chain everything"
 * "Fallbacks are your friends"
 * "Default parameters save lives"
 * 
 * Copy this file and modify it for your own components!
 * ═══════════════════════════════════════════════════════════
 */


