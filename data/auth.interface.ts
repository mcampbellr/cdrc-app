import { User } from "@/constants/users.interface";

export enum AuthProvider {
  GOOGLE = "google",
  APPLE = "apple",
}

export interface SignInResponse {
  user?: User;
  accessToken?: string;
  preAuthToken?: string;
  refreshToken?: string;
  requiresTwoFactor?: boolean;
}

export interface MFAValidationResponse {
  user: User;
  accessToken: string;
  deviceId: string;
  refreshToken: string;
}
