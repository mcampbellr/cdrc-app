import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { DimensionValue } from "react-native"; 

type GradientImageProps = {
  image: ImageSourcePropType;
  color: string; // Ejemplo: '#000000' o 'rgba(0,0,0,0.8)'
  height?: number;
  width?: DimensionValue;
};

const AppImageGradient: React.FC<GradientImageProps> = ({
  image,
  color,
  height = 300,
  width = "100%",
}) => {
  return (
    <View style={[styles.container, { height, width }]}>
      <Image
        source={image}
        style={[styles.image, { height, width }]}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[color, "transparent"]}
        style={[styles.gradient, { height: height * 0.3 }]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AppImageGradient;
