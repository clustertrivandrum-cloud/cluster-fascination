
import axios from "axios";
import TokenManager from "./utils/tokenManager";

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005';
console.log('Axios baseURL:', baseURL);

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});


// default header
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept"] = "multi-part/formdata";

instance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.warn('Error getting access token:', error);
      TokenManager.clearTokens();
    }
 
    return config;
  }
  
);

instance.interceptors.response.use(
  (response) => {
   // console.log('response1',response);
    return response;
  },
  async (error) => {

    if (
      error?.response?.data?.code === "token_not_valid" &&
      error?.response?.status === 401
    ) {
      if (
        error?.response?.data?.messages &&
        error?.response?.data?.messages[0]?.token_type === "access"
      ) {
        const originalConfig = error.config;
        originalConfig._retry = true;
        try {
          const refreshToken = TokenManager.getRefreshToken();
          if (!refreshToken) {
            return Promise.reject(error);
          }
          
          const response = await instance.post("users/token/refresh/", {
            refresh: refreshToken,
          });
          let accessToken = response?.data?.access;
 
          if (accessToken) {
            TokenManager.setTokens(accessToken, refreshToken);
          }

          return instance(originalConfig);
        } catch (_error) {
          // Clear invalid tokens and redirect to login
          TokenManager.logout();
          return Promise.reject(_error);
        }
      }
    }
  
    else {
     
      return Promise.reject(error);
    }
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 500) {
      const originalConfig = error.config;
      originalConfig._retry = true;
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
