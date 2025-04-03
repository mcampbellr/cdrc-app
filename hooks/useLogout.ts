import { useLogout } from "@/api/services/auth.service";
import { Alert } from "react-native";

export const useLogoutConfirmation = () => {
  const { mutate: logout, isPending } = useLogout();

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
