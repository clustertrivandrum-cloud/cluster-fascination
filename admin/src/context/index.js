import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const Admin = createContext(null);
Admin.displayName = "AdminContext";

function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "DARK_SIDENAV": {
      return { ...state, darkSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARK_MODE": {
      return { ...state, darkMode: action.value };
    }
    case "AUTH": {
      return { ...state, auth: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AdminControllerProvider({ children }) {
  // Check localStorage for auth state
  const getInitialAuthState = () => {
    try {
      const storedAuth = localStorage.getItem("adminAuth");
      return storedAuth ? JSON.parse(storedAuth) : false;
    } catch (error) {
      console.error("Error reading auth from localStorage:", error);
      return false;
    }
  };

  const initialState = {
    miniSidenav: false,
    darkSidenav: false,
    sidenavColor: null,
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    auth: getInitialAuthState(),
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  // Persist auth state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("adminAuth", JSON.stringify(controller.auth));
    } catch (error) {
      console.error("Error saving auth to localStorage:", error);
    }
  }, [controller.auth]);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Admin.Provider value={value}>{children}</Admin.Provider>;
}

function useController() {
  const context = useContext(Admin);

  if (!context) {
    throw new Error("useController should be used inside the AdminControllerProvider.");
  }

  return context;
}

// Typechecking props for the AdminControllerProvider
AdminControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setDarkSidenav = (dispatch, value) => dispatch({ type: "DARK_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARK_MODE", value });
const setAuth = (dispatch, value) => dispatch({ type: "AUTH", value });

export {
  AdminControllerProvider,
  useController,
  setMiniSidenav,
  setDarkSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  setAuth,
};
