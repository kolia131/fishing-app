import React from "react";
import { View, Text } from "react-native";

export default function LeaderCard({ name, maxWeight }) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 15,
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
              {name}
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
            {'>'}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: 300,
          }}
        >
          Трофей:
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          {`${maxWeight} г`}
        </Text>
      </View>
    </View>
  );
}
