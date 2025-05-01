import React from "react";
import { router } from "expo-router";
import { Actor } from "@/types/ActorTypes";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type TmdbActorCardProps = {
  actorData: Actor;
};

const TmdbActorCard = ({ actorData }: TmdbActorCardProps) => {
  const { actorId, profile_path, name, popularity } = actorData;
  const imagePath = `https://image.tmdb.org/t/p/w500/${profile_path}`;

  return (
    <TouchableOpacity
      className={"w-[30%] h-auto relative"}
      onPress={() => router.push(`/actors/${actorId}`)}
    >
      <Image
        key={profile_path}
        source={{
          uri: imagePath
            ? imagePath
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className={"w-full h-52 rounded-lg"}
        resizeMode="cover"
      />

      <View className={"flex-col gap-1"}>
        <Text
          numberOfLines={1}
          className={"text-sm text-custom-white-100 font-bold"}
        >
          {name}
        </Text>

        <View className={"flex-row items-center justify-start gap-1"}>
          <MaterialIcons name="insights" size={18} color="#3e55c6" />
          <Text className={"text-sm font-bold text-custom-white-100"}>
            {Math.round((popularity * 2) / 20)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TmdbActorCard;
