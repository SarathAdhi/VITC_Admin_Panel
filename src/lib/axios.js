import { showErrorAlert } from "@utils/alert";
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
    showErrorAlert(
      JSON.stringify(error?.response?.data?.error) ||
        "Could not connect to server"
    );

    return Promise.reject(error?.response?.data);
  }
);

export default axios;
