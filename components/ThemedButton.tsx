import { useThemeColors } from "@/hooks/useThemeColors";
import { FC, PropsWithChildren, ReactNode } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface ThemeButtonProps extends TouchableOpacityProps {
  label?: string;
  children: ReactNode;
}

export const ThemedButtonText: FC<PropsWithChildren> = ({ children }) => {
  const { colors } = useThemeColors();
  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        color: colors.buttonText,
      }}
    >
      {children}
    </Text>
  );
};

const ThemedButton: FC<ThemeButtonProps> = ({ children, onPress, label }) => {
  const { colors } = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.buttonBackground,
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
        minHeight: 45,
      }}
    >
      {label ? (
        <Text
          style={{
            color: colors.buttonText,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      ) : (
        <View
          style={{
            display: "flex",
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
