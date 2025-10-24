import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Platform } from 'react-native';

import config from '../config/environment';

// Configuration - Using environment config with platform-specific URLs
let API_BASE_URL = config.API_BASE_URL;

// Handle different platforms for development
if (__DEV__) {
  if (Platform.OS === 'android') {
    // Android emulator uses 10.0.2.2 to reach host localhost
    API_BASE_URL = 'http://10.0.2.2:8000/api';
  } else {
    // iOS simulator and physical devices - use local network IP
    API_BASE_URL = 'http://10.0.0.156:8000/api';
  }

  console.log(`Using API_BASE_URL: ${API_BASE_URL} for platform: ${Platform.OS}`);
  
  
  // Auto-clear login attempts for configured emails on startup
  const autoClearAttempts = async () => {
    try {
      const emails = ['sjbrodrick@gmail.com', 'sjebrodrick@gmail.com'];
      for (const email of emails) {
        const key = `failedAttempts_${email}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('🧹 Auto-cleared login attempts on startup');
    } catch (error) {
      console.warn('Could not auto-clear login attempts:', error.message);
    }
  };
  
  // Run after a delay to let app initialize
  setTimeout(autoClearAttempts, 3000);
}

// Security constants
const PASSWORD_MIN_LENGTH = 8;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

class AuthService {
  constructor() {
    this.setupAxiosInterceptors();
  }

  // Setup axios interceptors for authentication
  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      async (config) => {
        const token = await this.getStoredToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // Ensure proper headers for JSON requests
        if (!config.headers['Content-Type']) {
          config.headers['Content-Type'] = 'application/json';
        }
        config.headers['Accept'] = 'application/json';
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Handle 401 unauthorized responses
        if (error.response?.status === 401) {
          await this.clearStoredAuth();
          // Redirect to login screen
        }
        
        // Enhanced network error handling
        if (error.code === 'ECONNABORTED') {
          console.warn('Request timed out - server may be slow or unreachable');
        } else if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
          console.warn('Network error - check internet connection and server availability');
        } else if (error.message?.includes('Network Error')) {
          console.warn('Network connectivity issue detected');
        } else if (!error.response) {
          console.warn('Request failed - no response received from server');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Password validation
  validatePassword(password) {
    const errors = [];
    
    if (password.length < PASSWORD_MIN_LENGTH) {
      errors.push(`Password needs at least ${PASSWORD_MIN_LENGTH} characters`);
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password needs at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password needs at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password needs at least one number');
    }
    
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('Password needs at least one special character (!@#$%^&*)');
    }
    
    return errors;
  }

  // Email validation
  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  // Username validation
  validateUsername(username) {
    if (!username || typeof username !== 'string') {
      return false;
    }
    
    const usernameRegex = /^[A-Za-z0-9_-]{3,50}$/;
    return usernameRegex.test(username.trim());
  }

  // Name validation (for first name and last name)
  validateName(name) {
    if (!name || typeof name !== 'string') {
      return false;
    }
    
    const nameRegex = /^[A-Za-z\s\-']{1,50}$/;
    return nameRegex.test(name.trim());
  }

  // Comprehensive user data validation
  validateUserData(userData) {
    const errors = {};
    
    // Validate username
    if (!userData.username || !this.validateUsername(userData.username)) {
      errors.username = 'Username should be 3-50 characters and contain only letters, numbers, underscores, or hyphens';
    }
    
    // Validate email
    if (!userData.email || !this.validateEmail(userData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (userData.password) {
      const passwordErrors = this.validatePassword(userData.password);
      if (passwordErrors.length > 0) {
        errors.password = passwordErrors[0]; // Show first error
      }
    }
    
    // Validate password confirmation
    if (userData.password && userData.confirmPassword && userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Passwords don\'t match';
    }
    
    // Validate first name (optional)
    if (userData.firstName && !this.validateName(userData.firstName)) {
      errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Validate last name (optional)
    if (userData.lastName && !this.validateName(userData.lastName)) {
      errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    return errors;
  }

  // Get device information for security tracking
  async getDeviceInfo() {
    try {
      const deviceInfo = {
        platform: Platform.OS,
        systemVersion: Platform.Version,
        appVersion: '1.0.0',
        buildNumber: '1',
        userAgent: Platform.select({
          web: () => navigator.userAgent,
          default: () => `${Platform.OS} ${Platform.Version}`,
        })(),
      };
      return deviceInfo;
    } catch (error) {
      console.warn('Error getting device info:', error);
      return {
        platform: Platform.OS,
        systemVersion: Platform.Version,
        appVersion: '1.0.0',
      };
    }
  }

  // Note: Password hashing is handled on the server side for security
  // Client-side hashing is not recommended and has been removed

  // User registration
  async register(userData) {
    try {
      // Validate input
      const { username, email, password, confirmPassword, firstName, lastName } = userData;
      
      if (!this.validateUsername(username)) {
        throw new Error('Please check your username format');
      }
      
      if (!this.validateEmail(email)) {
        throw new Error('Please check your email format');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords don\'t match');
      }
      
      const passwordErrors = this.validatePassword(password);
      if (passwordErrors.length > 0) {
        throw new Error(passwordErrors.join(', '));
      }

      // Get device info for security
      const deviceInfo = await this.getDeviceInfo();
      
      // Prepare registration data (let server handle password hashing)
      const registrationData = {
        username,
        email: email.toLowerCase(),
        password, // Send plain password, server will hash it
        password_confirm: confirmPassword,
      };
      
      // Add optional fields if provided
      if (firstName) registrationData.first_name = firstName;
      if (lastName) registrationData.last_name = lastName;
      if (deviceInfo) registrationData.device_info = deviceInfo;

      // Send registration request to Django backend
      console.log(`Attempting registration to: ${API_BASE_URL}/auth/register/`);
      console.log('Registration data:', registrationData);
      
      const response = await axios.post(`${API_BASE_URL}/auth/register/`, registrationData, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Registration response received:', {
        status: response.status,
        data: response.data
      });
      
      // Check for successful response status (200, 201, etc.)
      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data || {};
        
        // If the response includes access tokens, automatically authenticate the user
        if (responseData.access && responseData.user) {
          // Normalize user data structure
          const normalizedUser = {
            ...responseData.user,
            username: responseData.user.username || username,
            email: responseData.user.email || email.toLowerCase(),
            firstName: responseData.user.firstName || responseData.user.first_name || firstName,
            lastName: responseData.user.lastName || responseData.user.last_name || lastName,
            first_name: responseData.user.first_name || responseData.user.firstName || firstName,
            last_name: responseData.user.last_name || responseData.user.lastName || lastName,
            dateJoined: responseData.user.dateJoined || responseData.user.date_joined || new Date().toISOString(),
          };
          
          // Store authentication data for immediate login
          const storeResult = await this.storeAuthData({
            token: responseData.access,
            refreshToken: responseData.refresh,
            user: normalizedUser
          });
          
          if (storeResult.success) {
            return {
              success: true,
              message: responseData.message || 'Welcome to Wrylo! Your account has been created successfully.',
              user: normalizedUser,
              token: responseData.access,
              autoAuthenticated: true
            };
          }
        }
        
        // Fallback: Store pending verification data
        await AsyncStorage.setItem('pendingVerification', JSON.stringify({
          email: email.toLowerCase(),
          userId: responseData.id || responseData.user_id || 'pending',
          userData: {
            username,
            email: email.toLowerCase(),
            firstName,
            lastName
          }
        }));
        
        return {
          success: true,
          message: responseData.message || 'Registration successful. Please check your email for verification.',
          userId: responseData.id || responseData.user_id,
          userData: {
            username,
            email: email.toLowerCase(),
            firstName,
            lastName
          }
        };
      } else {
        throw new Error('We couldn\'t create your account right now');
      }
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        request: error.request ? 'Request was made' : 'No request',
        response: error.response ? `Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}` : 'No response'
      });
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        let errorMessage = 'Registration failed';
        
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.email) {
          errorMessage = `Email: ${errorData.email[0]}`;
        } else if (errorData.username) {
          errorMessage = `Username: ${errorData.username[0]}`;
        } else if (errorData.password) {
          errorMessage = `Password: ${errorData.password[0]}`;
        }
        
        return {
          success: false,
          message: errorMessage,
        };
      } else if (error.request) {
        // Network error - check if backend is running
        console.warn('Network error - is the Django backend running on 127.0.0.1:8000?');
        return {
          success: false,
          message: 'Cannot connect to server. Please ensure the backend server is running on 127.0.0.1:8000.',
        };
      } else {
        // Other error
        return {
          success: false,
          message: error.message || 'We couldn\'t create your account right now. Please try again.',
        };
      }
    }
  }


  // User login
  async login(credentials) {
    try {
      const { email, password } = credentials;
      
      // Validate input
      if (!this.validateEmail(email)) {
        throw new Error('Please check your email format');
      }
      
      if (!password) {
        throw new Error('Please enter your password');
      }

      // Check for previous failed attempts
      const failedAttempts = await this.getFailedAttempts(email);
      if (failedAttempts.count >= MAX_LOGIN_ATTEMPTS) {
        const timeSinceLastAttempt = Date.now() - failedAttempts.lastAttempt;
        if (timeSinceLastAttempt < LOCKOUT_DURATION) {
          const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000);
          throw new Error(`For security, your account is temporarily locked. Please try again in ${remainingTime} minutes.`);
        } else {
          // Reset failed attempts after lockout period
          await this.clearFailedAttempts(email);
        }
      }

      // Get device info
      const deviceInfo = await this.getDeviceInfo();
      
      // Prepare login data
      const loginData = {
        email: email.toLowerCase(),
        password,
        deviceInfo,
      };

      // Send login request to Django backend
      console.log('Attempting login to:', `${API_BASE_URL}/auth/login/`);
      const response = await axios.post(`${API_BASE_URL}/auth/login/`, loginData, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (response.data.access) {
        // Clear failed attempts on successful login
        await this.clearFailedAttempts(email);
        
        // Normalize user data structure
        const userData = response.data.user || { email: email.toLowerCase() };
        const normalizedUser = {
          ...userData,
          email: userData.email || email.toLowerCase(),
          firstName: userData.firstName || userData.first_name,
          lastName: userData.lastName || userData.last_name,
          first_name: userData.first_name || userData.firstName,
          last_name: userData.last_name || userData.lastName,
          dateJoined: userData.dateJoined || userData.date_joined || new Date().toISOString(),
        };
        
        // Store authentication data
        const storeResult = await this.storeAuthData({
          token: response.data.access,
          refreshToken: response.data.refresh,
          user: normalizedUser
        });
        
        if (!storeResult.success) {
          console.error('Failed to store auth data:', storeResult.error);
          // Return error if storage fails - this is critical for user experience
          return {
            success: false,
            message: 'Login successful but failed to save session. Please try again.',
            error: storeResult.error
          };
        }
        
        return {
          success: true,
          message: 'Login successful',
          user: normalizedUser,
          token: response.data.access,
        };
      } else {
        // Record failed attempt
        await this.recordFailedAttempt(email);
        throw new Error(response.data.message || 'Unable to sign in. Please check your credentials.');
      }
    } catch (error) {
      // Log error with appropriate level based on error type
      if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        console.warn('Network error during login:', error.message);
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        console.log('Login authentication error:', error.response?.status, error.response?.data?.error || error.message);
      } else {
        console.error('Unexpected login error:', error.message);
      }
      
      // Only log detailed error info in development mode
      if (__DEV__) {
        console.debug('Login error details:', {
          name: error.name,
          code: error.code,
          status: error.response?.status || 'No response'
        });
      }
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status - record failed attempt only for auth errors
        const errorData = error.response.data;
        let errorMessage = 'Login failed';
        
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        // Only record failed attempt for actual authentication failures (401, 403)
        if (error.response.status === 401 || error.response.status === 403) {
          if (credentials.email) {
            await this.recordFailedAttempt(credentials.email);
          }
        }
        
        return {
          success: false,
          message: errorMessage,
        };
      } else if (error.request) {
        // Network error - DON'T record failed attempts for network issues
        console.warn('Network error - backend server may be unavailable');
        
        // Only log detailed network info in development
        if (__DEV__) {
          console.debug('Network error details:', {
            code: error.code,
            message: error.message,
            hasRequest: !!error.request
          });
        }
        
        // Test connectivity to provide better error message
        const connectionTest = await this.testConnection();
        if (!connectionTest.success) {
          return {
            success: false,
            message: 'Cannot connect to server. Please ensure the backend server is running on 127.0.0.1:8000 and try again.',
          };
        }
        
        return {
          success: false,
          message: 'Network error occurred. Please check your connection and try again.',
        };
      } else {
        // Other error - only record failed attempts for actual auth errors
        if (error.message && (error.message.includes('password') || error.message.includes('credentials'))) {
          if (credentials.email) {
            await this.recordFailedAttempt(credentials.email);
          }
        }
        
        console.warn('Login validation error:', error.message);
        
        // Only log stack trace in development
        if (__DEV__ && error.stack) {
          console.debug('Error stack trace:', error.stack);
        }
        return {
          success: false,
          message: error.message || 'Unable to sign in. Please check your email and password.',
        };
      }
    }
  }

  // Store authentication data securely
  async storeAuthData(authData) {
    try {
      // Validate input data
      if (!authData || !authData.token || !authData.user) {
        throw new Error('Invalid authentication data provided');
      }

      // Encrypt sensitive data using environment config
      const encryptionKey = config.ENCRYPTION_KEY || 'default-key-change-in-production';
      
      // Ensure encryption key is valid
      if (!encryptionKey || encryptionKey.length < 16) {
        throw new Error('Invalid encryption key configuration');
      }

      // Use a more robust encryption approach for React Native
      let encryptedToken, encryptedUserData;
      try {
        encryptedToken = CryptoJS.AES.encrypt(authData.token, encryptionKey).toString();
        encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(authData.user), encryptionKey).toString();
      } catch (cryptoError) {
        console.warn('Crypto encryption failed, falling back to base64:', cryptoError);
        // Fallback to base64 encoding if crypto fails
        encryptedToken = btoa(authData.token);
        encryptedUserData = btoa(JSON.stringify(authData.user));
      }
      
      // Store data with proper error handling
      try {
        await AsyncStorage.multiSet([
          ['authToken', encryptedToken],
          ['userData', encryptedUserData],
          ['loginTime', Date.now().toString()],
        ]);
      } catch (storageError) {
        console.error('AsyncStorage.multiSet failed:', storageError);
        // Try storing individually as fallback
        await AsyncStorage.setItem('authToken', encryptedToken);
        await AsyncStorage.setItem('userData', encryptedUserData);
        await AsyncStorage.setItem('loginTime', Date.now().toString());
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error storing auth data:', error);
      // Return error information for better debugging
      return { 
        success: false, 
        error: error.message || 'Failed to store authentication data' 
      };
    }
  }

  // Get stored authentication token
  async getStoredToken() {
    try {
      const encryptedToken = await AsyncStorage.getItem('authToken');
      if (encryptedToken) {
        const encryptionKey = config.ENCRYPTION_KEY || 'default-key-change-in-production';
        try {
          const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);
          return decryptedToken;
        } catch (cryptoError) {
          console.warn('Crypto decryption failed, trying base64:', cryptoError);
          // Fallback to base64 decoding
          try {
            return atob(encryptedToken);
          } catch (base64Error) {
            console.error('Both crypto and base64 decryption failed:', base64Error);
            return null;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  // Get stored user data
  async getStoredUserData() {
    try {
      const encryptedUserData = await AsyncStorage.getItem('userData');
      if (encryptedUserData) {
        const encryptionKey = config.ENCRYPTION_KEY || 'default-key-change-in-production';
        try {
          const decryptedUserData = CryptoJS.AES.decrypt(encryptedUserData, encryptionKey).toString(CryptoJS.enc.Utf8);
          return JSON.parse(decryptedUserData);
        } catch (cryptoError) {
          console.warn('Crypto decryption failed, trying base64:', cryptoError);
          // Fallback to base64 decoding
          try {
            const base64Decoded = atob(encryptedUserData);
            return JSON.parse(base64Decoded);
          } catch (base64Error) {
            console.error('Both crypto and base64 decryption failed:', base64Error);
            return null;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting stored user data:', error);
      return null;
    }
  }

  // Clear stored authentication data
  async clearStoredAuth() {
    try {
      await AsyncStorage.multiRemove(['authToken', 'userData', 'loginTime']);
    } catch (error) {
      console.error('Error clearing stored auth:', error);
    }
  }

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const token = await this.getStoredToken();
      const loginTime = await AsyncStorage.getItem('loginTime');
      
      if (!token || !loginTime) {
        return false;
      }
      
      // Check if token is expired (7 days)
      const tokenAge = Date.now() - parseInt(loginTime);
      const TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
      
      if (tokenAge > TOKEN_EXPIRY) {
        await this.clearStoredAuth();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Logout user
  async logout() {
    try {
      // Get stored token for logout request
      const token = await this.getStoredToken();
      if (token) {
        // Notify backend about logout
        await axios.post(`${API_BASE_URL}/auth/logout/`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      // Don't worry about logout errors - just log them
      if (error.response?.status === 404) {
        console.warn('Logout endpoint not found, proceeding with local logout');
      } else {
        console.warn('Error during logout:', error.message);
      }
    } finally {
      // Clear stored data regardless of backend response
      await this.clearStoredAuth();
    }
  }

  // Change user password
  async changePassword(currentPassword, newPassword) {
    try {
      // Validate inputs
      if (!currentPassword || !newPassword) {
        return {
          success: false,
          message: 'Both current and new passwords are required'
        };
      }

      if (newPassword.length < PASSWORD_MIN_LENGTH) {
        return {
          success: false,
          message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
        };
      }

      // Get stored token for authentication
      const token = await this.getStoredToken();
      if (!token) {
        return {
          success: false,
          message: 'You must be logged in to change your password'
        };
      }

      // Prepare request data
      const changePasswordData = {
        current_password: currentPassword,
        new_password: newPassword,
      };

      // Send request to backend
      const response = await axios.post(
        `${API_BASE_URL}/auth/change-password/`,
        changePasswordData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        return {
          success: true,
          message: 'Password updated successfully'
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to update password'
        };
      }
    } catch (error) {
      console.error('Password change error:', error);
      
      // Handle different types of errors
      if (error.response) {
        const errorData = error.response.data;
        let errorMessage = 'Failed to update password';
        
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.current_password) {
          errorMessage = 'Current password is incorrect';
        } else if (errorData.new_password) {
          errorMessage = 'New password does not meet requirements';
        }
        
        return {
          success: false,
          message: errorMessage
        };
      } else if (error.request) {
        // Network error
        return {
          success: false,
          message: 'Network error. Please check your connection and try again.'
        };
      } else {
        // Other error
        return {
          success: false,
          message: 'An unexpected error occurred. Please try again.'
        };
      }
    }
  }

  // Track failed login attempts
  async recordFailedAttempt(email) {
    try {
      const key = `failedAttempts_${email}`;
      const existing = await AsyncStorage.getItem(key);
      const failedAttempts = existing ? JSON.parse(existing) : { count: 0, lastAttempt: 0 };
      
      failedAttempts.count += 1;
      failedAttempts.lastAttempt = Date.now();
      
      await AsyncStorage.setItem(key, JSON.stringify(failedAttempts));
    } catch (error) {
      console.error('Error recording failed attempt:', error);
    }
  }

  // Get failed login attempts
  async getFailedAttempts(email) {
    try {
      const key = `failedAttempts_${email}`;
      const existing = await AsyncStorage.getItem(key);
      return existing ? JSON.parse(existing) : { count: 0, lastAttempt: 0 };
    } catch (error) {
      console.error('Error getting failed attempts:', error);
      return { count: 0, lastAttempt: 0 };
    }
  }

  // Clear failed login attempts
  async clearFailedAttempts(email) {
    try {
      const key = `failedAttempts_${email}`;
      await AsyncStorage.removeItem(key);
      console.log(`Cleared failed attempts for: ${email}`);
    } catch (error) {
      console.error('Error clearing failed attempts:', error);
    }
  }

  // Clear all failed attempts (admin function)
  async clearAllFailedAttempts() {
    try {
      const emails = ['sjbrodrick@gmail.com', 'sjebrodrick@gmail.com'];
      for (const email of emails) {
        await this.clearFailedAttempts(email);
      }
      console.log('Cleared all failed attempts for configured emails');
      return { success: true, message: 'All failed attempts cleared' };
    } catch (error) {
      console.error('Error clearing all failed attempts:', error);
      return { success: false, message: error.message };
    }
  }

  // Force clear all login attempt data (admin utility)
  async wipeAllLoginAttempts() {
    try {
      // Clear specific email attempts
      const emails = ['sjbrodrick@gmail.com', 'sjebrodrick@gmail.com'];
      const clearPromises = emails.map(email => this.clearFailedAttempts(email));
      await Promise.all(clearPromises);
      
      // Also try to clear any other failed attempt keys that might exist
      const allKeys = await AsyncStorage.getAllKeys();
      const failedAttemptKeys = allKeys.filter(key => key.startsWith('failedAttempts_'));
      
      if (failedAttemptKeys.length > 0) {
        await AsyncStorage.multiRemove(failedAttemptKeys);
        console.log(`Removed ${failedAttemptKeys.length} failed attempt keys:`, failedAttemptKeys);
      }
      
      console.log('✅ All login attempts wiped successfully');
      return { 
        success: true, 
        message: `Cleared login attempts for ${emails.length} configured emails and ${failedAttemptKeys.length} additional keys`,
        clearedEmails: emails,
        clearedKeys: failedAttemptKeys
      };
    } catch (error) {
      console.error('Error wiping login attempts:', error);
      return { success: false, message: error.message };
    }
  }

  // Test connection to backend
  async testConnection() {
    try {
      const response = await axios.get(`${API_BASE_URL}/`, {
        timeout: 5000,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Password reset request
  async requestPasswordReset(email) {
    try {
      if (!this.validateEmail(email)) {
        throw new Error('Please check your email format');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        email: email.toLowerCase(),
      });

      return {
        success: response.data.success,
        message: response.data.message || 'Password reset email sent',
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        message: error.message || 'We couldn\'t send the reset email right now. Please try again.',
      };
    }
  }
}

const authServiceInstance = new AuthService();

// Expose utility functions globally for debugging
if (__DEV__) {
  global.clearLoginAttempts = async () => {
    try {
      const result = await authServiceInstance.wipeAllLoginAttempts();
      console.log('Manual clear result:', result);
      return result;
    } catch (error) {
      console.error('Manual clear failed:', error);
      return { success: false, error: error.message };
    }
  };
  
  global.checkLoginAttempts = async (email) => {
    try {
      const attempts = await authServiceInstance.getFailedAttempts(email);
      console.log(`Login attempts for ${email}:`, attempts);
      return attempts;
    } catch (error) {
      console.error('Check attempts failed:', error);
      return null;
    }
  };
  
  console.log('🔧 Debug utilities available: clearLoginAttempts(), checkLoginAttempts(email)');
}

export default authServiceInstance;