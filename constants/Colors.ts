import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

const colors = {
  brand: {
    50: "#747372",
    100: "#5D5C5B",
    200: "#454543",
    300: "#2E2D2C",
    400: "#171614",
    500: "#151412",
    600: "#121210",
    700: "#100F0E",
    800: "#0E0D0C",
    900: "#0C0B0A",
  },
  accent: {
    50: "#A4856D",
    100: "#957055",
    200: "#865C3D",
    300: "#774724",
    400: "#68330C",
    500: "#5E2E0B",
    600: "#53290A",
    700: "#492408",
    800: "#3E1F07",
    900: "#341A06",
  },
  gray: {
    50: "#E5E5E5",
    100: "#CCCCCC",
    200: "#B2B2B2",
    300: "#999999",
    400: "#808080",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#000000",
  },
  white: "#FFFFFF",
  black: "#000000",
  lighterBlue: "#95DDEC",
  blue: "#56C0D5",
  darkerBlue: "#15515D",
  lighterRed: "#EB929D",
  red: "#C03142",
  darkerRed: "#68131D",
  lighterYellow: "#EBD49C",
  yellow: "#C19735",
  darkerYellow: "#61480C",
  lighterGreen: "#AOCESC",
  green: "#5D7539",
  darkerGreen: "#2C430B",
};

const brandPrimary = colors.brand[600];

export interface ColorsThemePalette {
  surfacePrimary: string;
  surfaceInverted: string;
  buttonBackgroundPrimary: string;
  buttonLabelPrimary: string;
  textPrimary: string;
  textInverted: string;
  inputBackground: string;
  inputPlaceholder: string;
  cardBackground: string;

  navbarSurface: string;
  navbarIconInactive: string;
  navIconActive: string;

  border: string;
}

export interface ColorsTheme {
  primary: string;
  light: ColorsThemePalette;
  dark: ColorsThemePalette;
}

export const Colors: ColorsTheme = {
  primary: brandPrimary,

  light: {
    surfacePrimary: colors.gray[200],
    surfaceInverted: brandPrimary,
    buttonBackgroundPrimary: colors.accent[300],
    buttonLabelPrimary: colors.gray[50],
    textPrimary: colors.brand[700],
    textInverted: colors.gray[200],
    inputBackground: colors.gray[100],
    inputPlaceholder: colors.gray[300],
    cardBackground: colors.gray[100],

    // Pending in figma
    navbarSurface: colors.brand[700],
    navIconActive: colors.accent[50],
    navbarIconInactive: colors.brand[50],
    border: colors.gray[300],
  },

  dark: {
    surfacePrimary: colors.brand[500],
    surfaceInverted: colors.gray[200],
    buttonBackgroundPrimary: colors.accent[400],
    buttonLabelPrimary: colors.gray[50],
    textPrimary: colors.gray[50],
    textInverted: colors.brand[700],
    inputBackground: colors.gray[700],
    inputPlaceholder: colors.gray[500],
    cardBackground: colors.brand[300],

    navbarSurface: colors.brand[50],
    navbarIconInactive: colors.brand[500],
    navIconActive: colors.accent[400],
    border: colors.gray[600],
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
