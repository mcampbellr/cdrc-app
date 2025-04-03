import { ColorsThemePalette } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { ThemedText } from "./ThemedText";
import { Octicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";

interface SettingButtonProps {
  icon: (colors: ColorsThemePalette, size: number) => ReactNode;
  label: string;
  href: Href;
  showArrow?: boolean;
}

export default function SettingButton({
  icon,
  label,
  href,
  showArrow = true,
}: SettingButtonProps) {
  const { colors } = useThemeColors();
  const styles = themeStyles(colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(href)}
    >
      <View style={styles.row}>
        <View style={styles.iconAndLabel}>
          <View
            style={{
              marginRight: 5,
            }}
          >
            {icon(colors, 24)}
          </View>
          <ThemedText style={styles.label}>{label}</ThemedText>
        </View>
        {/* Aquí podrías añadir una flecha si `showArrow` es true */}
        {showArrow && (
          <View style={styles.arrow}>
            <Octicons
              name="chevron-right"
              color={colors.buttonLabelPrimary}
              style={{
                transform: "translateX(1px)",
              }}
              size={24}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const themeStyles = (colors: ColorsThemePalette) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 12,
      marginBottom: 10,
      justifyContent: "center",
      minHeight: 55,
      maxHeight: 55,
    },
    arrow: {
      backgroundColor: colors.buttonBackgroundPrimary,
      borderRadius: 5,
      height: 30,
      width: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconAndLabel: {
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      fontWeight: "bold",
      marginLeft: 12,
      color: colors.textPrimary,
    },
  });
