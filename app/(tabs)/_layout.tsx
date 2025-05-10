import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type TabIconProps = {
  icon:
    | "home-variant-outline"
    | "account-search-outline"
    | "magnify"
    | "bookmark-outline"
    | "account-outline";
  focused: boolean;
  title: string;
};

const TabIcon = ({ icon, title, focused }: TabIconProps) => {
  return (
    <View
      className={`flex flex-1 min-h-16 mt-5 overflow-hidden flex-row w-[125px] rounded-full justify-center items-center gap-2 ${focused && "bg-custom-violet-600"}`}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={focused ? "#E6E6E6" : "#888ada"}
      />
      {focused && (
        <Text className={"font-bold text-custom-white-100"}>{title}</Text>
      )}
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
          marginHorizontal: 10,
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
            <TabIcon
              icon={"home-variant-outline"}
              title={"Home"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"search-movie"}
        options={{
          title: "Search Movie",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={"magnify"}
              title={"Search Movie"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"search-actor"}
        options={{
          title: "Search Actor",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={"account-search-outline"}
              title={"Search Actor"}
              focused={focused}
            />
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
              icon={"account-outline"}
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
