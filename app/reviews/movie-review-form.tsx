import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAddMovieUserReviewMutation from "@/hooks/mutations/useAddMovieUserReviewMutation";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { useRoute } from "@react-navigation/core";
import { MovieReview } from "@/types/MovieTypes";
import useUpdateUserReviewMutation from "@/hooks/mutations/useUpdateUserReviewMutation";

const MovieReviewForm = () => {
  const route = useRoute();
  const { mode, reviewData, movieTitleToEdit } = (route.params ?? {}) as {
    mode?: string;
    reviewData?: MovieReview;
    movieTitleToEdit?: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rating: mode === "edit" ? (reviewData?.rating ?? 1) : 1,
      content: mode === "edit" ? (reviewData?.content ?? "") : "",
    },
  });
  const { userId, username } = useAuthenticationStore.getState().authentication;
  const { movieId, movieTitle } = useLocalSearchParams();
  const { addMovieUserReview, addingMovieUserReview } =
    useAddMovieUserReviewMutation(() => {
      router.back();
    });
  const { updateUserReview, updatingUserReview } = useUpdateUserReviewMutation(
    () => {
      router.back();
    },
  );

  console.log("MODE: " + mode);

  const onSubmit = (content: string, rating: number) => {
    if (
      mode === "edit" &&
      userId &&
      username &&
      reviewData &&
      movieTitleToEdit
    ) {
      updateUserReview({
        userId: userId,
        movieId: reviewData.movieId.toString(),
        username: username,
        rating: rating,
        content: content,
        movieTitle: movieTitleToEdit.toString(),
      });
    } else if (mode !== "edit" && userId && username && movieId && movieTitle) {
      addMovieUserReview({
        userId: userId,
        movieId: movieId.toString(),
        username: username,
        rating: rating,
        content: content,
        movieTitle: movieTitle.toString(),
      });
    }
  };

  return (
    <SafeAreaView className={"flex-1 bg-custom-black-100 p-5"}>
      <View className={"justify-center ml-2"}>
        <Text className={"text-2xl font-medium text-custom-white-100"}>
          {mode === "edit" ? "Update Review For" : "Add Review For"}
        </Text>
        <Text className={"text-2xl font-bold text-custom-violet-500"}>
          {movieTitle || movieTitleToEdit}
        </Text>
      </View>
      <View className={"flex flex-col gap-3"}>
        <View className="mt-6">
          <Text className="text-2xl text-custom-white-100 ml-2 mb-2">
            Rating ( 1 - 10 )
          </Text>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: "Rating is required.",
              min: { value: 1, message: "Minimum is 1." },
              max: { value: 10, message: "Maximum is 10." },
            }}
            render={({ field: { onChange, value } }) => (
              <View className="flex-row justify-between">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => onChange(num)}
                    className={`w-9 h-9 rounded-full items-center justify-center ${
                      value === num
                        ? "bg-custom-violet-500"
                        : "bg-custom-gray-600"
                    }`}
                  >
                    <Text className="text-white font-bold">{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          {errors.rating && (
            <Text className="text-red-500 text-base mt-1">
              {errors.rating.message}
            </Text>
          )}
        </View>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Review Content is required.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              title={"Review Content"}
              value={value}
              textType={"none"}
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.content?.message}
              height={500}
              textAlignVertical={"top"}
            />
          )}
          name={"content"}
        />
      </View>
      <View className={"mt-auto flex flex-col gap-2"}>
        <CustomButton
          title={""}
          onPress={handleSubmit((data) => {
            onSubmit(data.content, data.rating);
          })}
          isLoading={addingMovieUserReview || updatingUserReview}
          buttonClassName={" self-center w-full h-[50px]"}
        >
          <View className={"flex-row items-center gap-2"}>
            <Ionicons name={"add"} size={24} color={"#E6E6E6"} />
            <Text className={"text-xl text-custom-white-100 font-bold"}>
              {mode === "edit" ? "Update Movie Review" : "Add Movie Review"}
            </Text>
          </View>
        </CustomButton>
        <CustomButton
          title={""}
          onPress={router.back}
          buttonClassName={" self-center w-full h-[50px]"}
        >
          <View className={"flex-row items-center gap-2"}>
            <Ionicons name={"arrow-back"} size={24} color={"#E6E6E6"} />
            <Text className={"text-xl text-custom-white-100 font-bold"}>
              Go Back
            </Text>
          </View>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default MovieReviewForm;
