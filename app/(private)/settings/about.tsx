import AppPageWragger from "@/components/AppPageWrapper";
import { ThemedText } from "@/components/ThemedText";
import * as Application from "expo-application";
import { View } from "react-native";

export default function About() {
  const version = Application.nativeApplicationVersion || "unknown";
  const buildNumber = Application.nativeBuildVersion || "unknown";

  return (
    <AppPageWragger>
      <ThemedText>This is a test tab</ThemedText>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{
            fontSize: 10,
          }}
        >
          Version: {version} | Build: {buildNumber}
        </ThemedText>
      </View>
    </AppPageWragger>
  );
}
