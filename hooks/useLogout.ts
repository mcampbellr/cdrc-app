import api from "@/api/client.api";
import {
  deleteRefreshToken,
  getRefreshToken,
} from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import { useRouter } from "expo-router";

export default function useLogout() {
  const router = useRouter();
  const userStore = useUserStore();

  const logout = async () => {
    try {
      const refreshToken = await getRefreshToken();
      const user = userStore.user;
      await api.post(
        "/v1/auth/logout",
        { refreshToken, userId: user?.id },
        {
          headers: {
            Authorization: `Bearer ${userStore.accessToken}`,
          },
        },
      );

      userStore.clear();
      await deleteRefreshToken();

      router.dismissTo("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
}
