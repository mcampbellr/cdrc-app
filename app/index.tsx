import { ColorsThemePalette, primitiveColors } from "@/data/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAppStore } from "@/state/app.store";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { useUserProfileService } from "@/hooks/services/useUserProfileService";
import BrandLogo from "@/components/BrandLogo";

export default function App() {
  const { colors, colorScheme } = useThemeColors();
  const styles = useMemo(() => themeStyles(colors), [colors]);
  const router = useRouter();
  const appStore = useAppStore();
  const { data: user, isLoading } = useUserProfileService({
    enabled: appStore.onboardingCompleted,
  });

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(primitiveColors.brand[500]);
      NavigationBar.setButtonStyleAsync("light");
    }
  }, [colorScheme, colors.surfacePrimary]);

  useEffect(() => {
    if (isLoading) return;
    const timeout = setTimeout(async () => {
      if (appStore.onboardingCompleted) {
        if (user) {
          try {
            router.replace("/(private)/(tabs)");
          } catch (error) {
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
  }, [appStore.onboardingCompleted, user, isLoading]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BrandLogo size={100} color={colors.textPrimary} />
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
