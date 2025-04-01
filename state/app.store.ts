import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, _get) => ({
      onboardingCompleted: false,
      setOnboardingCompleted: (completed) =>
        set(() => ({ onboardingCompleted: completed })),
    }),
    {
      name: "app",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
