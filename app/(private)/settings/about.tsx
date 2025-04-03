import AppPageWrapper from "@/components/AppPageWrapper";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import * as Application from "expo-application";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { Pressable, View } from "react-native";

export default function About() {
  const version = Application.nativeApplicationVersion || "unknown";
  const buildNumber = Application.nativeBuildVersion || "unknown";
  const { colors } = useThemeColors();

  return (
    <AppPageWrapper>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
        }}
      >
        <ThemedText>App desarrollada por: </ThemedText>
        <Pressable
          onPress={() =>
            openBrowserAsync("https://campbellunited.co", {
              showTitle: false,
              dismissButtonStyle: "close",
              presentationStyle: WebBrowserPresentationStyle.POPOVER,
              toolbarColor: colors.surfacePrimary,
              controlsColor: colors.buttonLabelPrimary,
            })
          }
        >
          <ThemedText type="link" style={{ fontSize: 12, fontWeight: "bold" }}>
            Obsidians labs - Campbell United Companies LLC
          </ThemedText>
        </Pressable>
      </View>
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
    </AppPageWrapper>
  );
}
