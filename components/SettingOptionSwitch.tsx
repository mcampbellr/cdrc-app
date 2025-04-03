import React from "react";
import { Switch } from "react-native-gesture-handler";
import { ColorsThemePalette } from "@/data/Colors";
import SettingButton from "./SettingButton";
import { useThemeColors } from "@/hooks/useThemeColors";

interface SettingButtonSwichProps {
  value: boolean;
  label: string;
  trigger: () => void;
  icon: (colors: ColorsThemePalette, size: number) => React.ReactNode;
}

export default function SettingOptionSwich({
  value,
  trigger,
  label,
  icon,
}: SettingButtonSwichProps) {
  const { colors } = useThemeColors();

  return (
    <SettingButton
      label={label}
      icon={icon}
      rightElement={
        <Switch
          trackColor={{
            false: colors.navIconActive,
            true: colors.navbarSurface,
          }}
          thumbColor={colors.textPrimary}
          value={value}
          onValueChange={trigger}
        />
      }
    />
  );
}
