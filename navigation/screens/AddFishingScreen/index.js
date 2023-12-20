import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateInput from "../../../assets/components/DateInput";
import TimeInput from "../../../assets/components/TimeInput";
import AppTextInput from "../../../assets/components/TextInput";
import ImageUpLoader from "../../../assets/components/ImageUpLoader";
import AddFishCard from "../../../assets/components/AddFishCard";
import Icon from "../../../assets/components/Icon";
import uuid from "react-uuid";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AddFishForm from "../../../assets/components/AddFishForm";
import { useNavigation } from "@react-navigation/native";
import { createNewFishing } from "../../../assets/db/queries";
import { db } from "../../../assets/db/connect";
import { fishDict } from "../../../assets/data/fish_dict";

const dataM = fishDict.map((fish, index) => {
  return { key: `${index}`, value: `${fish.fish}` };
});;

export default function AddFishingScreen() {
  const [coughtFish, setCoutghtFish] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [images, setImages] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "60%"], []);
  const navigation = useNavigation();

  const handleSave = () => {
    if (title === "") {
      return Alert.alert("Пожалуйста, введите название рыбалки!");
    }
    if (date.getTime() > new Date().getTime()) {
      return Alert.alert("Пожалуйста, введите корректную дату!");
    }
    if (time.getTime() > new Date().getTime()) {
      return Alert.alert("Пожалуйста, введите корректное время!");
    }

    const coughtss = coughtFish.map(({ name, length, weight }) => {
      return {
        fish_id: dataM.find((fish) => fish.value === name).key,
        length,
        weight,
      };
    });

    const fishingData = {
      title,
      date: date.getTime().toString(),
      time: `${time
        .getHours()
        .toString()
        .padStart(2, "0")}:${time
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
      image_url: images.map((image) => image.uri).join(","),
      catches: coughtss,
    };

    const insertData = ({ title, image_url, date, time, catches }) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO fishing (title, image_url, date, time) VALUES (?, ?, ?, ?);",
          [title, image_url, date, time],
          (_, { insertId }) => {
            const fishing_id = insertId;

            catches.forEach((catchItem) => {
              tx.executeSql(
                "INSERT INTO caught_fish (fishing_id, fish_id, length, weight) VALUES (?, ?, ?, ?);",
                [
                  fishing_id,
                  catchItem.fish_id,
                  catchItem.length,
                  catchItem.weight,
                ],
                (_, result) => {},
                (_, error) => {
                  console.error(error);
                }
              );
            });

            // Фиксируем транзакцию
            tx.executeSql(
              "COMMIT;",
              null,
              (_, result) => {
              },
              (_, error) => {
                console.error(error);
              }
            );
          },
          (_, error) => {
            console.error(error);
          }
        );
      });
      navigation.navigate("Fishing");
    };

    insertData(fishingData);
  };


  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <>
          <View
            style={{
              height: 100,
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              paddingTop: 45,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon iconName="back" color={"#5555ff"} size={22} custom />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontSize: 21,
                  fontWeight: 600,
                }}
              >
                Добавить новую рыбалку
              </Text>
            </View>
            <TouchableOpacity onPress={handleSave}>
              <Icon iconName="check" color={"#5555ff"} size={22} custom />
            </TouchableOpacity>
          </View>
        </>
      ),
    });
  }, [navigation, title, date, time, coughtFish, images]);

  const handleAddFish = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const addCoughtFish = ({ lengthFish, weightFish, selected }) => {
    bottomSheetModalRef.current?.dismiss();
    setCoutghtFish((prev) => [
      ...prev,
      {
        id: uuid(),
        name: selected,
        weight: parseFloat(weightFish),
        length: parseInt(lengthFish),
      },
    ]);
  };

  const deleteCoughtFish = (id) => {
    setCoutghtFish(coughtFish.filter((fish) => fish.id !== id));
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 30,
            paddingBottom: 25,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 25,
            }}
          >
            Новая рыбалка
          </Text>

          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <AppTextInput label="Название рыбалки:" onChange={setTitle} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 5,
                justifyContent: "space-around",
              }}
            >
              <DateInput label="Дата рыбалки:" onChange={setDate} />
              <TimeInput label="Время рыбалки:" onChange={setTime} />
            </View>
            <ImageUpLoader label="Добавить фото:" onChange={setImages} />
          </View>

          <View
            style={{
              width: "100%",
              flex: 1,
              marginTop: 10,
              paddingBottom: 50,
              gap: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                }}
              >
                Пойманные рыбы:
              </Text>

              <TouchableOpacity activeOpacity={0.75} onPress={handleAddFish}>
                <Icon iconName="plus" color="#5555ff" size={24} custom />
              </TouchableOpacity>
            </View>

            {coughtFish.map((fish) => (
              <AddFishCard
                title={fish.name}
                weight={fish.weight}
                length={fish.length}
                key={fish.id}
                id={fish.id}
                onDelete={deleteCoughtFish}
              />
            ))}
          </View>
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
        >
          <AddFishForm addCoughtFish={addCoughtFish} />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
