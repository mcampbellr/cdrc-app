import { useThemeColors } from "@/hooks/useThemeColors";
import { FC, ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface ThemeButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

const ThemeButton: FC<ThemeButtonProps> = ({ children, onPress }) => {
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
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          color: colors.buttonText,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;
