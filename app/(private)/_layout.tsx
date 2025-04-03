import { useUserProfileService } from "@/hooks/services/useUserProfileService";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function Layout() {
  const router = useRouter();
  const { data: user, isLoading } = useUserProfileService();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [isLoading, user]);

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
