import { User } from "@/constants/users.interface";
import api from "./client.api";
import {
  AuthProvider,
  MFAValidationResponse,
  SignInResponse,
} from "@/data/auth.interface";

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

export const apiCallSignInWithSocial = async (
  token: string,
  provider: AuthProvider,
  userName?: string,
) => {
  const payload = {
    token,
    provider,
    ...(provider === AuthProvider.APPLE && userName ? { userName } : {}),
  };

  const result = await api.post<SignInResponse>("v1/auth/social", payload);

  return result.data;
};

export const apiCallGetProfile = async () => {
  const result = await api.get<User>("/v1/auth/me");

  return result.data;
};
