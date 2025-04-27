import React from "react";

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useTmdbMovieByIdQuery from "@/hooks/queries/useTmdbMovieByIdQuery";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Label } from "@react-navigation/elements";
import CustomButton from "@/components/CustomButton";

const MovieDetails = () => {
  const { movieId } = useLocalSearchParams();
  const { movieDataById, fetchingMovieById } = useTmdbMovieByIdQuery(
    movieId.toString(),
  );

  console.log(movieId.toString());

  return (
    <View className={"bg-custom-black-100 flex-1"}>
      {fetchingMovieById || movieDataById === undefined ? (
        <ActivityIndicator
          size="large"
          color="#3e55c6"
          className="mt-24 self-center"
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingTop: 35,
            paddingBottom: 80,
          }}
        >
          <View className={"w-full h-auto"}>
            <Image
              className={"w-full h-[550px]"}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDataById.poster_path}`,
              }}
              resizeMode={"stretch"}
            />
          </View>
          <View
            className={"flex-col items-start justify-center mt-5 px-5 gap-3"}
          >
            <Text className={"text-custom-white-100 font-bold text-2xl"}>
              {movieDataById?.title}
            </Text>
            <View className={"flex-row items-center gap-3 "}>
              <Text className={"text-custom-violet-500 text-xl"}>
                {movieDataById.release_date.split("-")[0]}
              </Text>
              <Text className={"text-custom-violet-500 text-xl"}>|</Text>
              <Text className={"text-custom-violet-500 text-xl"}>
                {movieDataById.runtime} minutes
              </Text>
            </View>
            <View
              className={
                "flex-row gap-3  items-center bg-custom-violet-600/75 py-1 px-2 rounded-md"
              }
            >
              <Ionicons name="star" size={24} color="#e6e6e6" />
              <Text className={"text-xl font-bold text-custom-white-100 "}>
                {Math.round(movieDataById.vote_average)} / 10
              </Text>
              <Text className={"text-xl font-bold text-custom-white-100 "}>
                ( {movieDataById.vote_count} votes)
              </Text>
            </View>
            <View className={"flex-col gap-2 mt-2"}>
              <Text className={"text-custom-violet-500 text-xl font-medium"}>
                Overview
              </Text>
              <Text className={"text-lg text-custom-white-100 font-medium"}>
                {movieDataById.overview}
              </Text>
            </View>
            <View className={"flex-col gap-2 mt-2"}>
              <Text className={"text-custom-violet-500 text-xl font-medium"}>
                Genres
              </Text>
              <Text className={"text-lg text-custom-white-100 font-medium"}>
                {movieDataById.genres.map((g) => g.name).join(" - ") || "N/A"}
              </Text>
            </View>
            <View className={"flex flex-row gap-10"}>
              <View className={"flex-col gap-2 mt-2"}>
                <Text className={"text-custom-violet-500 text-xl font-medium"}>
                  Budget
                </Text>
                <Text className={"text-lg text-custom-white-100 font-medium"}>
                  ${movieDataById.budget / 1000000} million
                </Text>
              </View>
              <View className={"flex-col gap-2 mt-2"}>
                <Text className={"text-custom-violet-500 text-xl font-medium"}>
                  Revenue
                </Text>
                <Text className={"text-lg text-custom-white-100 font-medium"}>
                  ${(movieDataById.revenue / 1000000).toFixed(2)} million
                </Text>
              </View>
            </View>
            <View className={"flex-col gap-2 mt-2"}>
              <Text className={"text-custom-violet-500 text-xl font-medium"}>
                Production Companies
              </Text>
              <Text className={"text-lg text-custom-white-100 font-medium"}>
                {movieDataById.production_companies
                  .map((p) => p.name)
                  .join(" - ") || "N/A"}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <CustomButton
        title={""}
        onPress={router.back}
        buttonClassName={"absolute bottom-4  self-center "}
      >
        <View className={"flex-row items-center gap-2"}>
          <Ionicons name={"arrow-back"} size={24} color={"#E6E6E6"} />
          <Text className={"text-xl text-custom-white-100 font-bold"}>
            Go Back
          </Text>
        </View>
      </CustomButton>
    </View>
  );
};

export default MovieDetails;
