import AppHeader from "@/components/AppHeader";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppHeader showBackButton showLogo={false} options={options} />
        ),
        animation: Platform.OS === "android" ? "slide_from_bottom" : "default",
      }}
    >
      <Stack.Screen
        name="index"
        key="my-profile"
        options={{
          title: "Mi Perfil",
        }}
      />
      <Stack.Screen
        name="about"
        key="about"
        options={{
          presentation: "modal",
          title: "Acerca de CDR App",
        }}
      />

      <Stack.Screen
        name="configs"
        key="configs"
        options={{
          presentation: "modal",
          title: "Configuraciones",
        }}
      />
    </Stack>
  );
}
