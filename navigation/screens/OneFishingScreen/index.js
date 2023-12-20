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

export default function OneFishingScreen({ navigation }) {
  const route = useRoute();
  const { fishingId } = route.params;

  const [fishingData, setFishingData] = React.useState(null);
  const [showModal, setShowModal] = React.useState(null);
  const [indexImage, setIndexImage] = React.useState(null);
  const [caughtFish, setCaughtFish] = React.useState([]);

  const openModalImage = (index) => {
    setShowModal(true);
    setIndexImage(index);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT * FROM fishing
              WHERE id = ?;`,
            [fishingId],
            (_, { rows: { _array } }) => {
              setFishingData(_array[0]);
            }
          );
        });
        db.transaction((tx) => {
          tx.executeSql(
            `
            SELECT * FROM caught_fish
              WHERE fishing_id = ?;`,
            [fishingId],
            (_, { rows: { _array } }) => {
              setCaughtFish(_array);
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
      {showModal && (
        <EnhancedImageViewing
          images={fishingData?.image_url
            .split(",")
            .map((img) => ({ uri: img }))}
          imageIndex={indexImage}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        />
      )}
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
        {fishingData?.image_url.split(",")[0] !== '' ? (
          <ScrollView horizontal>
            {fishingData?.image_url.split(",").map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  openModalImage(index);
                }}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: img }}
                  resizeMode={"cover"}
                  style={{
                    width: Dimensions.get("screen").width - 20,
                    height: Dimensions.get("screen").width - -20,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Image
            source={require("../../../assets/img/no_img.jpg")}
            resizeMode={"cover"}
            style={{
              width: Dimensions.get("screen").width - 20,
              height: Dimensions.get("screen").width - 20,
              borderRadius: 15,
            }}
          />
        )}

        <Text
          style={{
            fontSize: 28,
            margin: 10,
            fontWeight: 500,
          }}
        >
          {fishingData?.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            marginTop: -15,
            fontWeight: 400,
          }}
        >{`${new Date(parseInt(fishingData?.date))
          .getDate()
          .toString()
          .padStart(2, "0")}.${(
          new Date(parseInt(fishingData?.date)).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}.${new Date(
          parseInt(fishingData?.date)
        ).getFullYear()} ${fishingData?.time}`}</Text>
        <Text
          style={{
            fontSize: 21,
            fontWeight: 500,
            marginTop: 25,
          }}
        >
          Улов:
        </Text>
        <View
          style={{
            width: "100%",
            gap: 5,
          }}
        >
          {caughtFish.map((fish) => (
            <AddFishCard
              title={fishDict[parseInt(fish.fish_id)].fish}
              weight={fish.weight}
              length={fish.length}
              key={uuid()}
              hideButtons
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
