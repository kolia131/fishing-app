import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Platform,
  View,
} from "react-native";
import Icon from "../Icon";

export default function DateInput({ label, onChange }) {
  const [date, setDate] = useState(new Date());
  const [shownPicker, setShownPicker] = useState(false);

  function onChangePicker({ type }, selectedDate) {
    const currentDate = selectedDate || date;
    setShownPicker(Platform.OS === "ios");
    onChange(currentDate);
    setDate(currentDate);
  }

  return (
    <>
      <SafeAreaView
        style={{
            flex: 1,
          position: "relative",
        }}
      >
        <Pressable
          onPress={() => {
            setShownPicker(true);
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 60,
              backgroundColor: "#fff",
              borderRadius: 12,
              paddingLeft: 15,
              paddingTop: 15,
              fontSize: 16,
              color: "#000",
            }}
            value={date.toLocaleDateString()}
            editable={false}
            keyboardType="default"
            placeholder={date.toLocaleDateString()}
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
          <View
            style={{
              position: "absolute",
              top: 20,
              right: 20,
            }}
          >
            <Icon iconName="calendar" size={20} color={"#888888"} custom />
          </View>
        </Pressable>
      </SafeAreaView>
      {shownPicker && (
        <RNDateTimePicker mode="date" value={date} onChange={onChangePicker} />
      )}
    </>
  );
}
