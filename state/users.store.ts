import api from "@/api/client.api";
import { User } from "@/constants/users.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  accessToken: string | null;
  googleToken: string | null;

  setUser: (accessToken: string) => Promise<void>;
  updateProfile: () => Promise<void>;
  setGoogleToken: (token: string | null) => void;
  logout: () => Promise<void>;
  clear: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, _get) => ({
      user: null,
      accessToken: null,
      googleToken: null,

      setGoogleToken: (token) => {
        set(() => ({ googleToken: token }));
      },
      updateProfile: async () => {
        const { data } = await api.get("/v1/auth/me");
        set(() => ({ user: data }));
      },
      setUser: async (accessToken) => {
        const { data } = await api.get("/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        set(() => ({ user: data, accessToken }));
      },
      logout: async () => {
        await api.post("/v1/auth/logout", {
          headers: {
            Authorization: `Bearer ${_get().accessToken}`,
          },
        });
        set(() => ({ user: null, accessToken: null }));
      },
      clear: () => {
        set(() => ({ user: null, accessToken: null, googleToken: null }));
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
