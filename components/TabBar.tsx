import { ColorsThemePalette } from "@/data/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useThemeColors();
  const styles = useMemo(() => themedStyles(colors), [colors]);

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { tabBarIcon: TabBarIcon } = options;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.tabBarItem}
          >
            {TabBarIcon && (
              <TabBarIcon
                color={isFocused ? colors.navIconActive : colors.navbarIconInactive}
                size={24}
                focused={isFocused}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;

const themedStyles = (theme: ColorsThemePalette) => {
  return StyleSheet.create({
    tabBarItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
      padding: 8,
      paddingVertical: 20,
    },
    tabbar: {
      position: "absolute",
      marginHorizontal: 20,
      justifyContent: "space-around",
      borderRadius: 15,
      bottom: 35,
      backgroundColor: theme.navbarSurface,
      flexDirection: "row",
    },
  });
};
