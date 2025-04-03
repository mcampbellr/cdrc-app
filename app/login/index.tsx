import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";

// Hooks
import { useThemeColors } from "@/hooks/useThemeColors";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useAppleAuth } from "@/hooks/useAppleAuth";

// Components
import BrandLogo from "@/components/BrandLogo";
import { ThemedText } from "@/components/ThemedText";
import { AppleLoginButton } from "@/components/AppleLoginButton";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

// State & API
import { AuthProvider } from "@/data/auth.interface";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { useAppStore } from "@/state/app.store";
import ThemedButton from "@/components/ThemedButton";
import { useUserProfileService } from "@/hooks/services/useUserProfileService";
import { useSocialLogin } from "@/hooks/services/useSocialLoginService";
import FullScreenLoader from "@/components/FullScreenLoader";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { data: user } = useUserProfileService();

  const appStore = useAppStore();
  const { colors } = useThemeColors();
  const router = useRouter();

  const login = useLogin();
  const socialLogin = useSocialLogin();
  const signInWithApple = useAppleAuth();

  const {
    promptAsync,
    googleAccessToken,
    googleCanceled,
    setGoogleCanceled,
    setGoogleAccessToken,
  } = useGoogleAuth();

  useEffect(() => {
    handleGoogleResponse();
  }, [googleAccessToken, googleCanceled]);

  useEffect(() => {
    if (user) {
      router.replace("/(private)/(tabs)");
    }
  }, [user]);

  const showLoginErrorAlert = () => {
    Alert.alert("Error", "No se pudo obtener la información del usuario.", [
      { text: "OK" },
    ]);
  };

  const handleGoogleResponse = async () => {
    if (googleAccessToken) {
      await getUserInformation(googleAccessToken, AuthProvider.GOOGLE);
      setGoogleAccessToken(null);
    }

    if (googleCanceled) {
      Alert.alert(
        "Acción cancelada",
        "El inicio de sesión con Google fue cancelado.",
        [{ text: "OK" }],
      );
      setGoogleCanceled(false);
    }
  };

  const getUserInformation = async (
    token: string,
    provider: AuthProvider,
    userName?: string,
  ) => {
    socialLogin.mutate(
      { token, provider, userName },
      {
        onSuccess: async (result) => {
          if (result.requiresTwoFactor && result.preAuthToken) {
            router.push({
              pathname: "/login/mfa",
              params: {
                token: result.preAuthToken,
              },
            });

            return;
          } else if (result.user && result.accessToken && result.refreshToken) {
            await login(
              result.user.id,
              result.accessToken,
              result.refreshToken,
            );
            return;
          }

          showLoginErrorAlert();
        },
        onError: (err) => {
          console.error("[Login] Error en getUserInformation:", err);
          showLoginErrorAlert();
        },
      },
    );
  };

  const handleLoginWithGoogle = async () => {
    await promptAsync();
  };

  const handleLoginWithApple = async () => {
    const result = await signInWithApple();

    if (result.error || !result.credentials?.identityToken) {
      showLoginErrorAlert();
      return;
    } else if (result.canceled) {
      Alert.alert(
        "Acción cancelada",
        "El inicio de sesión con Apple fue cancelado.",
        [{ text: "OK" }],
      );
      return;
    }

    const userFullName =
      result.credentials?.fullName?.givenName +
      " " +
      result.credentials?.fullName?.familyName;

    await getUserInformation(
      result.credentials?.identityToken,
      AuthProvider.APPLE,
      userFullName,
    );
  };

  if (socialLogin.isPending) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <BrandLogo color={colors.textPrimary} size={175} />
          </View>
          <View style={styles.authContainer}>
            {Platform.OS === "ios" && (
              <ThemedText style={styles.titleText}>
                Inicia sesión con tu cuenta de:
              </ThemedText>
            )}
            <View style={styles.socialButtons}>
              <GoogleLoginButton
                label="Google"
                onPress={handleLoginWithGoogle}
              />
              {Platform.OS === "ios" && (
                <AppleLoginButton
                  label="Apple"
                  onPress={handleLoginWithApple}
                />
              )}
            </View>
            <ThemedButton
              onPress={() => {
                appStore.setOnboardingCompleted(false);
                router.replace("/onboarding");
              }}
            >
              <ThemedText>reset onboarding</ThemedText>
            </ThemedButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    marginTop: 80,
  },
  authContainer: {
    padding: 10,
    flexDirection: "column",
    width: "100%",
  },
  socialButtons: {
    flexDirection: "row",
    gap: 10,
  },
  titleText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitleText: {
    marginTop: 25,
    marginBottom: 20,
  },
});
