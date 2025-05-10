import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import useTmdbMovieByIdQuery from "@/hooks/queries/useTmdbMovieByIdQuery";
import useMovieReviewsQuery from "@/hooks/queries/useMovieReviewsQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import TmdbMovieReviewCard from "@/components/TmdbMovieReviewCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import useMovieUsersReviewsQuery from "@/hooks/queries/useMovieUsersReviewsQuery";
import {
  mapTmdbReviewToMovieReview,
  mapUserReviewToMovieReview,
} from "@/types/TypesMapper";
import { MovieReview } from "@/types/MovieTypes";
import useUserReviewExistsMutation from "@/hooks/mutations/useUserReviewExistsMutation";
import Toast from "react-native-toast-message";

const MovieReviews = () => {
  const [userReviewExists, setUserReviewExists] = useState<boolean>(false);
  const { movieId } = useLocalSearchParams();
  const { userId } = useAuthenticationStore.getState().authentication;
  const { movieDataById, fetchingMovieById } = useTmdbMovieByIdQuery(
    movieId.toString(),
    userId,
  );
  const { movieTmdbReviews, fetchingMovieTmdbReviews } = useMovieReviewsQuery(
    movieId.toString(),
  );
  const { movieUsersReviews, fetchingMovieUsersReviews } =
    useMovieUsersReviewsQuery(movieId.toString());

  const { checkUserReviewExists, checkingUserReviewExists } =
    useUserReviewExistsMutation((value) => setUserReviewExists(value));

  const isLoading =
    fetchingMovieTmdbReviews || fetchingMovieById || fetchingMovieUsersReviews;

  const combinedReviews: MovieReview[] = [
    ...(movieUsersReviews ?? []).map(mapUserReviewToMovieReview),
    ...(movieTmdbReviews ?? []).map(mapTmdbReviewToMovieReview),
  ];

  const onSubmit = () => {
    if (userId && movieId) {
      checkUserReviewExists({
        userId: userId,
        movieId: movieId.toString(),
      });

      if (userReviewExists) {
        Toast.show({
          type: "info",
          text1: "You already have a review for this movie.",
        });
      } else {
        router.push({
          // @ts-ignore
          pathname: "reviews/movie-review-form",
          params: {
            movieId: movieId,
            movieTitle: movieDataById!.title,
          },
        });
      }
    }
  };

  return (
    <SafeAreaView className={"w-full h-full flex-1 bg-custom-black-100"}>
      <FlatList
        data={combinedReviews}
        keyExtractor={(item) => item.id.toString().concat(item.username)}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 60,
        }}
        ListHeaderComponent={
          <>
            {movieDataById && (
              <View
                className={
                  "flex-row w-full py-4 bg-custom-black-200 rounded-xl mb-4"
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movieDataById.poster_path}`,
                  }}
                  className="w-44 h-64 rounded-xl"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4 justify-between">
                  <View>
                    <Text className="text-custom-violet-500 text-2xl font-bold">
                      {movieDataById.title}
                    </Text>
                    <View className={"flex flex-row gap-2 mt-1"}>
                      <Text className="text-custom-white-100 text-sm ">
                        {movieDataById.release_date?.slice(0, 4)}
                      </Text>
                      <Text className={"text-custom-white-100 text-sm"}>|</Text>
                      <Text className={"text-custom-white-100 text-sm"}>
                        {movieDataById.runtime} minutes
                      </Text>
                    </View>
                    <Text
                      className="text-custom-white-100 text-base mt-2"
                      numberOfLines={6}
                    >
                      {movieDataById.overview}
                    </Text>
                  </View>

                  <View
                    className={
                      "flex-row gap-3 justify-center items-center bg-custom-violet-600/75 py-1 px-2 rounded-md"
                    }
                  >
                    <Ionicons name="star" size={24} color="#e6e6e6" />
                    <Text
                      className={"text-xl font-bold text-custom-white-100 "}
                    >
                      {Math.round(movieDataById.vote_average)} / 10
                    </Text>
                    <Text
                      className={"text-xl font-bold text-custom-white-100 "}
                    >
                      ( {movieDataById.vote_count} votes)
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View className={"mb-4 flex flex-row justify-between items-top"}>
              <Text className="text-2xl ml-2 text-custom-white-100 font-bold">
                Movie Reviews
              </Text>
              <CustomButton
                title={""}
                isLoading={checkingUserReviewExists}
                onPress={() => onSubmit()}
                buttonClassName={
                  "w-[125px] h-[35px] flex flex-row items-center gap-2"
                }
              >
                <Ionicons name="add" size={24} color="#e6e6e6" />
                <Text className={"text-custom-white-100 font-bold"}>
                  Add Review
                </Text>
              </CustomButton>
            </View>

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#3e55c6"
                className="mt-10 self-center"
              />
            )}
          </>
        }
        renderItem={({ item }) => (
          <TmdbMovieReviewCard
            reviewData={item}
            movieTitle={movieDataById!.title}
          />
        )}
      />

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
    </SafeAreaView>
  );
};

export default MovieReviews;
