import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import AppNameBanner from "@/components/AppNameBanner";
import SearchBar from "@/components/SearchBar";
import useTmdbActorsQuery from "@/hooks/queries/useTmdbActorsQuery";
import TmdbActorCard from "@/components/TmdbActorCard";

const SearchActor = () => {
  const [query, setQuery] = useState<string>("");
  const { tmdbActors, fetchingTmdbActors } = useTmdbActorsQuery(query);

  return (
    <SafeAreaView
      className={"w-full h-full flex-1  items-center bg-custom-black-100"}
    >
      <FlatList
        data={tmdbActors}
        renderItem={({ item }) => <TmdbActorCard actorData={item} />}
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
                placeholder={"SearchMovie for an actor..."}
              />
            </View>

            <View className={"ml-2 mt-5"}>
              {!fetchingTmdbActors &&
                query.trim().length > 0 &&
                tmdbActors?.length! > 0 && (
                  <Text className={"text-lg font-bold text-custom-white-100"}>
                    Search Results for:{" "}
                    <Text className={"text-custom-violet-500 uppercase"}>
                      {query}
                    </Text>
                  </Text>
                )}
            </View>

            {fetchingTmdbActors && (
              <ActivityIndicator
                size="large"
                color="#3e55c6"
                className={"mt-10 self-center"}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !fetchingTmdbActors ? (
            <View className={"mt-10"}>
              <Text
                className={
                  "text-center font-bold text-2xl text-custom-white-100"
                }
              >
                Cannot find any actor for{" "}
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

export default SearchActor;
