import * as React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../assets/components/Icon";

//Screens
import FishingScreen from "./screens/FishingScreen";
import LeaderScreen from "./screens/LeaderScreen";
import FishBookScreen from "./screens/FishBookScreen";
import MoreScreen from "./screens/MoreScreen";
import AddFishingScreen from "./screens/AddFishingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import OneFishingScreen from "./screens/OneFishingScreen";
import AboutFishScreen from "./screens/AboutFishScreen";

// Screen names
const fishingName = "Fishing";
const leaderName = "Leader";
const fishBookName = "FishBook";
const moreName = "More";
const addFishingName = "AddFishing";

function getIcon(iconName, size, focused, color) {
  switch (iconName) {
    case fishBookName:
      return <Icon iconName="fish" color={color} size={size} solid={focused} />;
    case fishingName:
      return (
        <Icon
          iconName="fishing-rod"
          color={color}
          size={size}
          solid={focused}
        />
      );
    case moreName:
      return <Icon iconName="more" color={color} size={size} solid={focused} />;
    case leaderName:
      return (
        <Icon iconName="pedestal" color={color} size={size} solid={focused} />
      );
  }
}

function getLabel(path, color, focused, isTitle = false) {
  switch (path) {
    case fishingName:
      return (
        <Text
          style={{
            fontSize: isTitle ? 21 : 11,
            fontWeight: isTitle ? 700 : focused ? 600 : 400,
            color: !isTitle && color,
          }}
        >
          Рыбалки
        </Text>
      );
    case leaderName:
      return (
        <Text
          style={{
            fontSize: isTitle ? 21 : 11,
            fontWeight: isTitle ? 700 : focused ? 600 : 400,
            color: !isTitle && color,
          }}
        >
          Трофеи
        </Text>
      );
    case fishBookName:
      return (
        <Text
          style={{
            fontSize: isTitle ? 21 : 11,
            fontWeight: isTitle ? 700 : focused ? 600 : 400,
            color: !isTitle && color,
          }}
        >
          Справочник
        </Text>
      );
    case moreName:
      return (
        <Text
          style={{
            fontSize: isTitle ? 21 : 11,
            fontWeight: isTitle ? 700 : focused ? 600 : 400,
            color: !isTitle && color,
          }}
        >
          Еще
        </Text>
      );
    default:
      return <Text></Text>;
  }
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={fishingName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          return getIcon(route.name, size, focused, color);
        },
        tabBarLabel: ({ color, focused }) => {
          return getLabel(route.name, color, focused);
        },
        title: getLabel(route.name, "", false, true),
      })}
    >
      <Tab.Screen name={fishingName} component={FishingScreen} />
      <Tab.Screen name={leaderName} component={LeaderScreen} />
      <Tab.Screen
        name={addFishingName}
        component={AddFishingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#5555ff",
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  marginBottom: 20,
                  paddingBottom: 2,
                  elevation: 5,
                  shadowColor: "#52006A",
                }}
              >
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: 300,
                    color: "#fff",
                  }}
                >
                  +
                </Text>
              </View>
            );
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("add-fishing");
          },
        })}
      />
      <Tab.Screen name={fishBookName} component={FishBookScreen} />
      <Tab.Screen name={moreName} component={MoreScreen} />
    </Tab.Navigator>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="add-fishing"
          component={AddFishingScreen}
          options={{
            title: "Добавить новую рыбалку",
          }}
        />
        <Stack.Screen
          name="one-fishing-screen"
          component={OneFishingScreen}
          options={{
            title: "Рыбалка",
          }}
        />
        <Stack.Screen
          name="about-fish-screen"
          component={AboutFishScreen}
          options={{
            title: "Рыбалка",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
