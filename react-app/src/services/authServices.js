import api from "./api.js";

const AUTH_PREFIX = "/login";

const validateUser = async (username) => {
  try {
    const response = await api.get(`${AUTH_PREFIX}/validateUser`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "User validation failed. Please try again.",
    };
  }
};

const signIn = async (username, password) => {
  try {
    const response = await api.post(`${AUTH_PREFIX}/signIn`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.error || "Sign in failed. Please try again.",
    };
  }
};

const signUp = async (userData) => {
  try {
    const response = await api.post(`${AUTH_PREFIX}/signup`, userData);
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.error || "Sign up failed. Please try again.",
    };
  }
};

const logout = async () => {
  try {
    await api.post(`${AUTH_PREFIX}/logout`);
    return { message: "Logged out successfully" };
  } catch (error) {
    return {
      error: error.response?.data?.error || "Logout failed. Please try again.",
    };
  }
};

const getSession = async () => {
  try {
    const response = await api.get(`${AUTH_PREFIX}/session`);
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.error || "Failed to fetch session data.",
    };
  }
};

export { validateUser, signIn, signUp, logout, getSession };
