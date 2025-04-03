import AppPageWragger from "@/components/AppPageWrapper";
import SettingButton from "@/components/SettingButton";
import SettingOptionSwich from "@/components/SettingOptionSwitch";
import { useAppTheme } from "@/context/AppColorScheme";
import { useLogoutConfirmation } from "@/hooks/useLogout";
import { Octicons } from "@expo/vector-icons";
import React from "react";

export default function Page() {
  const logout = useLogoutConfirmation();

  const { theme, toggleTheme } = useAppTheme();

  return (
    <AppPageWragger>
      <SettingOptionSwich
        label="Modo oscuro"
        value={theme === "dark"}
        icon={(colors) => (
          <Octicons name="moon" size={24} color={colors.textPrimary} />
        )}
        trigger={toggleTheme}
      />
      <SettingButton
        onPress={logout}
        label="Cerrar sesión"
        showArrow={false}
        icon={(colors) => (
          <Octicons name="sign-out" size={24} color={colors.textPrimary} />
        )}
      />
    </AppPageWragger>
  );
}
