import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function AuthCodeInput() {
  const { colors } = useThemeColors();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const characters = text.slice(0, 6).split("");
      const newCode = [...code];

      characters.forEach((char, i) => {
        newCode[i] = char;
        inputs.current[i]?.setNativeProps({ text: char }); // update native input
      });

      setCode(newCode);

      if (characters.length < 6) {
        inputs.current[characters.length]?.focus();
      } else {
        inputs.current[5]?.focus();
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newCode = [...code];

      if (code[index] === "") {
        if (index > 0) {
          inputs.current[index - 1]?.focus();
          newCode[index - 1] = "";
        }
      } else {
        newCode[index] = "";
      }

      setCode(newCode);
    }
  };

  return (
    <View style={styles.codeContainer}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={6}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="•"
          placeholderTextColor={colors.textPrimary}
          style={[
            styles.input,
            {
              backgroundColor: colors.cardBackground,
              color: colors.textPrimary,
              borderColor: colors.border,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 20,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
});
