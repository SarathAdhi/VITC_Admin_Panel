import { showErrorToast } from "@utils/toast";
import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    showErrorToast(
      error?.response?.data?.error || "Could not connect to server"
    );

    return Promise.reject(error?.response?.data);
  }
);

export default axios;
