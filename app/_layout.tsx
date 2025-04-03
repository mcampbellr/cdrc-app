import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { AppHeaderProvider } from "@/context/AppHeaderContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { NotificationProvider } from "@/context/NotificationContext";
import { AppThemeProvider } from "@/context/AppColorScheme";

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

  return (
    <AppThemeProvider>
      <NotificationProvider>
        <AppHeaderProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation:
                    Platform.OS === "android" ? "slide_from_bottom" : "default",
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
              <StatusBar style="auto" />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AppHeaderProvider>
      </NotificationProvider>
    </AppThemeProvider>
  );
}
