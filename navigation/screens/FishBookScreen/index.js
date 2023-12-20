import * as React from "react";
import { ScrollView, View } from "react-native";
import FishCard from "../../../assets/components/FishCard";
import { fishDict } from "../../../assets/data/fish_dict";
import uuid from "react-uuid/uuid";
import { useNavigation } from "@react-navigation/native";

export default function FishBookScreen({  }) {

  const navigation = useNavigation();

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
        {fishDict.map((fish, index) => (
          <FishCard
            key={uuid()}
            onPress={() => {
              navigation.navigate("about-fish-screen", {fishId: index});
            }}
            name={fish.fish}
            subname={""}
            maxLength={fish.max_length}
            maxWeight={fish.max_weight}
            img={fish.img}
          />
        ))}
      </View>
    </ScrollView>
  );
}