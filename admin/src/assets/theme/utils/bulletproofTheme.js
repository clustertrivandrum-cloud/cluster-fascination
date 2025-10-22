/**
 * Bulletproof Theme Configuration
 * Prevents ALL "Cannot read properties of undefined" errors
 */

import { createTheme } from "@mui/material/styles";

// Default fallback values for all theme properties
const DEFAULT_COLORS = {
  primary: { main: '#5e72e4', light: '#825ee4', dark: '#4c63d2' },
  secondary: { main: '#8392ab', light: '#a8b8d8', dark: '#6c7b8a' },
  info: { main: '#11cdef', light: '#4dd4f0', dark: '#0ea5c7' },
  success: { main: '#2dce89', light: '#5dd9a3', dark: '#26ad6f' },
  warning: { main: '#fb6340', light: '#fc8a6b', dark: '#e84d1a' },
  error: { main: '#f5365c', light: '#f76b7d', dark: '#d62a4a' },
  white: { main: '#ffffff' },
  dark: { main: '#344767' },
  text: { main: '#67748e', focus: '#8392ab' },
  grey: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#000000',
  },
  transparent: { main: 'transparent' },
  inputColors: {
    borderColor: { main: '#d2d6da' },
    error: '#f5365c',
    success: '#2dce89',
  },
};

const DEFAULT_BORDERS = {
  borderColor: '#d2d6da',
  borderWidth: {
    0: 0,
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
  },
  borderRadius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    section: '160px',
  },
};

const DEFAULT_BOX_SHADOWS = {
  xs: '0 2px 9px -5px rgba(0,0,0,0.15)',
  sm: '0 5px 10px 0 rgba(0,0,0,0.12)',
  md: '0 4px 6px -1px rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.07)',
  lg: '0 8px 26px -4px rgba(0,0,0,0.15), 0 8px 9px -5px rgba(0,0,0,0.06)',
  xl: '0 23px 45px -11px rgba(0,0,0,0.25)',
  xxl: '0 20px 27px 0 rgba(0,0,0,0.05)',
  inset: '0 1px 2px 0 rgba(0,0,0,0.075) inset',
  navbarBoxShadow: '0 0 1px 1px rgba(255,255,255,0.9) inset, 0 20px 27px 0 rgba(0,0,0,0.05)',
  cardBoxShadow: '0 0 16px 0 rgba(0,0,0,0.075)',
  buttonBoxShadow: {
    main: '0 4px 6px 0 rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.08)',
    stateOf: '0 7px 14px 0 rgba(0,0,0,0.1), 0 3px 6px 0 rgba(0,0,0,0.08)',
    stateOfNotHover: '0 0 0 3.2px rgba(0,0,0,0.5)',
  },
  inputBoxShadow: '0 3px 9px 0 rgba(0,0,0,0.1), 3px 4px 8px 0 rgba(0,0,0,0.1)',
  sliderBoxShadow: { thumb: '0 1px 13px 0 rgba(0,0,0,0.2)' },
  tabsBoxShadow: { indicator: '0 1px 5px 1px rgba(0,0,0,1)' },
};

const DEFAULT_FUNCTIONS = {
  boxShadow: (offset, blur, color, opacity = 1, inset = '') => 
    `${inset} ${offset[0]}px ${offset[1]}px ${blur[0]}px ${blur[1]}px rgba(${color}, ${opacity})`,
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0,0,0';
  },
  linearGradient: (color, colorState, angle = 195) => 
    `linear-gradient(${angle}deg, ${color}, ${colorState})`,
  pxToRem: (px) => `${px / 16}rem`,
  rgba: (color, opacity) => `rgba(${color}, ${opacity})`,
};

const DEFAULT_TYPOGRAPHY = {
  size: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  fontFamily: [
    '"Roboto"',
    '"Helvetica"',
    '"Arial"',
    'sans-serif',
  ].join(','),
};

/**
 * Create a bulletproof theme with all required properties
 */
