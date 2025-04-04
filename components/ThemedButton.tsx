import { useThemeColors } from "@/hooks/useThemeColors";
import { FC, ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  TextProps,
} from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface ThemeButtonProps extends TouchableOpacityProps {
  label?: string;
  children?: ReactNode;
  loading?: boolean;
  loadingText?: string;
  type?: "link" | "default";
}

interface ThemedButtonTextProps extends TextProps {
  children: ReactNode;
}

export const ThemedButtonText: FC<ThemedButtonTextProps> = ({
  children,
  style,
}) => {
  const { colors } = useThemeColors();
  return (
    <Text
      style={[
        {
          fontSize: 16,
          fontWeight: "bold",
          color: colors.buttonLabelPrimary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const ThemedButton: FC<ThemeButtonProps> = ({
  children,
  onPress,
  label,
  loading = false,
  loadingText = "Loading...",
  type,
  style,
  ...rest
}) => {
  const { colors } = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      {...rest}
      style={[
        {
          backgroundColor:
            type === "link" ? "transparent" : colors.buttonBackgroundPrimary,
          flex: 1,
          paddingHorizontal: 30,
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          minHeight: 45,
          opacity: loading ? 0.8 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ActivityIndicator size="small" color={colors.buttonLabelPrimary} />
          <Text
            style={{
              color: colors.buttonLabelPrimary,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {loadingText}
          </Text>
        </View>
      ) : label ? (
        <Text
          style={{
            color: colors.buttonLabelPrimary,
            fontSize: 16,
            lineHeight: 19,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 24,
          }}
        >
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ThemedButton;
