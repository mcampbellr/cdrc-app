import { useThemeColors } from "@/hooks/useThemeColors";
import { FC, PropsWithChildren, ReactNode } from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface ThemeButtonProps extends TouchableOpacityProps {
  label?: string;
  children?: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export const ThemedButtonText: FC<PropsWithChildren> = ({ children }) => {
  const { colors } = useThemeColors();
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: "bold",
        color: colors.buttonText,
      }}
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
          backgroundColor: colors.buttonBackground,
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
          <ActivityIndicator size="small" color={colors.buttonText} />
          <Text
            style={{
              color: colors.buttonText,
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
            color: colors.buttonText,
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
