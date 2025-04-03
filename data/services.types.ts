export const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const API_ROUTES = {
  auth: {
    logout: "/v1/auth/logout",
    profile: "/v1/auth/me",
    social: "/v1/auth/social",
    mfa: {
      validate: "/v1/auth/mfa/validate",
    },
  },
};
