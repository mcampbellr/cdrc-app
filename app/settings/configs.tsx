import { ThemedText } from "@/components/ThemedText";
import useLogout from "@/hooks/useLogout";
import React from "react";
import { Pressable, View, StyleSheet, Alert } from "react-native";

export default function Page() {
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  const showConfirmAlert = () => {
    Alert.alert(
      "Confirmación",
      "Desea cerrar la sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, continuar",
          style: "destructive",
          onPress: () => handleLogout(),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.logoutButton}>
      <Pressable onPress={showConfirmAlert}>
        <ThemedText
          style={{
            color: "tomato",
          }}
        >
          Cerrar session
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
