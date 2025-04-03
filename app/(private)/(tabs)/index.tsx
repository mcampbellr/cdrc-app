import { useUserProfile } from "@/api/services/users.service";
import Avatar from "@/components/AppAvatar";
import AppPageWragger from "@/components/AppPageWrapper";
import { ThemedText } from "@/components/ThemedText";
import { useHeaderRight } from "@/hooks/useHeader";
import { useUserStore } from "@/state/users.store";
import { router } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Page() {
  const userStore = useUserStore();
  const { data, isLoading, error } = useUserProfile();

  useHeaderRight(
    useMemo(
      () => (
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={{
            borderRadius: 999,
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar name={userStore.user?.name || "Unknown"} size={35} />
        </TouchableOpacity>
      ),
      [],
    ),
  );

  if (isLoading) {
    return (
      <AppPageWragger>
        <ActivityIndicator></ActivityIndicator>
      </AppPageWragger>
    );
  }

  return (
    <ScrollView>
      <AppPageWragger>
        <ThemedText>Welcome to the private page, {data.name}!</ThemedText>
        {/* <ViewWithImage> */}
        {/*   <View */}
        {/*     style={{ */}
        {/*       padding: 20, */}
        {/*     }} */}
        {/*   > */}
        {/*     <ThemedText> */}
        {/*       This is a private page, only accessible if the user is logged in. */}
        {/*     </ThemedText> */}
        {/*     <ThemedButton onPress={toggleTheme}> */}
        {/*       <ThemedButtonText>Change Theme</ThemedButtonText> */}
        {/*     </ThemedButton> */}
        {/*   </View> */}
        {/* </ViewWithImage> */}
      </AppPageWragger>
    </ScrollView>
  );
}
