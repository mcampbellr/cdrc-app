import Avatar from "@/components/AppAvatar";
import AppPageWragger from "@/components/AppPageWrapper";
import { useUserStore } from "@/state/users.store";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import SettingButton from "@/components/SettingButton";
import { Octicons } from "@expo/vector-icons";

export default function Settings() {
  const userStore = useUserStore();
  return (
    <ScrollView>
      <AppPageWragger>
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
              <Octicons name="person-add" color={colors.text} size={size} />
            )}
            label="Mis Referidos"
            href="/(private)/settings/about"
          />

          <SettingButton
            icon={(colors, size) => (
              <Octicons name="gear" color={colors.text} size={size} />
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
              <Octicons name="info" color={colors.text} size={size} />
            )}
            label="Configuraciones"
            href="/(private)/settings/about"
            showArrow={false}
          />
        </View>
      </AppPageWragger>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
