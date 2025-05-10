import React, { useState } from "react";

import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNameBanner from "@/components/AppNameBanner";
import useUserMoviesQuery from "@/hooks/queries/useUserMoviesQuery";
import SavedTmdbMovieCard from "@/components/SavedTmdbMovieCard";
import ManageSavedMovieModal from "@/components/ManageSavedMovieModal";
import { MovieDataToManage } from "@/types/UserMovieTypes";
import TabButton from "@/components/TabButton";
import useUserFavouriteMoviesQuery from "@/hooks/queries/useUserFavouriteMoviesQuery";
import useUserFavouriteActorsQuery from "@/hooks/queries/useUserFavouriteActorsQuery";
import TmdbMovieCard from "@/components/TmdbMovieCard";
import TmdbActorCard from "@/components/TmdbActorCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import TmdbMovieReviewCard from "@/components/TmdbMovieReviewCard";
import useUserReviewsQuery from "@/hooks/queries/useUserReviewsQuery";
import UserReviewCard from "@/components/UserReviewCard";

const Saved = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "savedMovies" | "favoritesMovies" | "favoritesActors" | "reviews"
  >("savedMovies");

  const [chosenMovieData, setChosenMovieData] = useState<
    MovieDataToManage | undefined
  >(undefined);

  const { userMovies, fetchingUserMovies } = useUserMoviesQuery();
  const { userFavouriteMovies, fetchingUserFavouriteMovies } =
    useUserFavouriteMoviesQuery();
  const { userFavouriteActors, fetchingUserFavouriteActors } =
    useUserFavouriteActorsQuery();
  const { allUserReviews, fetchingAllUserReviews } = useUserReviewsQuery();

  const renderTabContent = () => {
    switch (activeTab) {
      case "savedMovies":
        return (
          <FlatList
            key={"savedMovies"}
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
            keyExtractor={(item) => item.item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
              <>
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
        );
      case "favoritesMovies":
        return (
          <FlatList
            key={"favoritesMovies"}
            data={userFavouriteMovies}
            renderItem={({ item }) => <TmdbMovieCard movieData={item.item} />}
            keyExtractor={(item) => item.item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
              <>
                {fetchingUserFavouriteMovies && (
                  <ActivityIndicator
                    size="large"
                    color="#3e55c6"
                    className={"mt-10 self-center"}
                  />
                )}
              </>
            }
            ListEmptyComponent={
              !fetchingUserFavouriteMovies ? (
                <View className={"mt-10"}>
                  <Text
                    className={
                      "text-center font-bold text-2xl text-custom-white-100"
                    }
                  >
                    You didn't add to favourites any movie. Go to the Home and
                    add few.
                  </Text>
                </View>
              ) : (
                <></>
              )
            }
          />
        );
      case "favoritesActors":
        return (
          <FlatList
            key={"favoritesActors"}
            data={userFavouriteActors}
            renderItem={({ item }) => <TmdbActorCard actorData={item.item} />}
            keyExtractor={(item) => item.item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
              <>
                {fetchingUserFavouriteActors && (
                  <ActivityIndicator
                    size="large"
                    color="#3e55c6"
                    className={"mt-10 self-center"}
                  />
                )}
              </>
            }
            ListEmptyComponent={
              !fetchingUserFavouriteActors ? (
                <View className={"mt-10"}>
                  <Text
                    className={
                      "text-center font-bold text-2xl text-custom-white-100"
                    }
                  >
                    You didn't add to favourites any actor. Go to the Home and
                    add few.
                  </Text>
                </View>
              ) : (
                <></>
              )
            }
          />
        );
      case "reviews":
        return (
          <FlatList
            key={"reviews"}
            data={allUserReviews}
            keyExtractor={(item) => item.id.toString().concat(item.username)}
            numColumns={1}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 60,
            }}
            renderItem={({ item }) => <UserReviewCard reviewData={item} />}
            ListHeaderComponent={
              <>
                {fetchingAllUserReviews && (
                  <ActivityIndicator
                    size="large"
                    color="#3e55c6"
                    className={"mt-10 self-center"}
                  />
                )}
              </>
            }
            ListEmptyComponent={
              !fetchingAllUserReviews ? (
                <View className={"mt-10"}>
                  <Text
                    className={
                      "text-center font-bold text-2xl text-custom-white-100"
                    }
                  >
                    You didn't write any review for a movie. Find one movie and
                    write a review.
                  </Text>
                </View>
              ) : (
                <></>
              )
            }
          />
        );
    }
  };

  return (
    <SafeAreaView
      className={"w-full h-full flex-1  items-center bg-custom-black-100"}
    >
      <View className={"flex flex-col gap-4 items-center"}>
        <AppNameBanner />
      </View>

      <View className={"w-full flex flex-row gap-2 justify-between px-2"}>
        <TabButton
          label={"Saved"}
          value={"savedMovies"}
          activeTab={activeTab}
          setActiveTab={() => setActiveTab("savedMovies")}
        />
        <TabButton
          label={"Fav. Movies"}
          value={"favoritesMovies"}
          activeTab={activeTab}
          setActiveTab={() => setActiveTab("favoritesMovies")}
        />
        <TabButton
          label={"Fav. Actors"}
          value={"favoritesActors"}
          activeTab={activeTab}
          setActiveTab={() => setActiveTab("favoritesActors")}
        />
        <TabButton
          label={"Reviews"}
          value={"reviews"}
          activeTab={activeTab}
          setActiveTab={() => setActiveTab("reviews")}
        />
      </View>

      <View className={"flex-1"}>{renderTabContent()}</View>

      <ManageSavedMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieData={chosenMovieData}
      />
    </SafeAreaView>
  );
};

export default Saved;
