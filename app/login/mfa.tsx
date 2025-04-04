import AppHeader from "@/components/AppHeader";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { useValidateMfaService } from "@/hooks/services/useValidateMfaService";
import { useClipboardOtpAutofill } from "@/hooks/useClipboardOtpAutofill";
import useLogin from "@/hooks/useLogin";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";

export default function Page() {
  const otpInputRef = useRef<OtpInputRef>(null);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { colors } = useThemeColors();

  const login = useLogin();
  const validateMfa = useValidateMfaService();

  const { token } = useLocalSearchParams<{ token: string }>();

  useEffect(() => {
    if (!token) {
      if (router.canGoBack()) {
        router.replace("/login");
      }
    }
  }, [token]);

  useClipboardOtpAutofill({
    enabled: true,
    onDetect: (otp) => otpInputRef.current?.setValue(otp),
  });

  const handleVerifyToken = async () => {
    if (!token) {
      router.replace("/login");
      return;
    }

    validateMfa.mutate(
      { otp: otp, preAuthToken: token },
      {
        onSuccess: async (data) => {
          await login(data.user.id, data.accessToken, data.refreshToken);
        },
        onError: (_error) => {
          Alert.alert(
            "Error",
            "El código de verificación es incorrecto o ha expirado.",
            [{ text: "Ok" }],
          );
          otpInputRef.current?.clear();
        },
      },
    );
  };

  return (
    <>
      <AppHeader
        showLogo={false}
        showBackButton
        options={{ presentation: "modal" }}
        backHref="/login"
      />
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ flex: 1, backgroundColor: "red" }}
      >
        <View style={styles.bottomSheetContent}>
          <ThemedText type="title">Verifica tu identidad</ThemedText>
          <ThemedText type="subtitle">
            Ingrese su código de verificación
          </ThemedText>
          <View style={{ marginTop: 50 }}>
            <OtpInput
              numberOfDigits={6}
              ref={otpInputRef}
              onTextChange={setOtp}
              type="numeric"
              theme={{
                pinCodeContainerStyle: {
                  height: 45,
                  width: 45,
                  backgroundColor: colors.cardBackground,
                  borderWidth: 0,
                  borderRadius: 8,
                },
                pinCodeTextStyle: {
                  color: colors.textPrimary,
                  fontWeight: "bold",
                },
                focusStickStyle: {
                  backgroundColor: colors.surfacePrimary,
                },
              }}
            />
          </View>
          <ThemedButton
            loading={validateMfa.isPending}
            loadingText="Verificando..."
            label="Verificar"
            style={{ marginTop: 20 }}
            onPress={handleVerifyToken}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 30,
    paddingTop: 50,
    borderRadius: 8,
  },
});
