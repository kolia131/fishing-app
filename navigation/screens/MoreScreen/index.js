import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import { db } from "../../../assets/db/connect";

export default function MoreScreen({ navigation }) {


  const [totalFishing, setTotalFishing] = React.useState(0);
  const [totalFish, setTotalFish] = React.useState(0);
  const [totalWeight, setTotalWeight] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT COUNT(*) AS record_count
              FROM fishing;`,
            [],
            (_, { rows: { _array } }) => {
              setTotalFishing(_array[0].record_count);
            }
          );
        });
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT COUNT(*) AS record_count
              FROM caught_fish;`,
            [],
            (_, { rows: { _array } }) => {
              setTotalFish(_array[0].record_count);
            }
          );
        });
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT SUM(weight) AS total_weight
              FROM caught_fish;`,
            [],
            (_, { rows: { _array } }) => {
              setTotalWeight(_array[0].total_weight);
            }
          );
        });
      };

      fetchData();
    }, [])
  );
  
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Всего рыбалок
      </Text>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {totalFishing}
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 35,
        }}
      >
        Всего пойманых рыб
      </Text>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {totalFish}
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 35,
        }}
      >
        Вес всех пойманных рыб
      </Text>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {`${totalWeight / 1000} кг`}
      </Text>
    </View>
  );
}