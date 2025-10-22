/**
 * Theme Normalization Utility
 * Ensures all required theme properties exist with safe fallbacks
 */

// Default fallback values for missing theme properties
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
  sliderBoxShadow: {
    thumb: '0 1px 13px 0 rgba(0,0,0,0.2)',
  },
  tabsBoxShadow: {
    indicator: '0 1px 5px 1px rgba(0,0,0,1)',
  },
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

/**
 * Safely merge theme properties with fallbacks
 */
export const normalizeTheme = (theme) => {
  if (!theme) return {};

  return {
    ...theme,
    // Ensure borders exists with fallbacks
    borders: {
      ...DEFAULT_BORDERS,
      ...theme.borders,
      borderRadius: {
        ...DEFAULT_BORDERS.borderRadius,
        ...theme.borders?.borderRadius,
      },
      borderWidth: {
        ...DEFAULT_BORDERS.borderWidth,
        ...theme.borders?.borderWidth,
      },
    },
    // Ensure boxShadows exists with fallbacks
    boxShadows: {
      ...DEFAULT_BOX_SHADOWS,
      ...theme.boxShadows,
    },
    // Ensure functions exists with fallbacks
    functions: {
      ...DEFAULT_FUNCTIONS,
      ...theme.functions,
    },
    // Ensure palette has required structure
    palette: {
      ...theme.palette,
      // Ensure inputColors exists
      inputColors: {
        borderColor: { main: '#d2d6da' },
        error: '#f5365c',
        success: '#2dce89',
        ...theme.palette?.inputColors,
      },
    },
  };
};

/**
 * Safe destructuring utility for theme properties
 */
export const safeDestructure = (obj, fallback = {}) => {
  if (!obj || typeof obj !== 'object') return fallback;
  return obj;
};

/**
 * Safe property access with fallback
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
 * Create a theme with all required properties
 */
export const createSafeTheme = (themeConfig) => {
  const normalizedTheme = normalizeTheme(themeConfig);
  
  // Add defensive getters for commonly accessed properties
  normalizedTheme.getBorderRadius = (size = 'md') => 
    safeGet(normalizedTheme, `borders.borderRadius.${size}`, DEFAULT_BORDERS.borderRadius[size]);
  
  normalizedTheme.getBoxShadow = (type = 'md') => 
    safeGet(normalizedTheme, `boxShadows.${type}`, DEFAULT_BOX_SHADOWS[type]);
  
  normalizedTheme.getBorderColor = () => 
    safeGet(normalizedTheme, 'borders.borderColor', DEFAULT_BORDERS.borderColor);
  
  return normalizedTheme;
};


