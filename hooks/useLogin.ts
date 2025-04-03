import { saveRefreshToken } from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import { useNavigate } from "./useNavigate";

export default function useLogin() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const login = async (
    userId: string,
    accessToken: string,
    refershToken: string,
  ) => {
    userStore.setAccessToken(accessToken);
    userStore.setUserId(userId);
    await saveRefreshToken(refershToken);

    navigate("/(private)/(tabs)");
  };

  return login;
}
