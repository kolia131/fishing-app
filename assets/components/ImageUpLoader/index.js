import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-uuid";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import EnhancedImageViewing from "react-native-image-viewing";


const SIZE = 100;

function ImageItem({ image, onDelete, onDrag, isActive, onOpen, index }) {
  function deleteImage() {
    onDelete(image.key);
  }

  function openImage() {
    onOpen(index);
  }

  return (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={onDrag}
        disabled={isActive}
        style={{
          position: "relative",
          paddingRight: 5,
        }}
        activeOpacity={0.5}
        onPress={openImage}
      >
        <Image
          source={{ uri: image.uri }}
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            right: 5,
            width: 25,
            height: 25,
            backgroundColor: "#f04060",
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 25,
            opacity: 0.8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 3,
            paddingBottom: 3,
          }}
          activeOpacity={0.5}
          onPress={deleteImage}
        >
          <Icon iconName="cross" color="#fff" size={8} custom />
        </TouchableOpacity>
      </TouchableOpacity>
    </ScaleDecorator>
  );
}

function UploadImageItem({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: "#c0c0c0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.85}
      onPress={onPress}
      onLongPress={null}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: 200,
          color: "#f0f0f0",
          lineHeight: 85,
        }}
      >
        +
      </Text>
    </TouchableOpacity>
  );
}

export default function ImageUpLoader({ label, onChange }) {
  const [images, setImages] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  useEffect(() => {
    onChange(images);
  },[images]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => [
        ...prev,
        {
          key: uuid(),
          uri: result.assets[0].uri,
          isDraggble: true,
        },
      ]);
    }
  };

  const deleteImage = (key) => {
    setImages(images.filter((image) => image.key !== key));
  };

  const openModalImage = (index) => {
    setShowModal(true);
    setIndexImage(index);
  };

  return (
    <View
      style={{
        marginTop: 15,
        width: "100%",
      }}
    >
      {showModal && (
        <EnhancedImageViewing
          images={images}
          imageIndex={indexImage}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        />
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 500,
          marginBottom: 10,
        }}
      >
        {label}
      </Text>
      <DraggableFlatList
        ListFooterComponent={<UploadImageItem onPress={pickImage} />}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        autoscrollThreshold={10}
        autoscrollSpeed={100}
        data={images}
        onDragEnd={({ data }) => setImages(data)}
        keyExtractor={(item) => item.key}
        renderItem={({ item, drag, isActive, getIndex }) => {
          const index = getIndex();
          if (item.isDraggble) {
            return (
              <ImageItem
                image={item}
                onDrag={drag}
                isActive={isActive}
                onDelete={deleteImage}
                onOpen={openModalImage}
                index={index}
              />
            );
          }
        }}
        horizontal={true}
        containerStyle={{
          paddingBottom: 10,
          paddingTop: 10,
        }}
      />
    </View>
  );
}
