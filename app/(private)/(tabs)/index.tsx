import Avatar from "@/components/AppAvatar";
import AppPageWrapper from "@/components/AppPageWrapper";
import { useUserProfileService } from "@/hooks/services/useUserProfileService";
import { useHeaderRight } from "@/hooks/useHeader";
import { router } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

export default function Page() {
  const { data: user, refetch, isLoading } = useUserProfileService();

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
          {user && (
            <Avatar imageUrl={user?.avatar} name={user?.name} size={35} />
          )}
        </TouchableOpacity>
      ),
      [user],
    ),
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={async () => {
            await refetch();
          }}
        ></RefreshControl>
      }
    >
      <AppPageWrapper></AppPageWrapper>
    </ScrollView>
  );
}
