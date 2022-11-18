import axios from "@lib/axios";
import create from "zustand";

export const appStore = create((set) => ({
  user: {},
  setProfile: async (user) => {
    set({ user });
  },

  isAuth: false,
  isAdmin: false,

  setIsAuth: async (isAuth) => {
    set({ isAuth });
  },

  getProfile: async () => {
    try {
      const { isAuth, user } = await axios.get("/auth/verify");

      set((state) => {
        state.getNotifications();
        return { isAuth, user, isAdmin: user.role === "ADMIN" };
      });
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
