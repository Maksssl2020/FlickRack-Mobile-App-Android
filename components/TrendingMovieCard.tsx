import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { Metrics } from "@/types/MetricsTypes";
import { LinearGradient } from "expo-linear-gradient";

type TrendingMovieCardProps = {
  movieData: Metrics;
  index: number;
};

const TrendingMovieCard = ({ movieData, index }: TrendingMovieCardProps) => {
  const { id, movieTitle, moviePosterUrl, movieId } = movieData;
  const imagePath = `https://image.tmdb.org/t/p/w500${moviePosterUrl}`;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movies/${movieId}`)}
      className={"w-32 h-auto relative pl-4"}
    >
      <Image
        key={moviePosterUrl}
        source={{
          uri: moviePosterUrl
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
        {movieTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingMovieCard;
