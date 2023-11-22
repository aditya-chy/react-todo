import React, { createContext, useContext } from 'react';
import Axios from 'axios';

const AxiosContext = createContext();

export function useAxios() {
  return useContext(AxiosContext);
}

export function AxiosProvider({ children }) {
  const axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000', // Adjust the base URL as needed
    // Additional configuration options (headers, interceptors, etc.)
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}
