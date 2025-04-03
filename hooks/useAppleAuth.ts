import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import { useCallback } from "react";

type AppleAuthResult = {
  credentials?: AppleAuthenticationCredential;
  error?: any;
  canceled?: boolean;
};

export const useAppleAuth = () => {
  const signInWithApple = useCallback(async (): Promise<AppleAuthResult> => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      return { credentials };
    } catch (e: any) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        return { canceled: true };
      } else {
        return { error: e };
      }
    }
  }, []);

  return signInWithApple;
};
