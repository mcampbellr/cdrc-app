import { ThemeProvider } from "@react-navigation/native";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/data/Colors";
import { useAppStore } from "@/state/app.store";
import { StatusBar } from "expo-status-bar";

type ThemeContextType = {
  theme: ColorSchemeName;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();

  const appStore = useAppStore();

  useEffect(() => {
    if (!appStore.colorMode) {
      appStore.setColorMode(systemColorScheme);
    }
  }, [appStore.colorMode]);

  const toggleTheme = () => {
    appStore.setColorMode(appStore.colorMode === "dark" ? "light" : "dark");
  };

  return (
    <AppThemeContext.Provider
      value={{ theme: appStore.colorMode, toggleTheme }}
    >
      <ThemeProvider
        value={appStore.colorMode === "dark" ? darkTheme : lightTheme}
      >
        {children}
        <StatusBar style={appStore.colorMode === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
