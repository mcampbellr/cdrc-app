import { StyleSheet } from "react-native";
import { useThemeColors } from "./useThemeColors";

export const useDefaultStyles = () => {
  const { colors } = useThemeColors();

  return StyleSheet.create({
    SettingButton: {
      backgroundColor: colors.cardBackground,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 12,
      marginBottom: 10,
      justifyContent: "center",
      minHeight: 55,
      maxHeight: 55,
    },
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
