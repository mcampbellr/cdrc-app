import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, View } from "react-native";

export default function OAuthRedirectHandler() {
  const { colors } = useThemeColors();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="small" color={colors.textPrimary} />
    </View>
  );
}
