import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import BrandLogo from "./BrandLogo";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { Octicons } from "@expo/vector-icons";

interface CenteredHeaderProps {
  showLogo?: boolean;
  showBackButton?: boolean;
}

const AppHeader: React.FC<CenteredHeaderProps> = ({
  showLogo = true,
  showBackButton = false,
}) => {
  const { colors } = useThemeColors();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const canGoBack = (navigation.canGoBack() && showBackButton) || false;

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
              onPress={() => navigation.goBack()}
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
          {showLogo && <BrandLogo height={40} fill={colors.surfaceInverted} />}
        </View>

        <View style={styles.side} />
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
