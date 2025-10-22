import { createTheme } from "@mui/material/styles";
import colors from "assets/theme-dark/base/colors";
import breakpoints from "assets/theme-dark/base/breakpoints";
import typography from "assets/theme-dark/base/typography";
import boxShadows from "assets/theme-dark/base/boxShadows";
import borders from "assets/theme-dark/base/borders";
import globals from "assets/theme-dark/base/globals";

import boxShadow from "assets/theme-dark/functions/boxShadow";
import hexToRgb from "assets/theme-dark/functions/hexToRgb";
import linearGradient from "assets/theme-dark/functions/linearGradient";
import pxToRem from "assets/theme-dark/functions/pxToRem";
import rgba from "assets/theme-dark/functions/rgba";

import sidenav from "assets/theme-dark/components/sidenav";
import list from "assets/theme-dark/components/list";
import listItem from "assets/theme-dark/components/list/listItem";
import listItemText from "assets/theme-dark/components/list/listItemText";
import card from "assets/theme-dark/components/card";
import cardMedia from "assets/theme-dark/components/card/cardMedia";
import cardContent from "assets/theme-dark/components/card/cardContent";
import button from "assets/theme-dark/components/button";
import iconButton from "assets/theme-dark/components/iconButton";
import inputBase from "assets/theme-dark/components/form/inputBase";
import menu from "assets/theme-dark/components/menu";
import menuItem from "assets/theme-dark/components/menu/menuItem";
import switchButton from "assets/theme-dark/components/form/switchButton";
import divider from "assets/theme-dark/components/divider";
import tableContainer from "assets/theme-dark/components/table/tableContainer";
import tableHead from "assets/theme-dark/components/table/tableHead";
import tableCell from "assets/theme-dark/components/table/tableCell";
import linearProgress from "assets/theme-dark/components/linearProgress";
import breadcrumbs from "assets/theme-dark/components/breadcrumbs";
import slider from "assets/theme-dark/components/slider";
import avatar from "assets/theme-dark/components/avatar";
import tooltip from "assets/theme-dark/components/tooltip";
import appBar from "assets/theme-dark/components/appBar";
import tabs from "assets/theme-dark/components/tabs";
import tab from "assets/theme-dark/components/tabs/tab";
import stepper from "assets/theme-dark/components/stepper";
import step from "assets/theme-dark/components/stepper/step";
import stepConnector from "assets/theme-dark/components/stepper/stepConnector";
import stepLabel from "assets/theme-dark/components/stepper/stepLabel";
import stepIcon from "assets/theme-dark/components/stepper/stepIcon";
import select from "assets/theme-dark/components/form/select";
import formControlLabel from "assets/theme-dark/components/form/formControlLabel";
import formLabel from "assets/theme-dark/components/form/formLabel";
import checkbox from "assets/theme-dark/components/form/checkbox";
import radio from "assets/theme-dark/components/form/radio";
import autocomplete from "assets/theme-dark/components/form/autocomplete";
import input from "assets/theme-dark/components/form/input";
import container from "assets/theme-dark/components/container";
import popover from "assets/theme-dark/components/popover";
import buttonBase from "assets/theme-dark/components/buttonBase";
import icon from "assets/theme-dark/components/icon";
import svgIcon from "assets/theme-dark/components/svgIcon";
import link from "assets/theme-dark/components/link";
import dialog from "assets/theme-dark/components/dialog";
import dialogTitle from "assets/theme-dark/components/dialog/dialogTitle";
import dialogContent from "assets/theme-dark/components/dialog/dialogContent";
import dialogContentText from "assets/theme-dark/components/dialog/dialogContentText";
import dialogActions from "assets/theme-dark/components/dialog/dialogActions";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { 
    mode: 'dark',
    primary: {
      main: colors.primary?.main || '#5e72e4',
      light: colors.primary?.focus || '#825ee4',
      dark: colors.primary?.focus || '#4c63d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary?.main || '#8392ab',
      light: colors.secondary?.focus || '#a8b8d8',
      dark: colors.secondary?.focus || '#6c7b8a',
      contrastText: '#ffffff',
    },
    info: {
      main: colors.info?.main || '#11cdef',
      light: colors.info?.focus || '#4dd4f0',
      dark: colors.info?.focus || '#0ea5c7',
      contrastText: '#ffffff',
    },
    success: {
      main: colors.success?.main || '#2dce89',
      light: colors.success?.focus || '#5dd9a3',
      dark: colors.success?.focus || '#26ad6f',
      contrastText: '#ffffff',
    },
    warning: {
      main: colors.warning?.main || '#fb6340',
      light: colors.warning?.focus || '#fc8a6b',
      dark: colors.warning?.focus || '#e84d1a',
      contrastText: '#ffffff',
    },
    error: {
      main: colors.error?.main || '#f5365c',
      light: colors.error?.focus || '#f76b7d',
      dark: colors.error?.focus || '#d62a4a',
      contrastText: '#ffffff',
    },
    background: {
      default: colors.background?.default || '#051139',
      paper: colors.background?.dark || '#111c44',
    },
    text: {
      primary: colors.text?.main || '#ffffffcc',
      secondary: colors.text?.focus || '#ffffffcc',
      disabled: '#adb5bd',
    },
    divider: colors.grey?.[300] || '#ffffff26',
    grey: {
      50: '#f8f9fa',
      100: '#f0f2f566',
      200: '#ffffff26',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#000000',
    },
  },
  typography: { 
    ...typography,
    fontFamily: [
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: borders?.borderRadius?.md || 8,
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
  // Add custom theme properties for backward compatibility
  customColors: colors,
  customBorders: borders,
  customBoxShadows: boxShadows,
  // Make borders and boxShadows available for component destructuring
  borders: borders,
  boxShadows: boxShadows,
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInputBase: { ...inputBase },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiOutlinedInput: { ...input },
    MuiFilledInput: { ...input },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
