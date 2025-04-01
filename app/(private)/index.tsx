import AppPageWragger from "@/components/AppPageWrapper";
import { ThemedText } from "@/components/ThemedText";
import { useHeaderRight } from "@/hooks/useHeader";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";

export default function Page() {
  const { colors } = useThemeColors();

  useHeaderRight(
    useMemo(
      () => (
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={{
            borderRadius: 999,
            borderWidth: 1,
            borderColor: colors.surfaceInverted,
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Octicons name="person" size={18} color={colors.surfaceInverted} />
        </TouchableOpacity>
      ),
      [],
    ),
  );

  return (
    <AppPageWragger>
      <ThemedText>Home</ThemedText>
    </AppPageWragger>
  );
}
