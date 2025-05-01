import React, { useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { MovieTmbd } from "@/types/MovieTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MovieDataToSave } from "@/types/UserMovieTypes";

type TmdbMovieCard = {
  movieData: MovieTmbd;
  onSaveMovie?: (data: MovieDataToSave) => void;
  isSavedMovie?: boolean;
  isHeartIconVisible?: boolean;
};

const TmdbMovieCard = ({
  movieData,
  onSaveMovie,
  isSavedMovie = false,
  isHeartIconVisible = true,
}: TmdbMovieCard) => {
  const { id, title, poster_path, vote_average, release_date } = movieData;
  const imagePath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movies/${id}`)}
      className={"w-[30%] h-auto relative"}
    >
      {isHeartIconVisible && (
        <Animated.View
          className={"absolute right-1 top-1 z-10"}
          style={{
            transform: [{ scale: scaleAnimation }],
          }}
        >
          <TouchableOpacity
            className={` size-8 items-center justify-center flex-1 rounded-full ${isSavedMovie ? "bg-custom-white-100 shadow-lg" : "bg-custom-violet-400"}`}
            onPress={(event) => {
              event.stopPropagation();

              Animated.sequence([
                Animated.spring(scaleAnimation, {
                  toValue: 1.2,
                  useNativeDriver: true,
                }),
                Animated.spring(scaleAnimation, {
                  toValue: 1.0,
                  useNativeDriver: true,
                }),
              ]).start();

              onSaveMovie?.({
                id: `${id}`,
                title: title,
              });
            }}
          >
            <Ionicons
              name={isSavedMovie ? "heart" : "heart-outline"}
              size={24}
              color={isSavedMovie ? "#ff4d4d" : "#e6e6e6"}
              className={"mt-0.5"}
            />
          </TouchableOpacity>
        </Animated.View>
      )}

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
