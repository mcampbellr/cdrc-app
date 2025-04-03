import { StyleSheet } from "react-native";
import { useThemeColors } from "./useThemeColors";

export const useDefaultStyles = () => {
  const { colors } = useThemeColors();

  return StyleSheet.create({
    backButton: {
      backgroundColor: colors.buttonBackgroundPrimary,
      padding: 10,
      borderRadius: 5,
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
