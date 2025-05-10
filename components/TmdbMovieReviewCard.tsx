import React from "react";
import { Text, View } from "react-native";
import { MovieReview } from "@/types/MovieTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { useNavigation } from "expo-router";
import useDeleteUserReviewMutation from "@/hooks/mutations/useDeleteUserReviewMutation";

type MovieTmdbReviewCardProps = {
  reviewData: MovieReview;
  movieTitle: string;
};

const TmdbMovieReviewCard = ({
  reviewData,
  movieTitle,
}: MovieTmdbReviewCardProps) => {
  const navigation = useNavigation();
  const { userId: loggedInUserId } =
    useAuthenticationStore.getState().authentication;
  const { username, rating, content, createdAt, updatedAt, userId, movieId } =
    reviewData;

  const { deleteUserReview, deletingUserReview } =
    useDeleteUserReviewMutation();

  const handleEdit = () => {
    navigation.navigate(
      // @ts-ignore
      "reviews/movie-review-form",
      {
        mode: "edit",
        reviewData: reviewData,
        movieTitleToEdit: movieTitle,
      },
    );
  };

  const handleDelete = () => {
    if (loggedInUserId && movieId) {
      deleteUserReview({
        userId: loggedInUserId,
        movieId: movieId.toString(),
      });
    }
  };

  return (
    <View className="bg-custom-black-200 px-2 pt-2 pb-4 rounded-xl my-2 border-b-2 border-custom-violet-500">
      <View className={"flex flex-col  mb-4"}>
        <View className="flex-row justify-between items-top">
          <View className={"flex flex-row gap-2"}>
            <Text className="text-custom-violet-500 font-semibold text-xl">
              {username}
            </Text>
            {loggedInUserId && userId === loggedInUserId && (
              <View className={"flex flex-row gap-2"}>
                <CustomButton
                  isLoading={deletingUserReview}
                  buttonClassName={
                    "size-8 rounded-full items-center justify-center bg-custom-violet-600"
                  }
                  title={""}
                  onPress={() => handleDelete()}
                >
                  <Ionicons
                    name={"trash-outline"}
                    size={18}
                    color={"#e6e6e6"}
                  />
                </CustomButton>
                <CustomButton
                  buttonClassName={
                    "size-8 rounded-full items-center justify-center bg-custom-violet-600"
                  }
                  title={""}
                  onPress={() => handleEdit()}
                >
                  <Ionicons name={"pencil"} size={18} color={"#e6e6e6"} />
                </CustomButton>
              </View>
            )}
          </View>
          {rating !== null && (
            <View
              className={
                "flex-row gap-2 justify-center items-center  p-1 rounded-md"
              }
            >
              <Ionicons name="star" size={18} color="#5a66cd" />
              <Text className={"text-lg font-bold text-custom-white-100 "}>
                {rating} / 10
              </Text>
            </View>
          )}
        </View>

        <View className={"flex flex-row gap-3 items-center mb-2"}>
          <View className={"flex flex-row gap-2 items-center"}>
            <Ionicons
              name="calendar-number-outline"
              size={18}
              color="#e6e6e6"
            />
            <Text className="text-custom-white-100 text-sm ">
              {createdAt.split("T")[0]}
            </Text>
          </View>

          {updatedAt && (
            <>
              <Text
                className={
                  "text-custom-white-100 text-lg font-bold justify-center"
                }
              >
                |
              </Text>
              <View className={"flex flex-row gap-2 items-center"}>
                <Ionicons name="pencil-outline" size={18} color="#e6e6e6" />
                <Text className="text-custom-white-100 text-sm ">
                  {updatedAt.split("T")[0]}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      <Text className="text-custom-white-100 text-base leading-5">
        {content}
      </Text>
    </View>
  );
};

export default TmdbMovieReviewCard;
