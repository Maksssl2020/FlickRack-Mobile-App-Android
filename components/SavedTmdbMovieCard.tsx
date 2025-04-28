import React, { useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  MovieDataToDisplayInModalToSave,
  UserMovie,
} from "@/types/UserMovieTypes";

type SavedTmdbMovieCard = {
  movieData: UserMovie;
  onSaveMovie?: (data: MovieDataToDisplayInModalToSave) => void;
};

const SavedTmdbMovieCard = ({ movieData, onSaveMovie }: SavedTmdbMovieCard) => {
  const { id, title, poster_path, vote_average, release_date } =
    movieData.movie;
  const imagePath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  let userMovieStatusToDisplay;

  if (movieData.userMovieStatus === "ToWatch") {
    userMovieStatusToDisplay = "TO WATCH";
  } else if (movieData.userMovieStatus === "Watched") {
    userMovieStatusToDisplay = "WATCHED";
  } else {
    userMovieStatusToDisplay = "WATCHING";
  }

  return (
    <Link href={`/movies/${id}`} asChild={true}>
      <TouchableOpacity className={"w-[30%] h-auto relative"}>
        <Animated.View
          className={"absolute right-1 top-1 z-10"}
          style={{
            transform: [{ scale: scaleAnimation }],
          }}
        >
          <TouchableOpacity
            className={
              "size-8 items-center justify-center flex-1 rounded-full bg-custom-violet-600"
            }
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
            <Ionicons name="menu-sharp" size={24} color="#e6e6e6" />
          </TouchableOpacity>
        </Animated.View>

        <View
          className={
            "absolute top-[50%] z-10 h-[35px] bg-custom-violet-600 w-full flex items-center justify-center"
          }
        >
          <Text className={"text-xl font-bold text-custom-white-100"}>
            {userMovieStatusToDisplay}
          </Text>
        </View>

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
    </Link>
  );
};

export default SavedTmdbMovieCard;
