import { View, Text, Switch } from "react-native";
import { Appearance, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  let colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Hello, {colorScheme === "dark" ? "dark" : "light"} world!
        </Text>
      </View>
      <Switch
        value={colorScheme === "dark"}
        onChange={() => {
          Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
        }}
      />
    </SafeAreaView>
  );
}
