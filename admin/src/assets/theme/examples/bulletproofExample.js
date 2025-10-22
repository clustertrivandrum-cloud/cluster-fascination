/**
 * Bulletproof Theme Usage Examples
 * Demonstrates how to use the bulletproof theme without runtime errors
 */

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createBulletproofTheme } from '../utils/bulletproofTheme';
import { createDefensiveStyled, safeColor, safeBorderRadius, safeBoxShadow } from '../utils/defensiveComponents';
import { Button, TextField, Card, CardContent } from '@mui/material';

// Example 1: Using the bulletproof theme
const bulletproofTheme = createBulletproofTheme({
  // You can override any properties safely
  colors: {
    primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
    secondary: { main: '#dc004e', light: '#ff5983', dark: '#9a0036' },
  },
  borders: {
    borderRadius: { md: '12px', lg: '16px' },
  },
  boxShadows: {
    inputBoxShadow: '0 4px 12px 0 rgba(0,0,0,0.15), 4px 6px 10px 0 rgba(0,0,0,0.1)',
  },
});

// Example 2: Defensive styled component
const DefensiveButton = createDefensiveStyled(Button)(({ theme, ownerState }) => {
  const { palette, borders, boxShadows } = safeDestructure(theme, ownerState);
  
  return {
    borderRadius: safeBorderRadius(theme, 'md'),
    boxShadow: safeBoxShadow(theme, 'md'),
    backgroundColor: safeColor(theme, 'primary.main', '#1976d2'),
    color: safeColor(theme, 'primary.contrastText', '#ffffff'),
    
    '&:hover': {
      backgroundColor: safeColor(theme, 'primary.dark', '#1565c0'),
      boxShadow: safeBoxShadow(theme, 'lg'),
    },
  };
});

// Example 3: Safe theme access in component
const SafeComponent = ({ theme }) => {
  // All these accesses are safe and will never throw errors
  const primaryColor = safeColor(theme, 'primary.main', '#1976d2');
  const borderRadius = safeBorderRadius(theme, 'md');
  const boxShadow = safeBoxShadow(theme, 'inputBoxShadow');
  
  return (
    <Card 
      sx={{ 
        borderRadius,
        boxShadow,
        backgroundColor: primaryColor,
        p: 2 
      }}
    >
      <CardContent>
        <TextField
          label="Safe Input"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: safeBorderRadius(theme, 'sm'),
              boxShadow: safeBoxShadow(theme, 'inputBoxShadow'),
            },
          }}
        />
        <DefensiveButton variant="contained" sx={{ mt: 2 }}>
          Safe Button
        </DefensiveButton>
      </CardContent>
    </Card>
  );
};

// Example 4: Complete app setup
const BulletproofApp = () => {
  return (
    <ThemeProvider theme={bulletproofTheme}>
      <SafeComponent />
    </ThemeProvider>
  );
};

// Example 5: Custom theme with overrides
const customTheme = createBulletproofTheme({
  // Override specific properties
  colors: {
    primary: { main: '#9c27b0', light: '#ba68c8', dark: '#7b1fa2' },
    info: { main: '#00bcd4', light: '#4dd0e1', dark: '#0097a7' },
  },
  borders: {
    borderRadius: { 
      xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px' 
    },
  },
  boxShadows: {
    inputBoxShadow: '0 2px 8px 0 rgba(156,39,176,0.2), 2px 4px 6px 0 rgba(156,39,176,0.1)',
    md: '0 4px 12px 0 rgba(156,39,176,0.15), 0 2px 4px 0 rgba(156,39,176,0.1)',
  },
});

export { 
  bulletproofTheme, 
  DefensiveButton, 
  SafeComponent, 
  BulletproofApp, 
  customTheme 
};


