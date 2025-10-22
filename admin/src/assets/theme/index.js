import { createTheme } from "@mui/material/styles";
import colors from "assets/theme/base/colors";
import breakpoints from "assets/theme/base/breakpoints";
import typography from "assets/theme/base/typography";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";
import globals from "assets/theme/base/globals";

import boxShadow from "assets/theme/functions/boxShadow";
import hexToRgb from "assets/theme/functions/hexToRgb";
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";
import rgba from "assets/theme/functions/rgba";

import sidenav from "assets/theme/components/sidenav";
import list from "assets/theme/components/list";
import listItem from "assets/theme/components/list/listItem";
import listItemText from "assets/theme/components/list/listItemText";
import card from "assets/theme/components/card";
import cardMedia from "assets/theme/components/card/cardMedia";
import cardContent from "assets/theme/components/card/cardContent";
import button from "assets/theme/components/button";
import iconButton from "assets/theme/components/iconButton";
import inputBase from "assets/theme/components/form/inputBase";
import menu from "assets/theme/components/menu";
import menuItem from "assets/theme/components/menu/menuItem";
import switchButton from "assets/theme/components/form/switchButton";
import divider from "assets/theme/components/divider";
import tableContainer from "assets/theme/components/table/tableContainer";
import tableHead from "assets/theme/components/table/tableHead";
import tableCell from "assets/theme/components/table/tableCell";
import linearProgress from "assets/theme/components/linearProgress";
import breadcrumbs from "assets/theme/components/breadcrumbs";
import slider from "assets/theme/components/slider";
import avatar from "assets/theme/components/avatar";
import tooltip from "assets/theme/components/tooltip";
import appBar from "assets/theme/components/appBar";
import tabs from "assets/theme/components/tabs";
import tab from "assets/theme/components/tabs/tab";
import stepper from "assets/theme/components/stepper";
import step from "assets/theme/components/stepper/step";
import stepConnector from "assets/theme/components/stepper/stepConnector";
import stepLabel from "assets/theme/components/stepper/stepLabel";
import stepIcon from "assets/theme/components/stepper/stepIcon";
import select from "assets/theme/components/form/select";
import formControlLabel from "assets/theme/components/form/formControlLabel";
import formLabel from "assets/theme/components/form/formLabel";
import checkbox from "assets/theme/components/form/checkbox";
import radio from "assets/theme/components/form/radio";
import autocomplete from "assets/theme/components/form/autocomplete";
import input from "assets/theme/components/form/input";
import container from "assets/theme/components/container";
import popover from "assets/theme/components/popover";
import buttonBase from "assets/theme/components/buttonBase";
import icon from "assets/theme/components/icon";
import svgIcon from "assets/theme/components/svgIcon";
import link from "assets/theme/components/link";
import dialog from "assets/theme/components/dialog";
import dialogTitle from "assets/theme/components/dialog/dialogTitle";
import dialogContent from "assets/theme/components/dialog/dialogContent";
import dialogContentText from "assets/theme/components/dialog/dialogContentText";
import dialogActions from "assets/theme/components/dialog/dialogActions";

// Create theme with all required properties
export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { 
    mode: 'light',
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
      default: colors.background?.default || '#f8f9fa',
      paper: colors.white?.main || '#ffffff',
    },
    text: {
      primary: colors.text?.main || '#67748e',
      secondary: colors.text?.focus || '#8392ab',
      disabled: '#adb5bd',
    },
    divider: colors.grey?.[300] || '#dee2e6',
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
    // Add all custom palette properties for backward compatibility
    inputColors: colors.inputColors || {
      borderColor: { main: '#d2d6da', focus: '#11cdef' },
      error: '#f5365c',
      success: '#2dce89',
    },
    white: colors.white || { main: '#ffffff', focus: '#ffffff' },
    dark: colors.dark || { main: '#344767', focus: '#344767' },
    transparent: colors.transparent || { main: 'transparent' },
    black: colors.black || { main: '#000000', light: '#141414', focus: '#000000' },
    light: colors.light || { main: '#e9ecef', focus: '#e9ecef' },
    gradients: colors.gradients || {},
    socialMediaColors: colors.socialMediaColors || {},
    alertColors: colors.alertColors || {},
    badgeColors: colors.badgeColors || {},
    sliderColors: colors.sliderColors || {},
    circleSliderColors: colors.circleSliderColors || {},
    tabs: colors.tabs || {},
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
  
  // Add custom properties to theme for backward compatibility with styled components
  borders: {
    borderColor: borders?.borderColor || { main: '#d2d6da', focus: '#11cdef' },
    borderWidth: borders?.borderWidth || { 0: 0, 1: '1px', 2: '2px', 3: '3px', 4: '4px', 5: '5px' },
    borderRadius: borders?.borderRadius || { xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '16px', xxl: '24px', section: '160px' },
    ...borders,
  },
  boxShadows: {
    xs: '0 2px 9px -5px rgba(0,0,0,0.15)',
    sm: '0 5px 10px 0 rgba(0,0,0,0.12)',
    md: '0 4px 6px -1px rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.07)',
    lg: '0 8px 26px -4px rgba(0,0,0,0.15), 0 8px 9px -5px rgba(0,0,0,0.06)',
    xl: '0 23px 45px -11px rgba(0,0,0,0.25)',
    xxl: '0 20px 27px 0 rgba(0,0,0,0.05)',
    inset: '0 1px 2px 0 rgba(0,0,0,0.075) inset',
    none: 'none',
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
    ...boxShadows,
  },
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
