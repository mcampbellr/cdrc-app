import CustomTabBar from "@/components/TabBar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabLayout() {
  const { colors } = useThemeColors();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.buttonBackground,
        animation: "fade",
        tabBarInactiveBackgroundColor: colors.surfacePrimary,
        tabBarActiveBackgroundColor: colors.surfacePrimary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons size={size} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons size={size} name="mail" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons size={size} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
