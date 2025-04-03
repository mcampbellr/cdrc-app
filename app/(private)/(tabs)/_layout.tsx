import CustomTabBar from "@/components/TabBar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import AppHeader from "@/components/AppHeader";
import SkinCareIcon from "@/components/svg/SkinCareIcon";

export default function TabLayout() {
  const { colors } = useThemeColors();

  return (
    <>
      <AppHeader />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: colors.buttonBackgroundPrimary,
          animation: "fade",
          tabBarInactiveBackgroundColor: colors.surfacePrimary,
          tabBarActiveBackgroundColor: colors.surfacePrimary,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          key="home"
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons size={size} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          key="schedule"
          name="schedule"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons size={size} name="calendar" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          key="skincare"
          name="skincare"
          options={{
            tabBarIcon: ({ color, size }) => (
              <SkinCareIcon color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          key="messages"
          name="messages"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons size={size} name="mail" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
