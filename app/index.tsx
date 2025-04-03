import { ThemedText } from "@/components/ThemedText";
import { ColorsThemePalette } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAppStore } from "@/state/app.store";
import { useUserStore } from "@/state/users.store";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { apiCallGetProfile } from "@/api/security.api";

export default function App() {
  const { colors } = useThemeColors();
  const styles = useMemo(() => themeStyles(colors), [colors]);
  const router = useRouter();
  const appStore = useAppStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(colors.surfacePrimary);
      NavigationBar.setButtonStyleAsync("light"); // or "dark"
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (appStore.onboardingCompleted) {
        if (userStore.user) {
          try {
            await apiCallGetProfile();
            router.replace("/(private)/(tabs)");
          } catch (error) {
            userStore.clear();
            router.replace("/login");
          }
        } else {
          router.replace("/login");
        }
      } else {
        router.replace("/onboarding");
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [appStore.onboardingCompleted, userStore.user]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ActivityIndicator
          size={Platform.OS === "android" ? "large" : "small"}
          color={colors.surfaceInverted}
        />
        <ThemedText style={{ paddingTop: 10 }}>Cargando...</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const themeStyles = (theme: ColorsThemePalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.surfacePrimary,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  });
};
