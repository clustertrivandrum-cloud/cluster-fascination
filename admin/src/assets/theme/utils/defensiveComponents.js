/**
 * Defensive Component Utilities
 * Prevents theme-related runtime errors in styled components
 */

import { styled } from "@mui/material/styles";
import { safeThemeAccess } from "./bulletproofTheme";

/**
 * Safe theme destructuring with comprehensive fallbacks
 */
export const safeDestructure = (theme, ownerState = {}) => {
  // Ensure theme exists
  if (!theme) {
    console.warn('Theme is undefined, using fallback values');
    return {
      palette: {},
      functions: {},
      typography: {},
      borders: {},
      boxShadows: {},
      ownerState: ownerState || {},
    };
  }

  return {
    // Safe palette destructuring
    palette: {
      inputColors: theme.palette?.inputColors || {
        borderColor: { main: '#d2d6da' },
        error: '#f5365c',
        success: '#2dce89',
      },
      grey: theme.palette?.grey || {
        50: '#f8f9fa', 100: '#e9ecef', 200: '#dee2e6', 300: '#ced4da',
        400: '#adb5bd', 500: '#6c757d', 600: '#495057', 700: '#343a40',
        800: '#212529', 900: '#000000',
      },
      white: theme.palette?.white || { main: '#ffffff' },
      transparent: theme.palette?.transparent || { main: 'transparent' },
      info: theme.palette?.info || { main: '#11cdef' },
      text: theme.palette?.text || { main: '#67748e' },
      dark: theme.palette?.dark || { main: '#344767' },
      ...theme.palette,
    },
    
    // Safe functions destructuring
    functions: {
      pxToRem: theme.functions?.pxToRem || ((px) => `${px / 16}rem`),
      boxShadow: theme.functions?.boxShadow || (() => 'none'),
      hexToRgb: theme.functions?.hexToRgb || ((hex) => '0,0,0'),
      linearGradient: theme.functions?.linearGradient || ((color, colorState) => `linear-gradient(195deg, ${color}, ${colorState})`),
      rgba: theme.functions?.rgba || ((color, opacity) => `rgba(${color}, ${opacity})`),
      ...theme.functions,
    },
    
    // Safe typography destructuring
    typography: {
      size: theme.typography?.size || { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px' },
      ...theme.typography,
    },
    
    // Safe borders destructuring
    borders: {
      borderRadius: theme.borders?.borderRadius || { md: '8px' },
      borderWidth: theme.borders?.borderWidth || { 1: '1px' },
      borderColor: theme.borders?.borderColor || '#d2d6da',
      ...theme.borders,
    },
    
    // Safe boxShadows destructuring
    boxShadows: {
      inputBoxShadow: theme.boxShadows?.inputBoxShadow || '0 3px 9px 0 rgba(0,0,0,0.1), 3px 4px 8px 0 rgba(0,0,0,0.1)',
      md: theme.boxShadows?.md || '0 4px 6px -1px rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.07)',
      ...theme.boxShadows,
    },
    
    // Owner state with fallbacks
    ownerState: {
      size: 'medium',
      error: false,
      success: false,
      disabled: false,
      darkMode: false,
      ...ownerState,
    },
  };
};

/**
 * Create a defensive styled component wrapper
 */
export const createDefensiveStyled = (Component) => {
  return styled(Component)(({ theme, ownerState }) => {
    // Get safe theme with all fallbacks
    const { palette, functions, typography, borders, boxShadows, ownerState: safeOwnerState } = 
      safeDestructure(theme, ownerState);

    // Extract commonly used properties safely
    const { inputColors, grey, white, transparent, info, text, dark } = palette;
    const { inputBoxShadow } = boxShadows;
    const { pxToRem, boxShadow } = functions;
    const { size: fontSize } = typography;
    const { borderRadius } = borders;
    const { size, error, success, iconDirection, disabled, darkMode } = safeOwnerState;

    // Return safe styles with fallbacks
    return {
      // Base styles with safe property access
      backgroundColor: disabled ? `${grey[200] || '#e9ecef'} !important` : white.main || '#ffffff',
      borderColor: inputColors.borderColor?.main || inputColors.borderColor || '#d2d6da',
      borderRadius: borderRadius.md || '8px',
      fontSize: fontSize[size] || fontSize.md || '16px',
      
      // Safe property access for all nested properties
      '&.Mui-focused': {
        borderColor: info.main || '#11cdef',
        boxShadow: inputBoxShadow || '0 3px 9px 0 rgba(0,0,0,0.1)',
      },
      
      // Error state with safe access
      ...(error && {
        borderColor: inputColors.error || '#f5365c',
        '&.Mui-focused': {
          borderColor: inputColors.error || '#f5365c',
          boxShadow: `${boxShadow([0, 3], [9, 0], inputColors.error || '#f5365c', 0)}, ${boxShadow(
            [3, 4],
            [8, 0],
            inputColors.error || '#f5365c',
            0.1
          )}`,
        },
      }),
      
      // Success state with safe access
      ...(success && {
        borderColor: inputColors.success || '#2dce89',
        '&.Mui-focused': {
          borderColor: inputColors.success || '#2dce89',
          boxShadow: `${boxShadow([0, 3], [9, 0], inputColors.success || '#2dce89', 0)}, ${boxShadow(
            [3, 4],
            [8, 0],
            inputColors.success || '#2dce89',
            0.1
          )}`,
        },
      }),
    };
  });
};

/**
 * Safe property access utility
 */
export const safeGet = (obj, path, defaultValue = '') => {
  if (!obj) return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current !== undefined ? current : defaultValue;
};

/**
 * Safe color access with fallback
 */
export const safeColor = (theme, colorPath, fallback = '#000000') => {
  return safeGet(theme, `palette.${colorPath}`, fallback);
};

/**
 * Safe border radius access
 */
export const safeBorderRadius = (theme, size = 'md') => {
  return safeGet(theme, `borders.borderRadius.${size}`, '8px');
};

/**
 * Safe box shadow access
 */
export const safeBoxShadow = (theme, type = 'md') => {
  return safeGet(theme, `boxShadows.${type}`, '0 4px 6px -1px rgba(0,0,0,0.12)');
};


