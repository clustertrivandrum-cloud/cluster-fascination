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

// Argon Dashboard 2 MUI Base Styles
import colors from "assets/theme-dark/base/colors";
import borders from "assets/theme-dark/base/borders";

// Soft UI Dashboard PRO helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";
import { safeBorderColor, safeBorderWidth, safeBorderRadius } from "assets/theme/utils/safeThemeAccess";

const { inputColors } = colors;
const { borderWidth, borderRadius } = borders;

const input = {
  styleOverrides: {
    root: {
      display: "flex !important",
      padding: `${pxToRem(8)} ${pxToRem(12)}`,
      border: `${safeBorderWidth(borders, 1)} solid ${safeBorderColor(colors)}`,
      borderRadius: `${safeBorderRadius(borders, 'md')} !important`,

      "& fieldset": {
        border: "none",
      },
    },

    input: {
      height: pxToRem(22),
      width: "max-content !important",
    },

    inputSizeSmall: {
      height: pxToRem(14),
    },
  },
};

export default input;
