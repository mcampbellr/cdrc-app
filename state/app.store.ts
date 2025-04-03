import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  colorMode: ColorSchemeName | undefined;
  setColorMode: (colorMode: ColorSchemeName) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, _get) => ({
      colorMode: undefined,
      setColorMode: (colorMode) => set(() => ({ colorMode })),
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
