import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  DimensionValue,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Href, useNavigation, useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import BrandLogo from "./BrandLogo";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAppHeader } from "@/context/AppHeaderContext";
import { ThemedText } from "./ThemedText";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

interface CenteredHeaderProps {
  showBackButton?: boolean;
  showLogo?: boolean;
  options?: NativeStackNavigationOptions;
  backHref?: Href;
}

const AppHeader: React.FC<CenteredHeaderProps> = ({
  showBackButton = false,
  showLogo = true,
  options,
  backHref,
}) => {
  const { colors } = useThemeColors();
  const router = useRouter();
  const navigation = useNavigation();
  const { right, showLogo: dynamicShowLogo } = useAppHeader();
  const insets = useSafeAreaInsets();

  const shouldShowLogo = showLogo && dynamicShowLogo;

  const canGoBack =
    (showBackButton &&
      typeof navigation.canGoBack === "function" &&
      navigation.canGoBack()) ||
    backHref;

  const paddingTop = (): DimensionValue => {
    return Platform.OS === "android" || options?.presentation !== "modal"
      ? insets.top
      : 0;
  };

  const goBackHandler = () => {
    if (Platform.OS === "android") {
      Haptics.selectionAsync();
    }

    if (backHref) {
      router.replace(backHref);
      return;
    }

    router.back();
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: paddingTop(),
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.side}>
          {canGoBack && (
            <TouchableOpacity
              onPress={goBackHandler}
              style={[
                styles.backButton,
                { backgroundColor: colors.buttonBackgroundPrimary },
              ]}
            >
              <Octicons
                name="chevron-left"
                size={20}
                color={colors.buttonLabelPrimary}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          {shouldShowLogo && (
            <TouchableOpacity
              onPress={() => router.dismissTo?.("/(private)/(tabs)")}
            >
              <BrandLogo fill={colors.surfaceInverted} />
            </TouchableOpacity>
          )}

          {options?.title && (
            <ThemedText type="title" style={{ fontSize: 18 }}>
              {options.title}
            </ThemedText>
          )}
        </View>

        <View style={styles.side}>{right}</View>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 70,
  },
  side: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
