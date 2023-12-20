import { useRef, useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";

export default function AppTextInput({ label, border, placeholder, onChange, type }) {

  const [text, onChangeText] = useState("");

  function changeTextHandle(text) {
    onChangeText(text);
    onChange(text);
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <TextInput
        onChangeText={text => changeTextHandle(text)}
        value={text}
        keyboardType={type || 'default'}
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "#fff",
          borderRadius: 12,
          paddingLeft: 15,
          paddingTop: 15,
          fontSize: 16,
          borderWidth: border ? 0.5 : 0,
        }}
        placeholder={placeholder || "Моя новая рыбалка"}
      />
      <Text
        style={{
          position: "absolute",
          top: 10,
          left: 15,

          color: "#888888",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </SafeAreaView>
  );
}
