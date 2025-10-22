/**
 * Safe theme property access utility
 * This prevents "Cannot read properties of undefined" errors
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

export const safeBorderColor = (colors) => {
  if (!colors) return '#d2d6da';
  
  // Try different possible paths for borderColor
  const borderColor = 
    safeGet(colors, 'inputColors.borderColor.main') ||
    safeGet(colors, 'inputColors.borderColor') ||
    safeGet(colors, 'borderColor') ||
    safeGet(colors, 'grey.300') ||
    '#d2d6da';
    
  return borderColor;
};

export const safeColor = (colors, colorPath, fallback = '#000000') => {
  if (!colors) return fallback;
  
  const color = safeGet(colors, colorPath);
  return color || fallback;
};

export const safeBorderWidth = (borders, width = 1) => {
  if (!borders) return '1px';
  
  const borderWidth = safeGet(borders, `borderWidth.${width}`);
  return borderWidth || `${width}px`;
};

export const safeBorderRadius = (borders, radius = 'md') => {
  if (!borders) return '8px';
  
  const borderRadius = safeGet(borders, `borderRadius.${radius}`);
  return borderRadius || '8px';
};


