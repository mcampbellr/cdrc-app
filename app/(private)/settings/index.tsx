import Avatar from "@/components/AppAvatar";
import AppPageWrapper from "@/components/AppPageWrapper";
import { useUserStore } from "@/state/users.store";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import SettingButton from "@/components/SettingButton";
import { Octicons } from "@expo/vector-icons";

export default function Settings() {
  const userStore = useUserStore();
  return (
    <ScrollView>
      <AppPageWrapper>
        <View style={styles.avatarContainer}>
          <Avatar
            name={userStore.user?.name || "Unknown"}
            imageUrl={userStore.user?.avatar}
            size={130}
          />
        </View>
        <View style={{ gap: 8 }}>
          <SettingButton
            icon={(colors, size) => (
              <Octicons
                name="person-add"
                color={colors.textPrimary}
                size={size}
              />
            )}
            label="Mis Referidos"
            href="/(private)/settings/about"
          />

          <SettingButton
            icon={(colors, size) => (
              <Octicons name="gear" color={colors.textPrimary} size={size} />
            )}
            label="Configuraciones"
            href="/(private)/settings/configs"
          />

          {/* <SettingButton */}
          {/*   icon={(colors, size) => ( */}
          {/*     <Octicons name="person" color={colors.text} size={size} /> */}
          {/*   )} */}
          {/*   label="Mi Cuenta" */}
          {/*   href="/(private)/settings/" */}
          {/* /> */}

          <SettingButton
            icon={(colors, size) => (
              <Octicons name="info" color={colors.textPrimary} size={size} />
            )}
            label="Acerca del app"
            href="/(private)/settings/about"
            showArrow={false}
          />
        </View>
      </AppPageWrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
