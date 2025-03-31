import { User } from "@/constants/users.interface";
import { v1client } from "./client.api";

interface SignInWithGoogleResponse {
  user?: User;
  accessToken?: string;
  preAuthToken?: string;
  requiresTwoFactor?: boolean;
}

export const apiCallSignInWithGoogle = async (idToken: string) => {
  const result = await v1client.post<SignInWithGoogleResponse>("/auth/google", {
    idToken,
  });

  return result.data;
};
