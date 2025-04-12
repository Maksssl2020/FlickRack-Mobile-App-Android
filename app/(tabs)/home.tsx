import React from "react";

import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNameBanner from "@/components/AppNameBanner";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import usePopularMoviesQuery from "@/hooks/queries/usePopularMoviesQuery";
import MovieCard from "@/components/MovieCard";

const Home = () => {
  const router = useRouter();
  const { popularMovies, fetchingPopularMovies } = usePopularMoviesQuery();

  console.log(popularMovies);

  return (
    <SafeAreaView
      className={"w-full h-full flex-1  items-center bg-custom-black-100"}
    >
      <View className={"flex-1 px-5"}>
        {fetchingPopularMovies ? (
          <ActivityIndicator
            size="large"
            color="#3e55c6"
            className={"mt-10 self-center"}
          />
        ) : (
          <View>
            <View className={"flex flex-col gap-6 items-center"}>
              <AppNameBanner className={"mt-8"} />
              <SearchBar
                placeholder={"Search for a movie..."}
                onPress={() => router.push("/search")}
              />
            </View>

            <View className={"gap-4"}>
              <Text
                className={"text-2xl ml-2 text-custom-white-100 font-bold mt-5"}
              >
                Popular Movies
              </Text>
              <FlatList
                data={popularMovies}
                renderItem={({ item }) => <MovieCard movieData={item} />}
                keyExtractor={(item) => item.title}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
              />
            </View>
          </View>
        )}
      </View>

      <StatusBar backgroundColor={"#141414"} style={"light"} />
    </SafeAreaView>
  );
};

export default Home;
