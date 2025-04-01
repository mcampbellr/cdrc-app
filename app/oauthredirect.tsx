// app/oauthredirect.tsx
import { useUserStore } from "@/state/users.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function OAuthRedirectHandler() {
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    if (!userStore.goggleToken) return;
    // Redirige inmediatamente o simplemente ignora
    router.replace("/login");
  }, [userStore.goggleToken]);

  return null;
}
