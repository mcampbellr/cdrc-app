import React, { useMemo } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import BrandLogo from "./BrandLogo";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { useAppHeader } from "@/context/AppHeaderContext";
import { ThemedText } from "./ThemedText";
import * as Haptics from "expo-haptics";

interface CenteredHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
}

const AppHeader: React.FC<CenteredHeaderProps> = ({
  showBackButton = false,
  showLogo = true,
  title,
}) => {
  const { colors } = useThemeColors();
  const router = useRouter();
  const navigation = useNavigation();
  const { right, showLogo: dinamicShowLogo } = useAppHeader();
  const insets = useSafeAreaInsets();

  const shouldShowLogo = useMemo(
    () => showLogo && dinamicShowLogo,
    [showLogo, dinamicShowLogo],
  );

  const canGoBack = (navigation.canGoBack() && showBackButton) || false;

  const goBackHandler = () => {
    if (Platform.OS === "android") {
      Haptics.selectionAsync();
    }
    router.back();
  };

  return (
    <View
      style={[
        styles.wrapper,
        { paddingTop: insets.top, backgroundColor: colors.surfacePrimary },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.side}>
          {canGoBack && (
            <TouchableOpacity
              onPress={goBackHandler}
              style={[
                styles.backButton,
                { backgroundColor: colors.buttonBackground },
              ]}
            >
              <Octicons
                name="chevron-left"
                size={20}
                color={colors.buttonText}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          <Animated.View
            style={[styles.absoluteCenter, { height: 40, width: 40 }]}
          >
            {shouldShowLogo && (
              <TouchableOpacity
                onPress={() => {
                  router.dismissTo("/(private)");
                }}
              >
                <BrandLogo fill={colors.surfaceInverted} />
              </TouchableOpacity>
            )}
          </Animated.View>
          <Animated.View style={[styles.absoluteCenter]}>
            {title && (
              <ThemedText type="title" style={{ fontSize: 18 }}>
                {title}
              </ThemedText>
            )}
          </Animated.View>
        </View>

        <View style={styles.side}>{right && right}</View>
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
    position: "relative",
  },
  absoluteCenter: {
    position: "absolute",
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
