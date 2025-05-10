import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useActorsQuery from "@/hooks/queries/useTmdbActorsQuery";
import useActorsMetricsQuery from "@/hooks/queries/useActorsMetricsQuery";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import AppNameBanner from "@/components/AppNameBanner";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import TmdbActorCard from "@/components/TmdbActorCard";
import TrendingActorCard from "@/components/TrendingActorCard";

const Actors = () => {
  const { tmdbActors, fetchingTmdbActors } = useActorsQuery();
  const { actorsMetrics, fetchingActorsMetrics } = useActorsMetricsQuery();

  const isLoading = fetchingTmdbActors || fetchingActorsMetrics;

  return (
    <SafeAreaView className={"w-full h-full flex-1 bg-custom-black-100"}>
      <FlatList
        data={tmdbActors}
        keyExtractor={(item) => item.name}
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
                placeholder="SearchMovie for an actor..."
                onPress={() => router.push("/search-actor")}
              />
            </View>

            {actorsMetrics && (
              <View className="my-10 w-full h-auto flex flex-col">
                <Text className="ml-2 text-lg text-custom-white-100 font-bold">
                  Trending Actors
                </Text>

                <FlatList
                  horizontal={true}
                  className="mt-5"
                  data={actorsMetrics}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <TrendingActorCard actorData={item} index={index} />
                  )}
                  keyExtractor={(item) => item.actorId.toString()}
                  ItemSeparatorComponent={() => <View className={"w-4"} />}
                />
              </View>
            )}

            <Text className="text-lg ml-2 text-custom-white-100 font-bold mt-5">
              Popular Actors
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
        renderItem={({ item }) => <TmdbActorCard actorData={item} />}
      />
    </SafeAreaView>
  );
};

export default Actors;
