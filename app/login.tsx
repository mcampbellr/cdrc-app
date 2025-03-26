import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as WebBrowser from "expo-web-browser";

import * as Google from "expo-auth-session/providers/google";

import { useEffect, useState } from "react";
import { signInWithGoogle } from "@/api/auth.api";
import { Prompt, ResponseType } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  googleId: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: string;
  role: {
    type: string;
  };
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  const getUserInformation = async (token: string) => {
    if (!token) return;
    try {
      const result = await signInWithGoogle(token);

      console.log({ result });

      setUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <SafeAreaView>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 20,
              color: "white",
            }}
          >
            Hola {user?.name} {user?.email}
          </Text>
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
            <TouchableOpacity
              onPress={handlePressAsync}
              style={styles.googleButton}
              disabled={loading}
            >
              {!loading && (
                <AntDesign name="google" size={24} color="#4285F4" />
              )}
              {loading ? (
                <Text style={styles.googleButtonText}>Loading...</Text>
              ) : (
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
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
