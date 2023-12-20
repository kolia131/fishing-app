import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../../assets/db/connect";
import EnhancedImageViewing from "react-native-image-viewing";
import AddFishCard from "../../../assets/components/AddFishCard";
import uuid from "react-uuid/uuid";
import { fishDict } from "../../../assets/data/fish_dict";

export default function AboutFishScreen({ }) {
  const route = useRoute();
  const { fishId } = route.params;


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
        <Image
          source={fishDict[fishId].img}
          resizeMode={"contain"}
          style={{
            width: Dimensions.get("screen").width - 20,
            height: Dimensions.get("screen").width - -20,
            borderRadius: 15,
          }}
        />

        <Text
          style={{
            fontSize: 28,
            margin: 10,
            fontWeight: 500,
          }}
        >
          {fishDict[fishId].fish}
        </Text>

        <Text
          style={{
            fontSize: 21,
            fontWeight: 500,
            marginTop: 25,
          }}
        >
          Максимальный вес:
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 500,
            marginLeft: 25,
          }}
        >
          {fishDict[fishId].max_weight}
        </Text>

        <Text
          style={{
            fontSize: 21,
            fontWeight: 500,
            marginTop: 25,
          }}
        >
          Максимальная длина:
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 500,
            marginLeft: 25,
          }}
        >
          {fishDict[fishId].max_length}
        </Text>

        <Text
          style={{
            fontSize: 21,
            fontWeight: 500,
            marginTop: 25,
          }}
        >
          Места обитания:
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 500,
            marginLeft: 25,
          }}
        >
          {fishDict[fishId].habitats}
        </Text>

        <Text
          style={{
            fontSize: 21,
            fontWeight: 500,
            marginTop: 25,
          }}
        >
          Период жизни:
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 500,
            marginLeft: 25,
          }}
        >
          {fishDict[fishId].life_period}
        </Text>

        <Text
          style={{
            fontSize: 21,
            fontWeight: 500,
            marginTop: 25,
          }}
        >
          Приманки:
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 500,
            marginLeft: 25,
          }}
        >
          {fishDict[fishId].bait}
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: 500,
            marginTop: 30,
          }}
        >
          Описание:
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginLeft: 25,
          }}
        >
          {fishDict[fishId].description}
        </Text>
      </View>
    </ScrollView>
  );
}
