import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, size = 64 }) => {
  const { colors } = useThemeColors();

  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);
  const fontSize = size * 0.35;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.cardBackground,
        },
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <Text
            style={{ color: colors.textNegative, fontWeight: "bold", fontSize }}
          >
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  initialsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Avatar;
