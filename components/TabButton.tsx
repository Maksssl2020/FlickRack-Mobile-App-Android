import React from "react";
import { TouchableOpacity, Text } from "react-native";

type TabButtonProps = {
  label: string;
  value: string;
  activeTab: string;
  setActiveTab: (data: string) => void;
};

const TabButton = ({
  label,
  value,
  activeTab,
  setActiveTab,
}: TabButtonProps) => {
  return (
    <TouchableOpacity
      className={`rounded-lg h-[35px] flex-1 items-center justify-center ${activeTab === value ? "bg-custom-violet-500" : "bg-custom-black-100"}`}
      onPress={() => setActiveTab(value)}
    >
      <Text
        className={`text-lg font-medium  ${activeTab === value ? "text-custom-white-100" : "text-custom-violet-500"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;
