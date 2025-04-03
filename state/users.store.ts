import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  accessToken: string | null;
  logout: () => Promise<void>;
  clear: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, _get) => ({
      accessToken: null,
      logout: async () => {
        set(() => ({ userId: null, accessToken: null }));
      },
      clear: () => {
        set(() => ({ userId: null, accessToken: null, googleToken: null }));
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
