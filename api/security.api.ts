import { User } from "@/constants/users.interface";
import api from "./client.api";

interface SignInWithGoogleResponse {
  user?: User;
  accessToken?: string;
  preAuthToken?: string;
  requiresTwoFactor?: boolean;
}

interface MFAValidationResponse {
  accessToken: string;
  deviceId: string;
  refreshToken: string;
}

export const apiCallValidateMFAToken = async (token: string, pat: string) => {
  return api.post<MFAValidationResponse>(
    "/v1/auth/mfa/validate",
    { mfaToken: token, source: "native" },
    {
      headers: {
        Authorization: `Bearer ${pat}`,
      },
    },
  );
};

export const apiCallSignInWithGoogle = async (idToken: string) => {
  const result = await api.post<SignInWithGoogleResponse>("v1/auth/google", {
    idToken,
  });

  return result.data;
};

export const apiCallGetProfile = async () => {
  const result = await api.get<User>("/v1/auth/me");

  return result.data;
};
