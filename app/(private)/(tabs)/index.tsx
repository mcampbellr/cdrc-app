import Avatar from "@/components/AppAvatar";
import AppPageWrapper from "@/components/AppPageWrapper";
import { useHeaderRight } from "@/hooks/useHeader";
import { useUserStore } from "@/state/users.store";
import { router } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Page() {
  const userStore = useUserStore();

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

  return (
    <ScrollView>
      <AppPageWrapper>
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
      </AppPageWrapper>
    </ScrollView>
  );
}
