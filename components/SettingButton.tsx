import { ColorsThemePalette } from "@/data/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { ThemedText } from "./ThemedText";
import { Octicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { useDefaultStyles } from "@/hooks/useDefaultStyles";

interface SettingButtonProps {
  icon: (colors: ColorsThemePalette, size: number) => ReactNode;
  label: string;
  href?: Href;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: ReactNode;
}

export default function SettingButton({
  icon,
  label,
  href,
  onPress,
  rightElement,
  showArrow = true,
}: SettingButtonProps) {
  const { colors } = useThemeColors();
  const styles = themeStyles(colors);
  const defaultStyles = useDefaultStyles();

  return (
    <TouchableOpacity
      style={defaultStyles.SettingButton}
      onPress={
        onPress
          ? onPress
          : () => {
              if (href) {
                router.push(href);
              }
            }
      }
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
        {showArrow && !rightElement && (
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
        {rightElement && rightElement}
      </View>
    </TouchableOpacity>
  );
}

const themeStyles = (colors: ColorsThemePalette) =>
  StyleSheet.create({
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
