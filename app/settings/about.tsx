import AppHeader from "@/components/AppHeader";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function About() {
  return (
    <View>
      <AppHeader showBackButton />
      <ThemedText>This is a test tab</ThemedText>
    </View>
  );
}
