import AppPageWragger from "@/components/AppPageWrapper";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function Settings() {
  return (
    <AppPageWragger>
      <Link href="/settings/about">
        <ThemedText>Go to about</ThemedText>
      </Link>
    </AppPageWragger>
  );
}
