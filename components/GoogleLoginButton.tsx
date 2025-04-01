import React from "react";
import { View } from "react-native";
import ThemedButton, { ThemedButtonText } from "./ThemedButton";
import GoogleSvg from "./GoogleSvg";
import { useThemeColors } from "@/hooks/useThemeColors";

interface GoogleLoginButtonProps {
  loading: boolean;
  handlePressAsync: () => void;
  label?: string;
  loadingText?: string;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  loading,
  handlePressAsync,
  label = "Continuar con Google",
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
        <GoogleSvg />
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
