import { Alert } from "react-native";
import { useLogoutService } from "./services/useLogoutService";

export const useLogoutConfirmation = () => {
  const { mutate: logout, isPending } = useLogoutService();

  return () => {
    if (isPending) return;

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
          onPress: () => logout(),
        },
      ],
      { cancelable: false },
    );
  };
};
