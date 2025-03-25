import { Colors, ColorsTheme } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import { useColorScheme } from "react-native";

export const useThemeColors = (): {
  colors: ColorsTheme;
  colorScheme: ColorSchemeName;
} => {
  const colorScheme: ColorSchemeName = useColorScheme() || "light";

  return {
    colors: Colors[colorScheme],
    colorScheme,
  };
};
