import { deleteRefreshToken } from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function useLogout() {
  const router = useRouter();
  const userStore = useUserStore();

  const logout = useCallback(async () => {
    userStore.clear();
    await deleteRefreshToken();

    router.dismissTo("/login");
  }, [router, userStore]);

  return logout;
}
