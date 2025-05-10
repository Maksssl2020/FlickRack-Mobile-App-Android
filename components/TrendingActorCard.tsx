import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ActorMetrics } from "@/types/MetricsTypes";

type TrendingActorCardProps = {
  actorData: ActorMetrics;
  index: number;
};

const TrendingActorCard = ({ actorData, index }: TrendingActorCardProps) => {
  const { id, name, posterPath, actorId } = actorData;
  const imagePath = `https://image.tmdb.org/t/p/w500${posterPath}`;

  console.log("TRENDING ActorCard", actorData);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movies/${actorId}`)}
      className={"w-32 h-auto relative pl-4"}
    >
      <Image
        key={posterPath}
        source={{
          uri: posterPath
            ? imagePath
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className={"w-full h-52 rounded-lg"}
        resizeMode="cover"
      />

      <View className={"absolute bottom-8 -left-3.5 px-2 py-1 rounded-full"}>
        <MaskedView
          style={{ width: 50, height: 48 }}
          maskElement={
            <Text className={"font-bold text-7xl"}>{index + 1}</Text>
          }
        >
          <LinearGradient
            colors={["#E6E6E6", "#E6E6E6", "#141414"]}
            className={"w-full h-[60px]"}
          />
        </MaskedView>
      </View>

      <Text
        numberOfLines={1}
        className={"text-sm font-bold mt-2 text-custom-white-100"}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingActorCard;
