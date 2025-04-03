import { useUserStore } from "@/state/users.store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function Layout() {
  const userStorage = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!userStorage.user) {
      router.replace("/login");
    }
  }, [userStorage.user]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen name="(tabs)" key="tabs" />
      <Stack.Screen name="settings" key="settings" />
    </Stack>
  );
}
