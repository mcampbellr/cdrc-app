import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  accessToken: string | null;
  userId: string | null;
  setAccessToken: (token: string) => void;
  setUserId: (userId: string) => void;
  clear: () => void;
}

const initialState: Pick<UserStore, "accessToken" | "userId"> = {
  accessToken: null,
  userId: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, _get) => ({
      ...initialState,
      setAccessToken: (token: string) => {
        set(() => ({ accessToken: token }));
      },
      setUserId: (userId: string) => {
        set(() => ({ userId }));
      },
      clear: () => {
        set(() => initialState);
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
