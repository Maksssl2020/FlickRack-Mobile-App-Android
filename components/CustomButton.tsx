import React from "react";

import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonClassName?: string;
  textClassName?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  buttonClassName,
  textClassName,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
      style={{
        height: 50,
        borderRadius: 5,
      }}
      className={`w-full flex items-center overflow-hidden justify-center  rounded-xl ${buttonClassName} ${isLoading ? "opacity-50" : ""}`}
    >
      <LinearGradient
        className={"absolute  h-full w-full"}
        colors={["#7278d4", "#5a66cd", "#3e55c6"]}
        start={{ x: 0, y: 3 }}
      />
      <Text
        className={`text-2xl font-bold text-custom-white-100 ${textClassName}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
