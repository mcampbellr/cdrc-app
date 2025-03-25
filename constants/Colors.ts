import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const primaryColor = "#0E1223";

export interface ColorsTheme {
  primary: string;
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export const Colors: Record<string, ColorsTheme> = {
  light: {
    primary: primaryColor,
    text: "#11181C",
    background: "#D9D9D9",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: primaryColor,
    text: "#ECEDEE",
    background: primaryColor,
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,
  },
};

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
  },
};
