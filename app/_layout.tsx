import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { AppHeaderProvider } from "@/context/AppHeaderContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { NotificationProvider } from "@/context/NotificationContext";
import { AppThemeProvider } from "@/context/AppColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
    maxAge: 1000 * 60 * 60, // 1 hora
  });

  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AppHeaderProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation:
                      Platform.OS === "android"
                        ? "slide_from_bottom"
                        : "default",
                  }}
                >
                  <Stack.Screen name="login/index" key="login" />
                  <Stack.Screen name="oauthredirect" key="oauthredirect" />

                  <Stack.Screen
                    key="login-mfa"
                    name="login/mfa"
                    options={{ presentation: "modal" }}
                  />
                </Stack>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </AppHeaderProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </AppThemeProvider>
  );
}
