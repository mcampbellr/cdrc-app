import { useThemeColors } from "@/hooks/useThemeColors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { colors } = useThemeColors();
  const iconSize = 18;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.buttonBackground,
        animation: "fade",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={iconSize} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={iconSize} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
