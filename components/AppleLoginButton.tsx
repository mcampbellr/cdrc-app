import React from "react";
import { View } from "react-native";
import ThemedButton, { ThemedButtonText } from "./ThemedButton";
import { useThemeColors } from "@/hooks/useThemeColors";
import { FontAwesome5 } from "@expo/vector-icons";

interface GoogleLoginButtonProps {
  loading: boolean;
  onPress: () => void;
  label?: string;
  loadingText?: string;
}

export const AppleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  loading,
  onPress: handlePressAsync,
  label = "Continuar con Apple",
  loadingText = "Cargando...",
}) => {
  const { colors } = useThemeColors();
  return (
    <ThemedButton
      loading={loading}
      loadingText={loadingText}
      onPress={handlePressAsync}
      style={{
        backgroundColor: colors.surfaceInverted,
      }}
    >
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <FontAwesome5 name="apple" size={24} color={colors.surfacePrimary} />
      </View>
      <ThemedButtonText
        style={{
          color: colors.surfacePrimary,
        }}
      >
        {label}
      </ThemedButtonText>
    </ThemedButton>
  );
};
