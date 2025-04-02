import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Prompt } from "expo-auth-session";
import { useUserStore } from "@/state/users.store";

export const useGoogleAuth = () => {
  const userStore = useUserStore();
  const [canceled, setCancel] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
    scopes: ["openid", "profile", "email"],
    prompt: Prompt.SelectAccount,
  });

  useEffect(() => {
    if (userStore.user) return;
    if (response?.type === "success") {
      const { access_token } = response.params;
      userStore.setGoogleToken(access_token);
    } else {
      setCancel(true);
    }

    const timeout = setTimeout(() => {
      setCancel(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [response, userStore.user]);

  return {
    request,
    promptAsync,
    canceled,
    response,
  };
};
