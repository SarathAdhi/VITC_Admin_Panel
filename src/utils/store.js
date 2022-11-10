import axios from "@lib/axios";
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
      const { isAuth, user } = await axios.post("/auth/verify", { token });

      console.log({ isAuth });

      set({ isAuth, user });
    } catch (err) {
      console.log("error");

      localStorage.removeItem("token");
    }
  },

  notificationCount: 0,

  getNotifications: async () => {
    const notificationCount = await axios.get(
      "/faculty/approvals?isApproved=false"
    );

    set({ notificationCount: notificationCount.length });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuth: false });
  },
}));
