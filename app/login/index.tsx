import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  AppState,
} from "react-native";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ThemedButton from "@/components/ThemedButton";
import { ColorsThemePalette } from "@/constants/Colors";
import { useUserStore } from "@/state/users.store";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import * as Clipboard from "expo-clipboard";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import BrandLogo from "@/components/BrandLogo";
import {
  apiCallSignInWithGoogle,
  apiCallValidateMFAToken,
} from "@/api/security.api";
import { saveRefreshToken } from "@/state/refreshToken.store";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const userStore = useUserStore();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userStore.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const appState = useRef(AppState.currentState);
  const [otp, setOtp] = useState("");
  const [otpAsked, setOtpAsked] = useState(false);
  const { promptAsync } = useGoogleAuth();

  const [preAuthToken, setPreAuthToken] = useState<string | null>(null);

  const { colors } = useThemeColors();
  const styles = useMemo(() => themeStyles(colors), [colors]);
  const otpInputRef = useRef<OtpInputRef>(null);

  useEffect(() => {
    setUser(userStore.user);
  }, [userStore.user]);

  const handlePressAsync = async () => {
    setLoading(true);
    if (userStore.googleToken) {
      handleSignIn();
      return;
    }
    await promptAsync();
  };

  useEffect(() => {
    if (user) return;
    handleSignIn();
  }, [userStore.googleToken, user]);

  const handleSignIn = () => {
    if (!userStore.googleToken) return;
    getUserInformation(userStore.googleToken);
    setLoading(false);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleCancelPress = () => {
    bottomSheetRef.current?.close();
    otpInputRef.current?.clear();
    Keyboard.dismiss();
    setModalVisible(false);
    setOtpAsked(false);
    setLoading(false);
    userStore.setGoogleToken(null);
  };

  const handleOpen = () => {
    setModalVisible(true);
    setOtpAsked(true);
    otpInputRef.current?.focus();
    bottomSheetRef.current?.expand();
  };

  const handleVerifyToken = async () => {
    setLoading(true);
    Keyboard.dismiss();
    if (!preAuthToken) return;

    try {
      const { data } = await apiCallValidateMFAToken(otp, preAuthToken);
      await handleSuccessLoging(data.accessToken, data.refreshToken);
    } catch (error) {
      otpInputRef.current?.clear();
      setLoading(false);
    }
  };

  const handleSuccessLoging = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    await userStore.setUser(accessToken);
    await saveRefreshToken(refreshToken);
    setLoading(false);
    bottomSheetRef.current?.close();
    setModalVisible(false);
    setOtpAsked(false);
    otpInputRef.current?.clear();
    router.replace("/(tabs)");
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (!otpAsked) return;
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          const clipboard = await Clipboard.getStringAsync();
          const trimmed = clipboard.trim();

          if (/^\d{6}$/.test(trimmed)) {
            otpInputRef.current?.setValue(trimmed);
          }
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [otpAsked]);

  const getUserInformation = async (token: string) => {
    if (!token) return;
    try {
      const result = await apiCallSignInWithGoogle(token);

      if (result.requiresTwoFactor) {
        if (!result.preAuthToken) return;
        setPreAuthToken(result.preAuthToken);
        handleOpen();
      }

      if (!result.user) {
        return;
      }
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <BrandLogo />
            </View>
            <View style={styles.authContainer}>
              <Text>{JSON.stringify(user, null, 2)}</Text>
              {!user && (
                <GoogleLoginButton
                  loading={loading}
                  handlePressAsync={handlePressAsync}
                />
              )}
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
              <ThemedText
                type="subtitle"
                style={{ marginTop: 25, marginBottom: 20 }}
              >
                Ingrese su código de verificación
              </ThemedText>
              <View style={{ marginTop: 20 }}>
                <OtpInput
                  numberOfDigits={6}
                  ref={otpInputRef}
                  autoFocus={false}
                  onTextChange={(text) => setOtp(text)}
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
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  Cancelar
                </Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const themeStyles = (_theme: ColorsThemePalette) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 20,
      marginTop: 80,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "white",
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    authContainer: {
      padding: 10,
      flexDirection: "column",
      width: "100%",
    },
    bottomSheetContent: {
      padding: 30,
      paddingTop: 50,
      borderRadius: 8,
    },
  });
};
