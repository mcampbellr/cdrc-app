import { ThemeProvider } from "@react-navigation/native";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/constants/Colors";

type ThemeContextType = {
  theme: ColorSchemeName;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();

  const [theme, setTheme] = useState<ColorSchemeName>(
    systemColorScheme || "dark",
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider value={theme === "dark" ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
