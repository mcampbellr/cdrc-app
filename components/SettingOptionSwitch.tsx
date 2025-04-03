import React from "react";
import { Switch } from "react-native-gesture-handler";
import { ColorsThemePalette } from "@/data/Colors";
import SettingButton from "./SettingButton";

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
  return (
    <SettingButton
      label={label}
      icon={icon}
      rightElement={<Switch value={value} onValueChange={trigger} />}
    />
  );
}
