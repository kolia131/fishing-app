import * as React from "react";
import { View, ScrollView } from "react-native";
import FishingCard from "../../../assets/components/FishingCard";
import { getAllFishings } from "../../../assets/db/queries";
import { db } from "../../../assets/db/connect";
import { useFocusEffect } from "@react-navigation/native";

export default function FishingScreen() {
  const [fishings, setFishings] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT
                f.id AS fishing_id,
                f.title,
                f.date,
                f.image_url AS imageUrl,
                COUNT(cf.id) AS totalCount,
                SUM(cf.weight) AS totalWeight
            FROM
                fishing f
            LEFT JOIN
                caught_fish cf ON f.id = cf.fishing_id
            GROUP BY
                f.id, f.title, f.date, f.time;`,
            [],
            (_, { rows: { _array } }) => {
              setFishings(_array);
            }
          );
        });
      };

      fetchData();
    }, [])
  );

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
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
        {fishings.map(
          ({ title, date, fishing_id, totalCount, totalWeight, imageUrl }) => (
            <FishingCard
              key={fishing_id}
              title={title}
              date={`${new Date(parseInt(date))
                .getDate()
                .toString()
                .padStart(2, "0")}.${(new Date(parseInt(date)).getMonth() + 1)
                .toString()
                .padStart(2, "0")}.${new Date(parseInt(date)).getFullYear()}`}
              totalCount={totalCount}
              totalWeight={totalWeight}
              imageUrl={imageUrl.split(',')[0]}
              fishingId={fishing_id}
            />
          )
        )}
      </View>
    </ScrollView>
  );
}
