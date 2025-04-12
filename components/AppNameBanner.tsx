import React from "react";
import { Text, View } from "react-native";

type AppNameBannerProps = {
  className?: string;
};

const AppNameBanner = ({ className }: AppNameBannerProps) => {
  return (
    <View className={`flex flex-row ${className}`}>
      <Text className="text-custom-white-100 text-5xl font-bold">Flick</Text>
      <Text className="text-custom-violet-600 text-5xl font-bold">Rack</Text>
    </View>
  );
};

export default AppNameBanner;
