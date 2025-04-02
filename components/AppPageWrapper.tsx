import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function AppPageWragger({ children }: PropsWithChildren) {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      {children}
    </View>
  );
}
