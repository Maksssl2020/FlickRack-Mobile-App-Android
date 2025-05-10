import React, { useState } from "react";

import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useTmdbMovieByIdQuery from "@/hooks/queries/useTmdbMovieByIdQuery";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import SaveMovieModal from "@/components/SaveMovieModal";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import AnimatedCustomButton from "@/components/AnimatedCustomButton";
import useAddFavouriteMovieMutation from "@/hooks/mutations/useAddFavouriteMovieMutation";
import useDeleteFavouriteMovieMutation from "@/hooks/mutations/useDeleteFavouriteMovieMutation";

const MovieDetails = () => {
  const { userId } = useAuthenticationStore.getState().authentication;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { movieId } = useLocalSearchParams();
  const { movieDataById, fetchingMovieById } = useTmdbMovieByIdQuery(
    movieId.toString(),
    userId,
  );
  const { addMovieToFavourites, addingMovieToFavourites } =
    useAddFavouriteMovieMutation();
  const { deleteMovieFromFavourites, deletingMovieFromFavourites } =
    useDeleteFavouriteMovieMutation();

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
            <View
              className={
                "w-auto h-auto flex-row absolute right-1 top-1 z-10 gap-2"
              }
            >
              <AnimatedCustomButton
                className={`size-10 ${movieDataById.isFavourite ? "bg-custom-white-100 shadow-lg" : "bg-custom-violet-400"}`}
                onPress={() => {
                  if (!movieDataById?.isFavourite) {
                    if (userId && movieDataById?.id) {
                      addMovieToFavourites({
                        userId: userId,
                        entityId: movieDataById.id,
                      });
                    }
                  } else {
                    if (userId && movieDataById?.id) {
                      deleteMovieFromFavourites({
                        userId: userId,
                        entityId: movieDataById.id,
                      });
                    }
                  }
                }}
                isLoading={
                  addingMovieToFavourites || deletingMovieFromFavourites
                }
              >
                <Ionicons
                  name={movieDataById.isFavourite ? "star" : "star-outline"}
                  size={28}
                  color={movieDataById.isFavourite ? "#ff4d4d" : "#e6e6e6"}
                />
              </AnimatedCustomButton>
              <AnimatedCustomButton
                className={`size-10 ${movieDataById.isSavedMovie ? "bg-custom-white-100 shadow-lg" : "bg-custom-violet-400"}`}
                onPress={() => {
                  setIsModalOpen(true);
                }}
              >
                <Ionicons
                  name={movieDataById.isSavedMovie ? "heart" : "heart-outline"}
                  size={28}
                  color={movieDataById.isSavedMovie ? "#ff4d4d" : "#e6e6e6"}
                  className={"mt-0.5"}
                />
              </AnimatedCustomButton>
            </View>
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
            <CustomButton
              title={""}
              onPress={() => router.push(`reviews/${movieDataById!.id}`)}
              buttonClassName={"self-center w-full h-[50px]"}
            >
              <View className={"flex-row items-center gap-2"}>
                <Text className={"text-xl text-custom-white-100 font-bold"}>
                  Go To Reviews
                </Text>
                <Ionicons name={"arrow-forward"} size={24} color={"#E6E6E6"} />
              </View>
            </CustomButton>

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
        buttonClassName={"absolute bottom-4 self-center w-[95%] h-[50px]"}
      >
        <View className={"flex-row items-center gap-2"}>
          <Ionicons name={"arrow-back"} size={24} color={"#E6E6E6"} />
          <Text className={"text-xl text-custom-white-100 font-bold"}>
            Go Back
          </Text>
        </View>
      </CustomButton>

      {!fetchingMovieById && movieDataById !== undefined && (
        <SaveMovieModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          movieData={{
            id: `${movieDataById.id}`,
            title: movieDataById.title,
          }}
        />
      )}
    </View>
  );
};

export default MovieDetails;
