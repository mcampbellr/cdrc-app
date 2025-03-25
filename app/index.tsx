import { ThemedText } from "@/components/ThemedText";
import { ColorsTheme } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { colors } = useThemeColors();
  const styles = useMemo(() => themeStyles(colors), [colors]);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/onboarding");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ActivityIndicator></ActivityIndicator>
        <ThemedText style={{ paddingTop: 10 }}>Cargando...</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const themeStyles = (theme: ColorsTheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  });
};
