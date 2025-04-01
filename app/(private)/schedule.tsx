import AppPageWragger from "@/components/AppPageWrapper";
import { ThemedText } from "@/components/ThemedText";
import { useHeaderRight } from "@/hooks/useHeader";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";

export default function Page() {
  useHeaderRight(
    useMemo(
      () => (
        <TouchableOpacity onPress={() => console.log("Right pressed")}>
          <ThemedText>Edit</ThemedText>
        </TouchableOpacity>
      ),
      [],
    ),
  );

  return (
    <AppPageWragger>
      <ThemedText>Schedule</ThemedText>
    </AppPageWragger>
  );
}
