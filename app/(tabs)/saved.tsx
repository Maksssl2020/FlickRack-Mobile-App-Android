import React from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNameBanner from "@/components/AppNameBanner";
import useUserMoviesQuery from "@/hooks/queries/useUserMoviesQuery";
import TmdbMovieCard from "@/components/TmdbMovieCard";
import SavedTmdbMovieCard from "@/components/SavedTmdbMovieCard";

const Saved = () => {
  const { userMovies, fetchingUserMovies } = useUserMoviesQuery();

  return (
    <SafeAreaView
      className={"w-full h-full flex-1  items-center bg-custom-black-100"}
    >
      <FlatList
        data={userMovies}
        renderItem={({ item }) => <SavedTmdbMovieCard movieData={item} />}
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
    </SafeAreaView>
  );
};

export default Saved;
