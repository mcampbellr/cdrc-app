import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/state/users.store";
import {
  getRefreshToken,
  deleteRefreshToken,
} from "@/state/refreshToken.store";
import { QUERY_KEYS } from "@/data/queryKeys";
import { User } from "@/data/users.interface";
import { useNavigate } from "@/hooks/useNavigate";
import api from "@/api/client.api";
import { API_ROUTES } from "@/data/services.types";

export const useLogoutService = () => {
  const queryClient = useQueryClient();
  const userStore = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = await getRefreshToken();
      console.log("Refresh token:", refreshToken);

      const userProfile = queryClient.getQueryData<User>(
        QUERY_KEYS.userProfile,
      );
      const userId = userProfile?.id;

      if (!refreshToken || !userId)
        throw new Error("No refresh token or user ID");

      await api.post(
        API_ROUTES.auth.logout,
        { refreshToken, userId },
        {
          headers: {
            Authorization: `Bearer ${userStore.accessToken}`,
          },
        },
      );
    },
    onSuccess: async () => {
      queryClient.clear();
      userStore.clear();
      await deleteRefreshToken();
      navigate("/login");
    },
    onError: async (err) => {
      queryClient.clear();
      userStore.clear();
      await deleteRefreshToken();
      navigate("/login");
      console.log("Error during logout:", err);
    },
  });
};
