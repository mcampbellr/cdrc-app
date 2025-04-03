import api from "@/api/client.api";
import {
  deleteRefreshToken,
  getRefreshToken,
} from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import { useNavigate } from "./useNavigate";

export default function useLogout() {
  const userStore = useUserStore();
  const navigate = useNavigate();

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
    } catch (error) {
      console.log("Error during logout", error);
    } finally {
      userStore.clear();
      await deleteRefreshToken();
      navigate("/login");
    }
  };

  return logout;
}
