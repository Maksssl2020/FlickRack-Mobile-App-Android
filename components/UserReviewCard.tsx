import React from "react";
import { MovieReview } from "@/types/MovieTypes";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserMovieReview } from "@/types/UserReviewTypes";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import CustomButton from "@/components/CustomButton";

type UserReviewCardProps = {
  reviewData: UserMovieReview;
};

const UserReviewCard = ({ reviewData }: UserReviewCardProps) => {
  const {
    username,
    rating,
    content,
    createdAt,
    updatedAt,
    movieTitle,
    userId,
  } = reviewData;

  return (
    <View className="bg-custom-black-200 px-2 pt-2 pb-4 rounded-xl my-2 border-b-2 border-custom-violet-500">
      <View className={"flex flex-col  mb-4"}>
        <Text className="text-custom-white-100 text-base mb-1">
          Movie:{" "}
          <Text className="text-custom-violet-500 font-semibold">
            {movieTitle}
          </Text>
        </Text>
        <View className="flex-row justify-between items-top">
          <View className={"flex flex-row gap-2"}>
            <Text className="text-custom-violet-500 font-semibold text-xl">
              {username}
            </Text>
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

          {updatedAt && updatedAt !== "0001-01-01" && (
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

export default UserReviewCard;
