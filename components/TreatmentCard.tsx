import React from "react";
import { ImageBackground, View, Text } from "react-native";

// import { Container } from './styles';
export const TreatmentCard = () => {
  return (
    <ImageBackground
      style={{
        width: "100%",
        height: 125,
        backgroundColor: "red",
        borderRadius: 20,
        justifyContent: "space-between",
        padding: 15,
      }}
      source={{ uri: "https://imgur.com/KJVH6n5" }}
    >
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Toxina Botulinica
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginTop: 3,
          }}
        >
          Sucursal Escazu
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
        >
          19 Marzo 2025, 10:00 AM
        </Text>
      </View>
    </ImageBackground>
  );
};
