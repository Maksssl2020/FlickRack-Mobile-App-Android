import React, { useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNameBanner from "@/components/AppNameBanner";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useTmdbMoviesQuery from "@/hooks/queries/useTmdbMoviesQuery";
import TmdbMovieCard from "@/components/TmdbMovieCard";
import useMetricsQuery from "@/hooks/queries/useMetricsQuery";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { MovieDataToDisplayInModalToSave } from "@/types/UserMovieTypes";
import SaveMovieModal from "@/components/SaveMovieModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chosenMovieData, setChosenMovieData] = useState<
    MovieDataToDisplayInModalToSave | undefined
  >(undefined);
  const { tmdbMovies, fetchingTmdbMovies } = useTmdbMoviesQuery();
  const { metrics, fetchingMetrics } = useMetricsQuery();
  const router = useRouter();

  const isLoading = fetchingTmdbMovies || fetchingMetrics;

  return (
    <SafeAreaView className={"w-full h-full flex-1 bg-custom-black-100"}>
      <FlatList
        data={tmdbMovies}
        keyExtractor={(item) => item.title}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 60,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        ListHeaderComponent={
          <>
            <View className="flex flex-col gap-4 items-center">
              <AppNameBanner />
              <SearchBar
                placeholder="Search for a movie..."
                onPress={() => router.push("/search")}
              />
            </View>

            {metrics && (
              <View className="my-10 w-full h-auto flex flex-col">
                <Text className="ml-2 text-lg text-custom-white-100 font-bold">
                  Trending Movies
                </Text>

                <FlatList
                  horizontal={true}
                  className="mt-5"
                  data={metrics}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <TrendingMovieCard movieData={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movieId.toString()}
                  ItemSeparatorComponent={() => <View className={"w-4"} />}
                />
              </View>
            )}

            <Text className="text-lg ml-2 text-custom-white-100 font-bold mt-5">
              Popular Movies
            </Text>

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
          <TmdbMovieCard
            movieData={item}
            onSaveMovie={(data) => {
              setChosenMovieData(data);
              setIsModalOpen(true);
            }}
          />
        )}
      />

      <SaveMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieData={chosenMovieData}
      />

      <StatusBar backgroundColor={"#141414"} style={"light"} />
    </SafeAreaView>
  );
};

export default Home;
