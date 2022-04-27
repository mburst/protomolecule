import axios, { AxiosError, AxiosInstance } from 'axios';
import { Store } from './store';

let store: Store;

export const injectStore = (s: Store) => {
  store = s;
};

export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error.response?.config)
    if (error.response?.data.code === 0) {
      store.dispatch.snackbar.enqueueSnackbar({
        message: error.response.data.message,
        key: Math.random(),
        options: {
          variant: 'error',
        },
      });
    }

    return Promise.reject(error);
  },
);
