import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

// Define constants for keys and URLs to avoid magic strings
const TOKEN_KEY = 'token';
const API_LOGIN_URL = '/users/login';
const API_SIGNUP_URL = '/users/signup';
const API_LOGOUT_URL = '/users/logout';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const user = ref<{ id: string; name: string } | null>(null);
  const error = ref<string | null>(null);

  // Utility function to update token
  function updateToken(newToken: string | null) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  // Load token from localStorage if available
  function loadTokenFromLocalStorage() {
    updateToken(localStorage.getItem(TOKEN_KEY));
  }

  // Login function to call API and store token
  async function login(email: string, password: string) {
    try {
      const response = await axios.post(API_LOGIN_URL, { email, password }, { withCredentials: true });

      // Store token and update state
      const { token: receivedToken, user: userData } = response.data;
      updateToken(receivedToken);
      user.value = userData;
    } catch (err) {
      handleApiError(err, 'Login failed: Invalid credentials');
    }
  }

    // Signup function to call API and create a new user
  async function signup(name: string, email: string, password: string, address: string) {
    try {
      await axios.post(API_SIGNUP_URL, { name, email, password, address });
    } catch (err) {
      handleApiError(err, 'Signup failed');
    }
  }

  // Logout function to call API and remove token
  async function logout() {
    try {
      await axios.post(API_LOGOUT_URL);
      updateToken(null);
      user.value = null;
    } catch (err) {
      handleApiError(err, 'Logout failed');
    }
  }

  // Check if the user is authenticated
  function isAuthenticated() {
    return !!token.value;
  }

  // Centralized error handling function
  function handleApiError(err: any, defaultMessage: string) {
    console.error('API error:', err);
    error.value = defaultMessage;
  }

  return {
    token,
    user,
    error,
    login,
    signup,
    logout,
    isAuthenticated,
    loadTokenFromLocalStorage,
  };
});
