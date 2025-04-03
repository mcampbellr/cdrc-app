import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Prompt } from "expo-auth-session";

export const useGoogleAuth = () => {
  const [googleCanceled, setGoogleCanceled] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(
    null,
  );

  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
    scopes: ["openid", "profile", "email"],
    prompt: Prompt.SelectAccount,
  });

  useEffect(() => {
    if (!response) return;
    if (response.type === "success") {
      const { access_token } = response.params;
      setGoogleAccessToken(access_token);
    } else if (response.type === "cancel") {
      setGoogleCanceled(true);
    }

    const timeout = setTimeout(() => {
      setGoogleCanceled(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [response]);

  return {
    googleAccessToken,
    promptAsync,
    googleCanceled,
    setGoogleCanceled,
    setGoogleAccessToken,
  };
};
