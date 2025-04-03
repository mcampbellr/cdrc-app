import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
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
import { useUserStore } from "@/state/users.store";
import { apiCallSignInWithSocial } from "@/api/security.api";
import { AuthProvider } from "@/data/auth.interface";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { useAppStore } from "@/state/app.store";
import ThemedButton from "@/components/ThemedButton";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const { colors } = useThemeColors();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const login = useLogin();

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
    if (!userStore.user) return;
    router.replace("/(private)/(tabs)");
  }, [userStore.user]);

  const showLoginErrorAlert = () => {
    Alert.alert("Error", "No se pudo obtener la información del usuario.", [
      { text: "OK" },
    ]);
    setLoading(false);
  };

  const handleGoogleResponse = async () => {
    if (googleAccessToken) {
      setLoading(true);
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
    type: AuthProvider,
    userName?: string,
  ) => {
    try {
      const result = await apiCallSignInWithSocial(token, type, userName);

      if (result.requiresTwoFactor && result.preAuthToken) {
        router.push({
          pathname: "/login/mfa",
          params: {
            token: result.preAuthToken,
          },
        });

        return;
      } else if (result.user && result.accessToken && result.refreshToken) {
        await login(result.user, result.accessToken, result.refreshToken);
        return;
      }

      showLoginErrorAlert();
    } catch (err) {
      console.error("[Login] Error en getUserInformation:", err);
      showLoginErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    await promptAsync();
  };

  const handleLoginWithApple = async () => {
    setLoading(true);
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
                loading={loading}
                label="Google"
                onPress={handleLoginWithGoogle}
              />
              {Platform.OS === "ios" && (
                <AppleLoginButton
                  loading={loading}
                  label="Apple"
                  onPress={handleLoginWithApple}
                />
              )}
            </View>
            <ThemedButton
              onPress={() => {
                appStore.setOnboardingCompleted(false);
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
