import axios from "axios";
import BASEURL from "../constants/BaseURL";

const axiosInstance = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: false, 
});

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const refreshJwtToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await axiosInstance.post("/auth/refresh-jwt", {
      token: refreshToken,
    });
    const newAccessToken = response.data.token;
    setAccessToken(newAccessToken); 
    return newAccessToken;
  } catch (error) {

    throw new Error("Unable to refresh token" + error);
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshJwtToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; 
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error); 
  }
);

export const signUpUser = async (userData) => {
  const res = await axiosInstance.post("/auth/signup", userData);
  return res.data;
};


export const signInUser = async (loginData) => {
  const res = await axiosInstance.post("/auth/signin", loginData);
  if (res.data.token) {
    localStorage.setItem("accessToken", res.data.jwtToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
};


export const fetchUser = async (email) => {
  const token = getAuthToken();
  const res = await axiosInstance.get(`/users/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateUser = async ({ email, updatedData }) => {
  const token = getAuthToken();
  const res = await axiosInstance.put(`/users/${email}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUser = async (email) => {
  const token = getAuthToken();
  const res = await axiosInstance.delete(`/users/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  logOutUser(); 
  return res.data;
};

export const logOutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userEmail");
};