export const createBulletproofTheme = (customTheme = {}) => {
  // Merge with defaults to ensure all properties exist
  const safeColors = { ...DEFAULT_COLORS, ...customTheme.colors };
  const safeBorders = { ...DEFAULT_BORDERS, ...customTheme.borders };
  const safeBoxShadows = { ...DEFAULT_BOX_SHADOWS, ...customTheme.boxShadows };
  const safeFunctions = { ...DEFAULT_FUNCTIONS, ...customTheme.functions };
  const safeTypography = { ...DEFAULT_TYPOGRAPHY, ...customTheme.typography };

  // Merge custom palette with defaults
  const customPalette = customTheme.palette || {};
  const safePalette = {
    mode: customPalette.mode || 'light',
    primary: {
      main: customPalette.primary?.main || safeColors.primary.main,
      light: customPalette.primary?.light || safeColors.primary.light,
      dark: customPalette.primary?.dark || safeColors.primary.dark,
      contrastText: customPalette.primary?.contrastText || '#ffffff',
    },
    secondary: {
      main: customPalette.secondary?.main || safeColors.secondary.main,
      light: customPalette.secondary?.light || safeColors.secondary.light,
      dark: customPalette.secondary?.dark || safeColors.secondary.dark,
      contrastText: customPalette.secondary?.contrastText || '#ffffff',
    },
    info: {
      main: customPalette.info?.main || safeColors.info.main,
      light: customPalette.info?.light || safeColors.info.light,
      dark: customPalette.info?.dark || safeColors.info.dark,
      contrastText: customPalette.info?.contrastText || '#ffffff',
    },
    success: {
      main: customPalette.success?.main || safeColors.success.main,
      light: customPalette.success?.light || safeColors.success.light,
      dark: customPalette.success?.dark || safeColors.success.dark,
      contrastText: customPalette.success?.contrastText || '#ffffff',
    },
    warning: {
      main: customPalette.warning?.main || safeColors.warning.main,
      light: customPalette.warning?.light || safeColors.warning.light,
      dark: customPalette.warning?.dark || safeColors.warning.dark,
      contrastText: customPalette.warning?.contrastText || '#ffffff',
    },
    error: {
      main: customPalette.error?.main || safeColors.error.main,
      light: customPalette.error?.light || safeColors.error.light,
      dark: customPalette.error?.dark || safeColors.error.dark,
      contrastText: customPalette.error?.contrastText || '#ffffff',
    },
    background: {
      default: customPalette.background?.default || '#f8f9fa',
      paper: customPalette.background?.paper || safeColors.white.main,
    },
    text: {
      primary: customPalette.text?.primary || safeColors.text.main,
      secondary: customPalette.text?.secondary || safeColors.text.focus,
      disabled: customPalette.text?.disabled || '#adb5bd',
    },
    divider: customPalette.divider || safeColors.grey[300],
    grey: customPalette.grey || safeColors.grey,
    // Add custom palette properties
    inputColors: customPalette.inputColors || safeColors.inputColors,
    white: customPalette.white || safeColors.white,
    dark: customPalette.dark || safeColors.dark,
    transparent: customPalette.transparent || safeColors.transparent,
  };

  return createTheme({
    // Material-UI standard properties
    palette: safePalette,
    typography: {
      fontFamily: safeTypography.fontFamily,
      ...safeTypography,
    },
    shape: {
      borderRadius: safeBorders.borderRadius.md,
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],
    
    // Custom theme properties with comprehensive fallbacks
    borders: safeBorders,
    boxShadows: safeBoxShadows,
    functions: safeFunctions,
    
    // Additional custom properties for backward compatibility
    customColors: safeColors,
    customBorders: safeBorders,
    customBoxShadows: safeBoxShadows,
    
    // Spread any additional custom theme properties
    ...customTheme,
  });
};

/**
 * Safe theme access utilities
 */
export const safeThemeAccess = {
  getBorderRadius: (theme, size = 'md') => 
    theme?.borders?.borderRadius?.[size] || DEFAULT_BORDERS.borderRadius[size],
  
  getBoxShadow: (theme, type = 'md') => 
    theme?.boxShadows?.[type] || DEFAULT_BOX_SHADOWS[type],
  
  getBorderColor: (theme) => 
    theme?.borders?.borderColor || DEFAULT_BORDERS.borderColor,
  
  getColor: (theme, colorPath, fallback = '#000000') => {
    const keys = colorPath.split('.');
    let current = theme?.palette;
    for (const key of keys) {
      current = current?.[key];
      if (!current) return fallback;
    }
    return current || fallback;
  },
  
  getFunction: (theme, functionName, fallback) => 
    theme?.functions?.[functionName] || fallback,
};
