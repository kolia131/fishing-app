import { Pressable, Text, TouchableOpacity } from "react-native";

export default function Button(props) {
  const { onPress, title } = props;

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2196F3",
        height: 60,
        width: "100%",
        borderRadius: 30,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 17,
          fontWeight: 500,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
