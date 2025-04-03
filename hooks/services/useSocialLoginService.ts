import { useMutation } from "@tanstack/react-query";
import { AuthProvider, SignInResponse } from "@/data/auth.interface";
import api from "@/api/client.api";

interface SocialLoginArgs {
  token: string;
  provider: AuthProvider;
  userName?: string;
}

export const useSocialLogin = () =>
  useMutation({
    mutationFn: async ({ token, provider, userName }: SocialLoginArgs) => {
      const payload = {
        token,
        provider,
        ...(provider === AuthProvider.APPLE && userName ? { userName } : {}),
      };

      const result = await api.post<SignInResponse>("v1/auth/social", payload);

      return result.data;
    },
  });
