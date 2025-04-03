import { User } from "@/constants/users.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  accessToken: string | null;

  setUser: (user: User, accessToken: string) => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  clear: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, _get) => ({
      user: null,
      accessToken: null,

      updateProfile: async (user: User) => {
        set(() => ({ user }));
      },
      setUser: async (user: User, accessToken: string) => {
        set(() => ({ user, accessToken }));
      },
      logout: async () => {
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
