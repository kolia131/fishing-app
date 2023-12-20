import * as React from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import FishCard from "../../../assets/components/FishCard";
import LeaderCard from "../../../assets/components/LeaderCard";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../../assets/db/connect";
import { fishDict } from "../../../assets/data/fish_dict";

export default function LeaderScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [leaders, setLeaders] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT id, fish_id, fishing_id, MAX(weight) AS maxWeight
              FROM caught_fish
              GROUP BY fish_id
              ORDER BY maxWeight DESC;`,
            [],
            (_, { rows: { _array } }) => {
              setLeaders(_array);
            }
          );
        });
      };

      fetchData();
    }, [])
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          height: 295,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                {leaders.length > 1 ? fishDict[leaders[1].fish_id].fish : ""}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {leaders.length > 1 ? leaders[1].maxWeight + " г" : ""}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#7575ff",
                height: 115,
                width: Math.round(width / 4),
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: 600,
                }}
              >
                2
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                {leaders.length > 0 ? fishDict[leaders[0].fish_id].fish : ""}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {leaders.length > 0 ? leaders[0].maxWeight + " г" : ""}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#7575ff",
                height: 165,
                width: Math.round(width / 4),
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: 600,
                }}
              >
                1
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                {leaders.length > 2 ? fishDict[leaders[2].fish_id].fish : ""}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {leaders.length > 2 ? leaders[2].maxWeight + " г" : ""}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#7575ff",
                height: 75,
                width: Math.round(width / 4),
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: 600,
                }}
              >
                3
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          justifyContent: "flex-start",
          paddingTop: 20,
          paddingBottom: 50,
          paddingLeft: 10,
          paddingRight: 10,
          gap: 10,
        }}
      >
        {leaders.length > 3 &&
          leaders
            .slice(3)
            .map((leader) => (
              <LeaderCard
                name={fishDict[leader.fish_id].fish}
                maxWeight={leader.maxWeight}
              />
            ))}
      </View>
    </ScrollView>
  );
}
