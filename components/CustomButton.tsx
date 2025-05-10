import React from "react";

import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonClassName?: string;
  textClassName?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

const CustomButton = ({
  title,
  onPress,
  buttonClassName = "w-full h-[50px]",
  textClassName = "text-2xl ",
  isLoading,
  children,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
      style={{
        borderRadius: 5,
      }}
      className={`flex items-center overflow-hidden justify-center  rounded-xl ${buttonClassName} ${isLoading ? "opacity-50" : ""}`}
    >
      <LinearGradient
        className={"absolute h-full w-full"}
        colors={["#7278d4", "#5a66cd", "#3e55c6"]}
        start={{ x: 0, y: 3 }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#e6e6e6" />
      ) : children ? (
        children
      ) : (
        <Text className={`font-bold text-custom-white-100 ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
