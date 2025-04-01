import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView>
      <ThemedText>This is the settings tab</ThemedText>
      <Link href="/settings/about">
        <ThemedText>Go to about</ThemedText>
      </Link>
    </SafeAreaView>
  );
}
