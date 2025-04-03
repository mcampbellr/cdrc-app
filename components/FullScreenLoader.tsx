import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function FullScreenLoader() {
  const { colors } = useThemeColors();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.textPrimary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
