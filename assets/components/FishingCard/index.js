import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function FishingCard({ title, date, imageUrl, totalWeight, totalCount, fishingId }) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
      onPress={() => {
        navigation.navigate("one-fishing-screen", { fishingId });
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          borderBottomColor: "#f0f0f0",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexBasis: "auto",
            flexGrow: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              {date}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 200,
            }}
          >
            {">"}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View>
          <Image
            style={{
              width: 175,
              height: 175,
              resizeMode: "contain",

              borderRadius: 15,
            }}
            source={imageUrl ? { uri: imageUrl } : require('../../img/no_img.jpg')}
          />
        </View>
        <View
          style={{
            flexGrow: 1,
            padding: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <View>
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                }}
              >
                Выловлено:
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                {`${totalCount} рыб`}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                }}
              >
                Общий вес:
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                {`${totalWeight || '0'} г`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
