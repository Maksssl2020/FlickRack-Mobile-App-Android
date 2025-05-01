import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNameBanner from "@/components/AppNameBanner";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useTmdbMoviesQuery from "@/hooks/queries/useTmdbMoviesQuery";
import TmdbMovieCard from "@/components/TmdbMovieCard";
import useMetricsQuery from "@/hooks/queries/useMetricsQuery";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { MovieDataToSave } from "@/types/UserMovieTypes";
import SaveMovieModal from "@/components/SaveMovieModal";
import useUserMoviesIdsQuery from "@/hooks/queries/useUserMoviesIdsQuery";
import useActorsQuery from "@/hooks/queries/usePopularActorsQuery";
import TmdbActorCard from "@/components/TmdbActorCard";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chosenMovieData, setChosenMovieData] = useState<
    MovieDataToSave | undefined
  >(undefined);
  const [fetchedUserMoviesIds, setFetchedUserMoviesIds] = useState<Set<number>>(
    new Set(),
  );
  const { tmdbMovies, fetchingTmdbMovies } = useTmdbMoviesQuery();
  const { tmdbActors, fetchingTmdbActors } = useActorsQuery();
  const { userMoviesIds, fetchingUserMoviesIds } = useUserMoviesIdsQuery();
  const { metrics, fetchingMetrics } = useMetricsQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetchingUserMoviesIds && fetchedUserMoviesIds) {
      setFetchedUserMoviesIds(new Set(userMoviesIds));
    }
  }, [userMoviesIds]);

  const isLoadingMovies =
    fetchingTmdbMovies || fetchingMetrics || fetchingUserMoviesIds;
  const isLoadingActors = fetchingTmdbActors;

  return (
    <ScrollView className={"w-full h-full flex-1 bg-custom-black-100 pt-10"}>
      <View className="flex flex-col gap-4 items-center px-[20px]">
        <AppNameBanner />
        <SearchBar
          placeholder="Search for a movie..."
          onPress={() => router.push("/search")}
        />
      </View>

      <FlatList
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
            {metrics && (
              <>
                <Text className="ml-2 text-lg text-custom-white-100 font-bold">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  data={metrics}
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
              <TouchableOpacity className={"mr-2"}>
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
        renderItem={({ item }) => (
          <TmdbMovieCard
            movieData={item}
            onSaveMovie={(data) => {
              setChosenMovieData(data);
              setIsModalOpen(true);
            }}
            isSavedMovie={fetchedUserMoviesIds.has(item.id)}
          />
        )}
      />

      <FlatList
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
              <TouchableOpacity className={"mr-2"}>
                <Text
                  className={"text-lg text-custom-violet-600 font-bold mt-4"}
                >
                  See More
                </Text>
              </TouchableOpacity>
            </View>
            {isLoadingActors && (
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

      <SaveMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieData={chosenMovieData}
      />

      <StatusBar backgroundColor={"#141414"} style={"light"} />
    </ScrollView>
  );
};

export default Home;
