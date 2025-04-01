import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

const colors = {
  brand: {
    100: "#C3C6CB",
    200: "#878C96",
    300: "#4C5362",
    350: "#404857",
    400: "#101A2D",
    500: "#0C1322",
    700: "#04060B",
  },
  accent: {
    400: "#D9A441",
    500: "#6D5221",
    600: "red",
  },
  gray: {
    100: "#F7F7F7",
    200: "#E1E1E1",
    300: "#CFCFCF",
    400: "#B1B1B1",
    500: "#9E9E9E",
    600: "#7E7E7E",
    700: "#626262",
    800: "#515151",
    900: "#3B3B3B",
  },
};

export interface ColorsThemePalette {
  text: string;
  surfacePrimary: string;
  buttonBackground: string;
  buttonText: string;
  cardBackground: string;
  navBackground: string;
  navText: string;
  navTextActive: string;
  border: string;
}

export interface ColorsTheme {
  primary: string;
  light: ColorsThemePalette;
  dark: ColorsThemePalette;
}

export const Colors: ColorsTheme = {
  primary: colors.brand[400],
  light: {
    text: "#11181C",
    cardBackground: colors.gray[100],
    surfacePrimary: colors.gray[200],
    buttonBackground: colors.accent[400],
    buttonText: colors.brand[700],
    navBackground: colors.accent[400],
    navTextActive: colors.brand[500],
    navText: colors.accent[500],
    border: colors.gray[300],
  },
  dark: {
    text: "#ECEDEE",
    cardBackground: colors.gray[700],
    surfacePrimary: colors.brand[500],
    buttonBackground: colors.accent[400],
    navBackground: colors.accent[400],
    navText: colors.accent[500],
    navTextActive: colors.brand[500],
    border: colors.gray[600],
    buttonText: colors.brand[500],
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.surfacePrimary,
  },
};

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.surfacePrimary,
  },
};
