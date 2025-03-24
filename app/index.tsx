import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as WebBrowser from "expo-web-browser";

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { signInWithGoogle } from "@/api/auth.api";

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "993313171487-i2krjp9jud41f2gaskthevpiiqb0q62t.apps.googleusercontent.com",
    androidClientId:
      "993313171487-17oksbvitk3uiaim546lhpb5c5ig1739.apps.googleusercontent.com",
  });

  const handlePressAsync = async () => {
    setLoading(true);
    await promptAsync();
  };

  useEffect(() => {
    handleSignIn();
  }, [response]);

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

  const getUserInformation = async (token: string) => {
    if (!token) return;
    try {
      const result = await signInWithGoogle(token);

      console.log({ result });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.authContainer}>
          <TouchableOpacity
            onPress={handlePressAsync}
            style={styles.googleButton}
            disabled={loading}
          >
            {!loading && <AntDesign name="google" size={24} color="#4285F4" />}
            {loading ? (
              <Text style={styles.googleButtonText}>Loading...</Text>
            ) : (
              <Text style={styles.googleButtonText}>
                Sign in with Google Nuevo
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
