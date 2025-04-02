import React, { ReactNode } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

interface ViewWithImageProps {
  borderRadius?: number;
  children: ReactNode;
}

const ViewWithImage = ({ children, borderRadius = 10 }: ViewWithImageProps) => {
  return (
    <ImageBackground
      source={require("../assets/images/onboarding-img-2.png")}
      style={styles.image}
      imageStyle={{ borderRadius }}
      resizeMode="cover"
    >
      <View
        style={[
          styles.overlay,
          {
            borderRadius,
          },
        ]}
      />

      <View style={styles.elementContainer}>{children}</View>
    </ImageBackground>
  );
};

export default ViewWithImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  elementContainer: {
    zIndex: 1,
  },
});
