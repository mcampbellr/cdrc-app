import { Colors, ColorsThemePalette } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import { useColorScheme } from "react-native";

export const useThemeColors = (): {
  colors: ColorsThemePalette;
  colorScheme: ColorSchemeName;
} => {
  const colorScheme: ColorSchemeName = useColorScheme() || "light";

  return {
    colors: colorScheme === "dark" ? Colors.dark : Colors.light,
    colorScheme,
  };
};
