import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export const primitiveColors = {
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

const brandPrimary = primitiveColors.brand[600];

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
    surfacePrimary: primitiveColors.gray[200],
    surfaceInverted: brandPrimary,
    buttonBackgroundPrimary: primitiveColors.accent[300],
    buttonLabelPrimary: primitiveColors.gray[50],
    textPrimary: primitiveColors.brand[700],
    textInverted: primitiveColors.gray[200],
    inputBackground: primitiveColors.gray[100],
    inputPlaceholder: primitiveColors.gray[300],
    cardBackground: primitiveColors.gray[100],

    // Pending in figma
    navbarSurface: primitiveColors.brand[700],
    navIconActive: primitiveColors.accent[50],
    navbarIconInactive: primitiveColors.brand[50],
    border: primitiveColors.gray[300],
  },

  dark: {
    surfacePrimary: primitiveColors.brand[500],
    surfaceInverted: primitiveColors.gray[200],
    buttonBackgroundPrimary: primitiveColors.accent[400],
    buttonLabelPrimary: primitiveColors.gray[50],
    textPrimary: primitiveColors.gray[50],
    textInverted: primitiveColors.brand[700],
    inputBackground: primitiveColors.gray[700],
    inputPlaceholder: primitiveColors.gray[500],
    cardBackground: primitiveColors.brand[300],

    navbarSurface: primitiveColors.brand[50],
    navbarIconInactive: primitiveColors.brand[500],
    navIconActive: primitiveColors.accent[400],
    border: primitiveColors.gray[600],
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
