import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MovieTmbd } from "@/types/MovieTypes";
import Ionicons from "@expo/vector-icons/Ionicons";

type TmdbMovieCard = {
  movieData: MovieTmbd;
};

const TmdbMovieCard = ({ movieData }: TmdbMovieCard) => {
  const { id, title, poster_path, vote_average, release_date } = movieData;
  const imagePath = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movies/${id}`)}
      className={"w-[30%] h-auto relative"}
    >
      <Image
        key={poster_path}
        source={{
          uri: poster_path
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
          {title}
        </Text>

        <View className={"flex-row items-center justify-start gap-1"}>
          <Ionicons name="star" size={16} color="#3e55c6" />
          <Text className={"text-sm font-bold text-custom-white-100"}>
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className={"flex-row items-center justify-between"}>
          <Text className={"text-xs text-custom-white-100"}>
            {release_date.substring(2)}
          </Text>
          <Text className={"text-xs uppercase text-custom-white-100"}>
            Movie
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TmdbMovieCard;
