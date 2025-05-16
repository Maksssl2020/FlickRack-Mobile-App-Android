import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import useTmdbActorByIdQuery from "@/hooks/queries/useTmdbActorByIdQuery";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useAddFavouriteActorMutation from "@/hooks/mutations/useAddFavouriteActorMutation";
import useDeleteFavouriteActorMutation from "@/hooks/mutations/useDeleteFavouriteActorMutation";
import AnimatedCustomButton from "@/components/AnimatedCustomButton";
import useUpdateActorMetricsCount from "@/hooks/mutations/useUpdateActorMetricsCount";

const ActorDetails = () => {
  const { userId } = useAuthenticationStore.getState().authentication;
  const { actorId } = useLocalSearchParams();
  const { actorDataById, fetchingActorById } = useTmdbActorByIdQuery(
    actorId.toString(),
    userId,
  );

  const { addActorToFavourites, addingActorToFavourites } =
    useAddFavouriteActorMutation();
  const { deleteActorFromFavourites, deletingActorFromFavourites } =
    useDeleteFavouriteActorMutation();
  const { updateActorMetricsCount, updatingActorMetricsCount } =
    useUpdateActorMetricsCount();

  return (
    <View className={"bg-custom-black-100 flex-1"}>
      {fetchingActorById || actorDataById === undefined ? (
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
                className={`size-10 ${actorDataById.isFavourite ? "bg-custom-white-100 shadow-lg" : "bg-custom-violet-400"}`}
                onPress={() => {
                  console.log("Pressed actor fav button");

                  if (!actorDataById?.isFavourite) {
                    if (userId && actorDataById?.id) {
                      addActorToFavourites({
                        userId: userId,
                        entityId: actorDataById.id,
                      });
                      updateActorMetricsCount({
                        isFavourite: true,
                        actorTmdb: actorDataById,
                      });
                    }
                  } else {
                    if (userId && actorDataById?.id) {
                      deleteActorFromFavourites({
                        userId: userId,
                        entityId: actorDataById.id,
                      });
                      updateActorMetricsCount({
                        isFavourite: false,
                        actorTmdb: actorDataById,
                      });
                    }
                  }
                }}
                isLoading={
                  addingActorToFavourites ||
                  deletingActorFromFavourites ||
                  updatingActorMetricsCount
                }
              >
                <Ionicons
                  name={actorDataById.isFavourite ? "star" : "star-outline"}
                  size={28}
                  color={actorDataById.isFavourite ? "#ff4d4d" : "#e6e6e6"}
                />
              </AnimatedCustomButton>
            </View>

            <Image
              className={"w-full h-[550px]"}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${actorDataById.profile_path}`,
              }}
              resizeMode={"stretch"}
            />
          </View>
          <View
            className={"flex-col items-start justify-center mt-5 px-5 gap-3"}
          >
            <View className={"flex-row gap-3"}>
              <Text className={"text-custom-white-100 font-bold text-2xl"}>
                {actorDataById?.name}
              </Text>
              <Text className={"text-custom-white-100 font-bold text-2xl"}>
                -
              </Text>
              <Text className={"text-custom-white-100 font-bold text-2xl"}>
                {actorDataById?.gender}
              </Text>
            </View>
            <View
              className={
                "w-auto flex-row gap-3 items-center bg-custom-violet-600/75 py-1 px-2 rounded-md "
              }
            >
              <MaterialIcons name="insights" size={22} color="#e6e6e6" />
              <Text className={"text-xl font-bold text-custom-white-100 "}>
                {Math.round((actorDataById.popularity * 2) / 20)} / 5
              </Text>
            </View>

            <View className={'className={"flex flex-row gap-10"}'}>
              <View className={"flex-col gap-2 mt-2"}>
                <Text className={"text-custom-violet-500 text-xl font-medium"}>
                  Birthday
                </Text>
                <Text className={"text-lg text-custom-white-100 font-medium"}>
                  {actorDataById.birthday}
                </Text>
              </View>
              {actorDataById.deathday && (
                <View className={"flex-col gap-2 mt-2"}>
                  <Text
                    className={"text-custom-violet-500 text-xl font-medium"}
                  >
                    Deathday
                  </Text>
                  <Text className={"text-lg text-custom-white-100 font-medium"}>
                    {actorDataById.deathday}
                  </Text>
                </View>
              )}
            </View>

            <View className={"flex-col gap-2 mt-2"}>
              <Text className={"text-custom-violet-500 text-xl font-medium"}>
                Biography
              </Text>
              <Text className={"text-lg text-custom-white-100 font-medium"}>
                {actorDataById.biography}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <CustomButton
        title={""}
        onPress={() => router.back()}
        buttonClassName={"absolute bottom-4 self-center w-[95%] h-[50px]"}
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

export default ActorDetails;
