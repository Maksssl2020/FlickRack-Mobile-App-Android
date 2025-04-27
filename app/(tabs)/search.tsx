import React, { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import TmdbMovieCard from "@/components/TmdbMovieCard";
import useTmdbMoviesQuery from "@/hooks/queries/useTmdbMoviesQuery";
import AppNameBanner from "@/components/AppNameBanner";
import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import useUpdateMetricsMutation from "@/hooks/mutations/useUpdateMetricsMutation";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const { tmdbMovies, fetchingTmdbMovies } = useTmdbMoviesQuery(query);
  const { updateMetricsCount, updatingMetricsCount } =
    useUpdateMetricsMutation();

  useEffect(() => {
    if (
      !fetchingTmdbMovies &&
      tmdbMovies &&
      tmdbMovies.length > 0 &&
      query !== ""
    ) {
      const timeout = setTimeout(() => {
        updateMetricsCount({
          searchTerm: query,
          movieTmdb: tmdbMovies[0],
        });
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [query, fetchingTmdbMovies, tmdbMovies]);

  return (
    <SafeAreaView
      className={"w-full h-full flex-1  items-center bg-custom-black-100"}
    >
      <FlatList
        data={tmdbMovies}
        renderItem={({ item }) => <TmdbMovieCard movieData={item} />}
        keyExtractor={(item) => item.id.toString()}
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
              <SearchBar
                value={query}
                onChangeText={(value) => setQuery(value)}
                placeholder={"Search for a movie..."}
              />
            </View>

            <View className={"ml-2 mt-5"}>
              {!fetchingTmdbMovies &&
                !updatingMetricsCount &&
                query.trim().length > 0 &&
                tmdbMovies?.length! > 0 && (
                  <Text className={"text-lg font-bold text-custom-white-100"}>
                    Search Results for:{" "}
                    <Text className={"text-custom-violet-500 uppercase"}>
                      {query}
                    </Text>
                  </Text>
                )}
            </View>

            {fetchingTmdbMovies && (
              <ActivityIndicator
                size="large"
                color="#3e55c6"
                className={"mt-10 self-center"}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !fetchingTmdbMovies && !updatingMetricsCount ? (
            <View className={"mt-10"}>
              <Text
                className={
                  "text-center font-bold text-2xl text-custom-white-100"
                }
              >
                Cannot find any movie for{" "}
                <Text className={"text-custom-violet-500"}>{query}</Text>
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

export default Search;
