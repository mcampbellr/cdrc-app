import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import * as WebBrowser from "expo-web-browser";

// Hooks
import { useThemeColors } from "@/hooks/useThemeColors";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useAppleAuth } from "@/hooks/useAppleAuth";

// Components
import ThemedButton from "@/components/ThemedButton";
import BrandLogo from "@/components/BrandLogo";

// State & API
import { useUserStore } from "@/state/users.store";
import {
  apiCallSignInWithSocial,
  apiCallValidateMFAToken,
} from "@/api/security.api";
import { ColorsThemePalette } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { AppleLoginButton } from "@/components/AppleLoginButton";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { useClipboardOtpAutofill } from "@/hooks/useClipboardOtpAutofill";
import { AuthProvider } from "@/data/auth.interface";
import useLogin from "@/hooks/useLogin";
import { User } from "@/constants/users.interface";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const userStore = useUserStore();
  const { colors } = useThemeColors();
  const styles = useMemo(() => themeStyles(colors), [colors]);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userStore.user);
  const [otp, setOtp] = useState("");
  const [otpAsked, setOtpAsked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [preAuthToken, setPreAuthToken] = useState<string | null>(null);

  const otpInputRef = useRef<OtpInputRef>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { promptAsync, canceled } = useGoogleAuth();
  const signInWithApple = useAppleAuth();
  const login = useLogin();

  useEffect(() => {
    if (user) return;
    if (userStore.googleToken) {
      getUserInformation(userStore.googleToken, AuthProvider.GOOGLE);
      setLoading(false);
    }
  }, [userStore.googleToken, user]);

  useClipboardOtpAutofill({
    enabled: otpAsked,
    onDetect: (otp) => otpInputRef.current?.setValue(otp),
  });

  const handleSocialLogin = async (
    type: AuthProvider,
    getToken: () => Promise<{
      token?: string;
      userName?: string;
      canceled?: boolean;
      error?: unknown;
    }>,
  ) => {
    setLoading(true);

    const { token, userName, canceled, error } = await getToken();

    if (canceled) {
      if (type === "apple") {
        setTimeout(() => {
          Alert.alert("Apple login canceled");
        }, 500);
      } else {
        Alert.alert("Google login canceled");
      }

      setLoading(false);
      return;
    }

    if (error || !token) {
      setLoading(false);
      return;
    }

    try {
      await getUserInformation(token, type, userName);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLoginWithGoogle = () =>
    handleSocialLogin(AuthProvider.GOOGLE, async () => {
      if (userStore.googleToken) {
        return { token: userStore.googleToken };
      }

      await promptAsync();
      if (!userStore.googleToken) {
        return { canceled: true };
      }

      return { token: userStore.googleToken, canceled };
    });

  const handleLoginWithApple = () =>
    handleSocialLogin(AuthProvider.APPLE, async () => {
      const result = await signInWithApple();

      if (result.error) {
        return { error: result.error };
      } else if (result.canceled) {
        return { canceled: true };
      }

      return {
        token: result.credentials!.identityToken || "",
        userName:
          result.credentials?.fullName?.givenName +
          " " +
          result.credentials?.fullName?.familyName,
        canceled: result.canceled,
        error: result.error,
      };
    });

  const handleOpenOtpModal = () => {
    setModalVisible(true);
    setOtpAsked(true);
    otpInputRef.current?.focus();
    bottomSheetRef.current?.expand();
  };

  const handleCancelPress = () => {
    otpInputRef.current?.clear();
    Keyboard.dismiss();
    bottomSheetRef.current?.close();
    setModalVisible(false);
    setOtpAsked(false);
    setLoading(false);
    userStore.setGoogleToken(null);
  };

  const handleVerifyToken = async () => {
    if (!preAuthToken) return;
    setLoading(true);
    Keyboard.dismiss();

    try {
      const { data } = await apiCallValidateMFAToken(otp, preAuthToken);
      await handleSuccessfulLogin(
        data.user,
        data.accessToken,
        data.refreshToken,
      );
    } catch {
      otpInputRef.current?.clear();
      setLoading(false);
    }
  };

  const handleSuccessfulLogin = async (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => {
    handleCancelPress();
    login(user, accessToken, refreshToken);
  };

  const getUserInformation = async (
    token: string,
    type: AuthProvider,
    userName?: string,
  ) => {
    try {
      const result = await apiCallSignInWithSocial(token, type, userName);

      if (result.requiresTwoFactor && result.preAuthToken) {
        setPreAuthToken(result.preAuthToken);
        handleOpenOtpModal();
      }

      if (!result.accessToken || !result.refreshToken) {
        Alert.alert("Error", "No se pudo iniciar sesión");
        return;
      }

      if (result.user) {
        setUser(result.user);
        await login(result.user, result.accessToken, result.refreshToken);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <BrandLogo color={colors.text} size={175} />
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        enableDynamicSizing={false}
        handleStyle={{ display: "none" }}
        snapPoints={["75%"]}
        index={-1}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: colors.surfacePrimary }}
        containerStyle={{
          backgroundColor: isModalVisible ? "rgba(0,0,0,0.8)" : "transparent",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BottomSheetView>
            <View style={styles.bottomSheetContent}>
              <ThemedText type="title">Verifica tu identidad</ThemedText>
              <ThemedText type="subtitle" style={styles.subtitleText}>
                Ingrese su código de verificación
              </ThemedText>
              <View style={{ marginTop: 20 }}>
                <OtpInput
                  numberOfDigits={6}
                  ref={otpInputRef}
                  autoFocus={false}
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
                      color: colors.surfacePrimary,
                      fontWeight: "bold",
                    },
                    focusStickStyle: {
                      backgroundColor: colors.surfacePrimary,
                    },
                  }}
                />
              </View>
              <ThemedButton
                loading={loading}
                loadingText="Verificando..."
                label="Verificar"
                style={{ marginTop: 20 }}
                onPress={handleVerifyToken}
              />
              <Pressable onPress={handleCancelPress}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const themeStyles = (theme: ColorsThemePalette) =>
  StyleSheet.create({
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
    bottomSheetContent: {
      padding: 30,
      paddingTop: 50,
      borderRadius: 8,
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
    cancelText: {
      color: theme.text,
      fontSize: 14,
      textAlign: "center",
      marginTop: 20,
    },
  });
