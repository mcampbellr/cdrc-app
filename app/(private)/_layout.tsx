import { useUserStore } from "@/state/users.store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

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
        animation: Platform.OS === "android" ? "slide_from_bottom" : "default",
      }}
    >
      <Stack.Screen name="(tabs)" key="tabs" />
      <Stack.Screen name="settings" key="settings" />
    </Stack>
  );
}
