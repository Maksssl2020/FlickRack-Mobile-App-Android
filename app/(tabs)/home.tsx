import React from "react";

import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNameBanner from "@/components/AppNameBanner";
import { useRouter } from "expo-router";
import useTmdbMoviesQuery from "@/hooks/queries/useTmdbMoviesQuery";
import TmdbMovieCard from "@/components/TmdbMovieCard";
import useMoviesMetricsQuery from "@/hooks/queries/useMoviesMetricsQuery";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import useActorsQuery from "@/hooks/queries/useTmdbActorsQuery";
import TmdbActorCard from "@/components/TmdbActorCard";

const Home = () => {
  const { tmdbMovies, fetchingTmdbMovies } = useTmdbMoviesQuery();
  const { tmdbActors, fetchingTmdbActors } = useActorsQuery();
  const { moviesMetrics, fetchingMoviesMetrics } = useMoviesMetricsQuery();
  const router = useRouter();

  const isLoadingMovies = fetchingTmdbMovies || fetchingMoviesMetrics;

  return (
    <ScrollView className={"w-full h-full flex-1 bg-custom-black-100 pt-10"}>
      <View className="flex flex-col gap-4 items-center px-[20px]">
        <AppNameBanner />
      </View>

      <FlatList
        scrollEnabled={false}
        className={"flex-1 h-full"}
        data={tmdbMovies?.slice(0, 6) ?? []}
        keyExtractor={(item) => item.title}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        ListHeaderComponent={
          <View className="mt-6">
            {moviesMetrics && (
              <>
                <Text className="ml-2 text-lg text-custom-white-100 font-bold">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  data={moviesMetrics}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: 10 }}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  renderItem={({ item, index }) => (
                    <TrendingMovieCard movieData={item} index={index} />
                  )}
                />
              </>
            )}
            <View className={"w-full h-auto flex flex-row justify-between"}>
              <Text className="ml-2 text-lg text-custom-white-100 font-bold mt-4">
                Popular Movies
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/movies/movies")}
                className={"mr-2"}
              >
                <Text
                  className={"text-lg text-custom-violet-600 font-bold mt-4"}
                >
                  See More
                </Text>
              </TouchableOpacity>
            </View>
            {isLoadingMovies && (
              <ActivityIndicator
                size="large"
                color="#3e55c6"
                className="mt-6 self-center"
              />
            )}
          </View>
        }
        renderItem={({ item }) => <TmdbMovieCard movieData={item} />}
      />

      <FlatList
        scrollEnabled={false}
        className={"flex-1"}
        data={tmdbActors?.slice(0, 6) ?? []}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        ListHeaderComponent={
          <View className="mt-4">
            <View className={"w-full h-auto flex flex-row justify-between"}>
              <Text className="ml-2 text-lg text-custom-white-100 font-bold mt-4">
                Popular Actors
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/actors/actors")}
                className={"mr-2"}
              >
                <Text
                  className={"text-lg text-custom-violet-600 font-bold mt-4"}
                >
                  See More
                </Text>
              </TouchableOpacity>
            </View>
            {fetchingTmdbActors && (
              <ActivityIndicator
                size="large"
                color="#3e55c6"
                className="mt-6 self-center"
              />
            )}
          </View>
        }
        renderItem={({ item }) => <TmdbActorCard actorData={item} />}
      />

      <StatusBar backgroundColor={"#141414"} style={"light"} />
    </ScrollView>
  );
};

export default Home;
