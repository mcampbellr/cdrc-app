import { Colors, ColorsThemePalette } from "@/data/Colors";
import { useAppTheme } from "@/context/AppColorScheme";
import { ColorSchemeName } from "react-native";

export const useThemeColors = (): {
  colors: ColorsThemePalette;
  colorScheme: ColorSchemeName;
} => {
  const { theme } = useAppTheme();

  return {
    colors: theme === "dark" ? Colors.dark : Colors.light,
    colorScheme: theme,
  };
};
