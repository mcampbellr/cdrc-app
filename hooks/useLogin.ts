import { User } from "@/data/users.interface";
import { saveRefreshToken } from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import { useNavigate } from "./useNavigate";

export default function useLogin() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const login = async (
    user: User,
    accessToken: string,
    refershToken: string,
  ) => {
    userStore.setUser(user, accessToken);
    await saveRefreshToken(refershToken);

    navigate("/(private)/(tabs)");
  };

  return login;
}
