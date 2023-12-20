import { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import AppTextInput from "../TextInput";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../Button";
import { fishDict } from "../../data/fish_dict";


export default function AddFishForm({ addCoughtFish }) {
  const [weightFish, setWeightFish] = useState("");
  const [lengthFish, setLengthFish] = useState("");
  const [selected, setSelected] = useState("");
  const [inputError, setInputError] = useState(false);

  const data = fishDict.map((fish, index) => {
    return { key: `${index}`, value: `${fish.fish}` };
  });

  function addFishHandle() {
    if (!selected || !lengthFish || !weightFish) {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2500);
    } else {
      addCoughtFish({
        lengthFish,
        weightFish,
        selected,
      });
    }
  }

  return (
    <View
      style={{
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between",
        padding: 25,
        gap: 15,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 150,
            gap: 10,
          }}
        >
          <AppTextInput
            type="number-pad"
            label="Вес рыбы (г)"
            border
            placeholder="800 г"
            onChange={(text) => setWeightFish(text)}
          />
          <AppTextInput
            type="number-pad"
            label="Длина рыбы (см)"
            border
            placeholder="17 см"
            onChange={(text) => setLengthFish(text)}
          />
        </View>
        <SelectList
          search
          placeholder="Выберите рыбу"
          searchPlaceholder="Поиск рыбы..."
          setSelected={(val) => setSelected(val)}
          data={data}
          maxHeight={150}
          boxStyles={{
            width: Dimensions.get("screen").width - 80,
            height: 55,
            borderRadius: 15,
            alignItems: "center",
          }}
          save="value"
        />
      </View>
      {inputError && (
        <Text
          style={{
            color: "#f03333",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Вы ввели не все данные!
        </Text>
      )}
      <Button onPress={addFishHandle} title="Добавить" />
    </View>
  );
}
