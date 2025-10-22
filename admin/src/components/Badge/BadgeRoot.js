/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export default styled(Badge)(({ theme, ownerState }) => {
  // ✅ Safe destructuring with defaults
  const { palette = {}, typography = {}, borders = {}, functions = {} } = theme || {};
  const { color, circular, border, size, indicator, variant, container, children } = ownerState || {};

  // ✅ Safe palette destructuring with fallbacks
  const { 
    white = { main: '#ffffff' }, 
    dark = { main: '#344767' }, 
    gradients = {}, 
    badgeColors = {} 
  } = palette;
  
  // ✅ Safe typography destructuring with fallbacks
  const { 
    size: fontSize = { xxs: '10px', xs: '12px' }, 
    fontWeightBold = 600 
  } = typography;
  
  // ✅ Safe borders destructuring with fallbacks
  const { 
    borderRadius = { sm: '4px', md: '8px', section: '50%' }, 
    borderWidth = { 3: '3px' } 
  } = borders;
  
  // ✅ Safe functions destructuring with fallbacks
  const { 
    pxToRem = (px) => `${px}px`, 
    linearGradient = (c1, c2) => `linear-gradient(195deg, ${c1}, ${c2})` 
  } = functions;

  // padding values
  const paddings = {
    xs: "0.45em 0.775em",
    sm: "0.55em 0.9em",
    md: "0.65em 1em",
    lg: "0.85em 1.375em",
  };

  // fontSize value
  const fontSizeValue = size === "xs" ? fontSize.xxs : fontSize.xs;

  // border value
  const borderValue = border ? `${borderWidth[3]} solid ${white.main}` : "none";

  // borderRadius value
  let borderRadiusValue = size === "xs" ? borderRadius.sm : borderRadius.md;

  if (circular) {
    borderRadiusValue = borderRadius.section;
  }

  // styles for the badge with indicator={true}
  const indicatorStyles = (sizeProp) => {
    let widthValue = pxToRem(20);
    let heightValue = pxToRem(20);

    if (sizeProp === "medium") {
      widthValue = pxToRem(24);
      heightValue = pxToRem(24);
    } else if (sizeProp === "large") {
      widthValue = pxToRem(32);
      heightValue = pxToRem(32);
    }

    return {
      width: widthValue,
      height: heightValue,
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      borderRadius: "50%",
      padding: 0,
      border: borderValue,
    };
  };

  // styles for the badge with variant="gradient"
  const gradientStyles = (colorProp) => {
    // ✅ Safe gradient access with fallbacks
    const backgroundValue = gradients[colorProp]?.main && gradients[colorProp]?.state
      ? linearGradient(gradients[colorProp].main, gradients[colorProp].state)
      : gradients.info?.main && gradients.info?.state
        ? linearGradient(gradients.info.main, gradients.info.state)
        : 'linear-gradient(195deg, #11cdef, #11cdef)';
    const colorValue = colorProp === "light" ? dark.main : white.main;

    return {
      background: backgroundValue,
      color: colorValue,
    };
  };

  // styles for the badge with variant="contained"
  const containedStyles = (colorProp) => {
    // ✅ Safe badgeColors access with fallbacks
    const backgroundValue = badgeColors[colorProp]?.background
      || badgeColors.info?.background
      || '#aaedf9';
    let colorValue = badgeColors[colorProp]?.text
      || badgeColors.info?.text
      || '#03acca';

    if (colorProp === "light") {
      colorValue = dark.main;
    }
    return {
      background: backgroundValue,
      color: colorValue,
    };
  };

  // styles for the badge with no children and container={false}
  const standAloneStyles = () => ({
    position: "static",
    marginLeft: pxToRem(8),
    transform: "none",
    fontSize: pxToRem(9),
  });

  // styles for the badge with container={true}
  const containerStyles = () => ({
    position: "relative",
    transform: "none",
  });

  return {
    "& .MuiBadge-badge": {
      height: "auto",
      padding: paddings[size] || paddings.xs,
      fontSize: fontSizeValue,
      fontWeight: fontWeightBold,
      textTransform: "uppercase",
      lineHeight: 1,
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      border: borderValue,
      borderRadius: borderRadiusValue,
      ...(indicator && indicatorStyles(size)),
      ...(variant === "gradient" && gradientStyles(color)),
      ...(variant === "contained" && containedStyles(color)),
      ...(!children && !container && standAloneStyles(color)),
      ...(container && containerStyles(color)),
    },
  };
});
