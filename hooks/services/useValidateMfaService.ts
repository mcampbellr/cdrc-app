import api from "@/api/client.api";
import { MFAValidationResponse } from "@/data/auth.interface";
import { API_ROUTES } from "@/data/services.types";
import { useMutation } from "@tanstack/react-query";

interface MFAValidationArgs {
  otp: string;
  preAuthToken: string;
}

export const useValidateMfaService = () =>
  useMutation({
    mutationFn: async ({ otp: token, preAuthToken }: MFAValidationArgs) => {
      const result = await api.post<MFAValidationResponse>(
        API_ROUTES.auth.mfa.validate,
        { mfaToken: token, source: "native" },
        {
          headers: {
            Authorization: `Bearer ${preAuthToken}`,
          },
        },
      );

      return result.data;
    },
  });
