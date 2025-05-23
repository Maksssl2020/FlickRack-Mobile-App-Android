import React from "react";
import { Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type SearchBarProps = {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (value: string) => void;
};

const SearchBar = ({
  value,
  onPress,
  onChangeText,
  placeholder,
}: SearchBarProps) => {
  return (
    <View
      className={
        "flex flex-row items-center w-full px-4 justify-center  bg-custom-gray-500 h-[50px] rounded-full"
      }
    >
      <Ionicons name={"search"} size={28} color={"#E6E6E6"} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={"#E6E6E6"}
        onChangeText={(value) => onChangeText?.(value)}
        className={"flex-1 ml-2 text-custom-white-100 placeholder:text-xl"}
      />
    </View>
  );
};

export default SearchBar;
