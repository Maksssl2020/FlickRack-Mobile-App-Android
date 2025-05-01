import React, { useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNameBanner from "@/components/AppNameBanner";
import useUserMoviesQuery from "@/hooks/queries/useUserMoviesQuery";
import SavedTmdbMovieCard from "@/components/SavedTmdbMovieCard";
import ManageSavedMovieModal from "@/components/ManageSavedMovieModal";
import { MovieDataToManage } from "@/types/UserMovieTypes";

const Saved = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chosenMovieData, setChosenMovieData] = useState<
    MovieDataToManage | undefined
  >(undefined);

  const { userMovies, fetchingUserMovies } = useUserMoviesQuery();

  return (
    <SafeAreaView
      className={"w-full h-full flex-1  items-center bg-custom-black-100"}
    >
      <FlatList
        data={userMovies}
        renderItem={({ item }) => (
          <SavedTmdbMovieCard
            movieData={item}
            onManageMovie={(data) => {
              setChosenMovieData(data);
              setIsModalOpen(true);
            }}
          />
        )}
        keyExtractor={(item) => item.movie.id.toString()}
        className={"px-5 w-full"}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className={"flex flex-col gap-4 items-center"}>
              <AppNameBanner />
            </View>

            {fetchingUserMovies && (
              <ActivityIndicator
                size="large"
                color="#3e55c6"
                className={"mt-10 self-center"}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !fetchingUserMovies ? (
            <View className={"mt-10"}>
              <Text
                className={
                  "text-center font-bold text-2xl text-custom-white-100"
                }
              >
                You didn't save any movies. Go to the Home and save few.
              </Text>
            </View>
          ) : (
            <></>
          )
        }
      />

      <ManageSavedMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieData={chosenMovieData}
      />
    </SafeAreaView>
  );
};

export default Saved;
