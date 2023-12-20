import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../Icon";

export default function AddFishCard({
  title,
  weight,
  length,
  id,
  onDelete,
  hideButtons,
}) {
  const deleteCard = () => {
    onDelete(id);
  };


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
          padding: 10,
          paddingLeft: 15,
          paddingRight: 15,
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
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          {!hideButtons && (
            <TouchableOpacity activeOpacity={0.75} onPress={deleteCard}>
              <Icon iconName="close" color="#f04060" size={22} custom />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          padding: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
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
              Вес:
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              {`${weight} г`}
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
              Длина:
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              {`${length} см`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
