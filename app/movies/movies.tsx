import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTmdbMoviesQuery from "@/hooks/queries/useTmdbMoviesQuery";
import SearchBar from "@/components/SearchBar";
import AppNameBanner from "@/components/AppNameBanner";
import useMoviesMetricsQuery from "@/hooks/queries/useMoviesMetricsQuery";
import { router } from "expo-router";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import TmdbMovieCard from "@/components/TmdbMovieCard";

const Movies = () => {
  const { tmdbMovies, fetchingTmdbMovies } = useTmdbMoviesQuery();
  const { moviesMetrics, fetchingMoviesMetrics } = useMoviesMetricsQuery();

  const isLoading = fetchingTmdbMovies || fetchingMoviesMetrics;

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
                placeholder="SearchMovie for a movie..."
                onPress={() => router.push("/search-movie")}
              />
            </View>

            {moviesMetrics && (
              <View className="my-10 w-full h-auto flex flex-col">
                <Text className="ml-2 text-lg text-custom-white-100 font-bold">
                  Trending Movies
                </Text>

                <FlatList
                  horizontal={true}
                  className="mt-5"
                  data={moviesMetrics}
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
        renderItem={({ item }) => <TmdbMovieCard movieData={item} />}
      />
    </SafeAreaView>
  );
};

export default Movies;
