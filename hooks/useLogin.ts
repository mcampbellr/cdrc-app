import { User } from "@/constants/users.interface";
import { saveRefreshToken } from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import { useRouter } from "expo-router";

export default function useLogin() {
  const router = useRouter();
  const userStore = useUserStore();

  const login = async (
    user: User,
    accessToken: string,
    refershToken: string,
  ) => {
    userStore.setUser(user, accessToken);
    await saveRefreshToken(refershToken);

    router.replace("/(private)");
  };

  return login;
}
