// Secure token management utilities
class TokenManager {
  static TOKEN_KEY = 'Tokens';
  static REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

  // Store tokens securely
  static setTokens(accessToken, refreshToken) {
    const tokenData = {
      access: accessToken,
      refresh: refreshToken,
      timestamp: Date.now(),
      expiresAt: Date.now() + (15 * 60 * 1000) // 15 minutes from now
    };
    
    try {
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
      return true;
    } catch (error) {
      console.error('Error storing tokens:', error);
      return false;
    }
  }

  // Get stored tokens
  static getTokens() {
    try {
      const tokenString = localStorage.getItem(this.TOKEN_KEY);
      if (!tokenString) return null;
      
      const tokens = JSON.parse(tokenString);
      
      // Check if tokens are expired
      if (tokens.expiresAt && Date.now() > tokens.expiresAt) {
        this.clearTokens();
        return null;
      }
      
      return tokens;
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      this.clearTokens();
      return null;
    }
  }

  // Get access token
  static getAccessToken() {
    const tokens = this.getTokens();
    return tokens ? tokens.access : null;
  }

  // Get refresh token
  static getRefreshToken() {
    const tokens = this.getTokens();
    return tokens ? tokens.refresh : null;
  }

  // Check if tokens need refresh
  static needsRefresh() {
    const tokens = this.getTokens();
    if (!tokens) return true;
    
    const timeUntilExpiry = tokens.expiresAt - Date.now();
    return timeUntilExpiry < this.REFRESH_THRESHOLD;
  }

  // Clear tokens
  static clearTokens() {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing tokens:', error);
      return false;
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const tokens = this.getTokens();
    return tokens && tokens.access;
  }

  // Logout user
  static logout() {
    this.clearTokens();
    // Redirect to login page
    window.location.href = '/login';
  }
}

export default TokenManager;
