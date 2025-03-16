import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type TabIconProps = {
  icon: "home-outline" | "search" | "bookmark-outline" | "person-outline";
  focused: boolean;
  title: string;
};

const TabIcon = ({ icon, title, focused }: TabIconProps) => {
  return (
    <View
      className={`flex flex-1 min-h-16 mt-5 overflow-hidden flex-row w-[115px] rounded-full justify-center items-center gap-2 ${focused && "bg-custom-violet-600"}`}
    >
      <Ionicons name={icon} size={24} color={focused ? "black" : "#888ada"} />
      {focused && <Text className={"font-bold"}>{title}</Text>}
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#292929",
          borderRadius: 50,
          marginHorizontal: 15,
          marginBottom: 20,
          height: 55,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#292929",
        },
      }}
    >
      <Tabs.Screen
        name={"home"}
        options={{
          title: "Home",

          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={"home-outline"} title={"Home"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name={"search"}
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={"search"} title={"Search"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name={"saved"}
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={"bookmark-outline"}
              title={"Saved"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"profile"}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={"person-outline"}
              title={"Profile"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
