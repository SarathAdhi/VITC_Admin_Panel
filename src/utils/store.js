import axios from "axios";
import create from "zustand";

export const appStore = create((set) => ({
  user: {},
  setProfile: async (user) => {
    set({ user });
  },

  isAuth: false,
  setIsAuth: async (isAuth) => {
    set({ isAuth });
  },

  getProfile: async () => {
    const token = localStorage.getItem("token") || "dummy-token";

    if (!token) {
      return;
    }

    try {
      const { data } = await axios.post(
        process.env.SERVER_BASE_URL + "/admin/verify",
        { token }
      );

      console.log(data);

      set({ isAuth: data.isAuth });
    } catch ({ error }) {
      console.log("error");

      localStorage.removeItem("token");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuth: false });
  },
}));
