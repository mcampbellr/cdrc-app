import { View, Text, StyleSheet, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as WebBrowser from "expo-web-browser";

import * as Google from "expo-auth-session/providers/google";

import React, { useEffect, useRef, useState } from "react";
import { apiCallSignInWithGoogle } from "@/api/auth.api";
import { Prompt, ResponseType } from "expo-auth-session";
import { User } from "@/constants/users.interface";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ThemedButton, { ThemedButtonText } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
    scopes: ["openid", "profile", "email"],
    prompt: Prompt.SelectAccount,
    responseType: ResponseType.IdToken,
  });

  const handlePressAsync = async () => {
    setLoading(true);
    await promptAsync();
  };

  useEffect(() => {
    if (user) return;
    handleSignIn();
  }, [response, user]);

  const handleSignIn = () => {
    if (response?.type === "success") {
      if (!response.authentication) {
        console.error(response.params.error);
        return;
      }

      getUserInformation(response.authentication.accessToken);
    }
    setLoading(false);
  };

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpen = () => bottomSheetRef.current?.expand();

  const getUserInformation = async (token: string) => {
    if (!token) return;
    try {
      const result = await apiCallSignInWithGoogle(token);

      console.log({ requiresTwoFactor: result.requiresTwoFactor });

      if (result.requiresTwoFactor) {
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
    <GestureHandlerRootView
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      <SafeAreaView>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "white",
              alignSelf: "center",
            }}
            source={{ uri: user?.avatar }}
          />
        </View>
        <View style={styles.authContainer}>
          {!user && (
            <ThemedButton onPress={handlePressAsync}>
              {!loading && (
                <AntDesign
                  name="google"
                  size={24}
                  color={Colors.dark.buttonText}
                  style={{ marginRight: 10 }}
                />
              )}
              {loading ? (
                <ThemedButtonText>Loading...</ThemedButtonText>
              ) : (
                <ThemedButtonText>Sign in with Google</ThemedButtonText>
              )}
            </ThemedButton>
            /* <TouchableOpacity */
            /*   onPress={handlePressAsync} */
            /*   style={styles.googleButton} */
            /*   disabled={loading} */
            /* > */
            /* </TouchableOpacity> */
          )}
        </View>
      </SafeAreaView>

      <BottomSheet
        enableDynamicSizing={false}
        handleStyle={{
          display: "none",
        }}
        snapPoints={["75%"]}
        index={-1}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: "white" }}
      >
        <BottomSheetView>
          <View
            style={{
              padding: 20,
              height: 200,
              borderRadius: 8,
            }}
          >
            <Button title="Close" onPress={handleClosePress} />
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  treatmentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 10,
  },

  infoContainer: {
    backgroundColor: "white",
    padding: 20,
  },

  googleButton: {
    borderColor: "#4285F4",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    borderRadius: 8,
    padding: 10,
  },

  googleButtonText: {
    color: "#4285F4",
    fontWeight: "bold",
  },

  authContainer: {
    padding: 10,
    flexDirection: "column",
    width: "100%",
  },
});
