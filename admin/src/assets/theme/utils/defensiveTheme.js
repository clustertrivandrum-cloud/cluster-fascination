/**
 * Defensive Theme Access Utilities
 * Prevents "Cannot read properties of undefined" errors
 */

/**
 * Safe theme destructuring with fallbacks
 */
export const safeThemeDestructure = (theme) => {
  if (!theme) {
    return {
      palette: {},
      functions: {},
      typography: {},
      borders: {},
      boxShadows: {},
    };
  }

  return {
    palette: theme.palette || {},
    functions: theme.functions || {},
    typography: theme.typography || {},
    borders: theme.borders || {},
    boxShadows: theme.boxShadows || {},
  };
};

/**
 * Safe palette destructuring
 */
export const safePaletteDestructure = (palette) => {
  if (!palette) {
    return {
      inputColors: {},
      grey: {},
      white: {},
      transparent: {},
      info: {},
      text: {},
      dark: {},
    };
  }

  return {
    inputColors: palette.inputColors || {},
    grey: palette.grey || {},
    white: palette.white || {},
    transparent: palette.transparent || {},
    info: palette.info || {},
    text: palette.text || {},
    dark: palette.dark || {},
  };
};

/**
 * Safe borders destructuring
 */
export const safeBordersDestructure = (borders) => {
  if (!borders) {
    return {
      borderRadius: { md: '8px' },
      borderWidth: { 1: '1px' },
      borderColor: '#d2d6da',
    };
  }

  return {
    borderRadius: borders.borderRadius || { md: '8px' },
    borderWidth: borders.borderWidth || { 1: '1px' },
    borderColor: borders.borderColor || '#d2d6da',
  };
};

/**
 * Safe boxShadows destructuring
 */
export const safeBoxShadowsDestructure = (boxShadows) => {
  if (!boxShadows) {
    return {
      inputBoxShadow: '0 3px 9px 0 rgba(0,0,0,0.1), 3px 4px 8px 0 rgba(0,0,0,0.1)',
      md: '0 4px 6px -1px rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.07)',
    };
  }

  return {
    inputBoxShadow: boxShadows.inputBoxShadow || '0 3px 9px 0 rgba(0,0,0,0.1), 3px 4px 8px 0 rgba(0,0,0,0.1)',
    md: boxShadows.md || '0 4px 6px -1px rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.07)',
    ...boxShadows,
  };
};

/**
 * Safe functions destructuring
 */
export const safeFunctionsDestructure = (functions) => {
  if (!functions) {
    return {
      pxToRem: (px) => `${px / 16}rem`,
      boxShadow: () => 'none',
      hexToRgb: (hex) => '0,0,0',
      linearGradient: (color, colorState) => `linear-gradient(195deg, ${color}, ${colorState})`,
      rgba: (color, opacity) => `rgba(${color}, ${opacity})`,
    };
  }

  return {
    pxToRem: functions.pxToRem || ((px) => `${px / 16}rem`),
    boxShadow: functions.boxShadow || (() => 'none'),
    hexToRgb: functions.hexToRgb || ((hex) => '0,0,0'),
    linearGradient: functions.linearGradient || ((color, colorState) => `linear-gradient(195deg, ${color}, ${colorState})`),
    rgba: functions.rgba || ((color, opacity) => `rgba(${color}, ${opacity})`),
    ...functions,
  };
};

/**
 * Safe typography destructuring
 */
export const safeTypographyDestructure = (typography) => {
  if (!typography) {
    return {
      size: { xs: '12px' },
    };
  }

  return {
    size: typography.size || { xs: '12px' },
    ...typography,
  };
};

/**
 * Complete defensive theme access
 */
export const getSafeTheme = (theme) => {
  const { palette, functions, typography, borders, boxShadows } = safeThemeDestructure(theme);
  
  return {
    palette: safePaletteDestructure(palette),
    functions: safeFunctionsDestructure(functions),
    typography: safeTypographyDestructure(typography),
    borders: safeBordersDestructure(borders),
    boxShadows: safeBoxShadowsDestructure(boxShadows),
  };
};


