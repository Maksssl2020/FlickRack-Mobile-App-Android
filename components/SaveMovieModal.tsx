import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import { MovieDataToSave, UserMovieStatus } from "@/types/UserMovieTypes";
import useSaveUserMovieMutation from "@/hooks/mutations/useSaveUserMovieMutation";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import Toast from "react-native-toast-message";
import MovieStatusButton from "@/components/MovieStatusButton";

type SaveMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movieData: MovieDataToSave | undefined;
};

const SaveMovieModal = ({
  isOpen,
  onClose,
  movieData,
}: SaveMovieModalProps) => {
  const [chosenMovieStatus, setChosenMovieStatus] = useState<
    UserMovieStatus | undefined
  >(undefined);
  const { userId } = useAuthenticationStore.getState().authentication;
  const { saveUserMovie, savingUserMovie } = useSaveUserMovieMutation(() => {
    onClose();
  });

  const onSubmit = () => {
    if (
      chosenMovieStatus !== undefined &&
      userId !== null &&
      movieData?.id !== null
    ) {
      saveUserMovie({
        userId: userId,
        movieId: parseInt(movieData!.id),
        userMovieStatus: chosenMovieStatus,
      });
    }
    if (chosenMovieStatus === undefined) {
      Toast.show({
        type: "error",
        text1: "Select a movie status please.",
      });
    }
  };

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View
        className={
          "w-[95%] h-auto py-3 px-4 flex-col gap-3 rounded-xl self-center border-2 border-custom-violet-600 bg-custom-gray-500"
        }
      >
        <Text
          className={"text-2xl font-bold self-center text-custom-white-100"}
        >
          Save a Movie
        </Text>
        <View className={"w-full h-auto flex flex-col gap-2 mt-3"}>
          <Text className={"text-xl text-custom-white-100"}>
            Selected movie:{" "}
            <Text
              className={"text-xl text-custom-violet-500 font-bold"}
              numberOfLines={1}
            >
              {movieData?.title}
            </Text>
          </Text>
          <Text className={"text-xl text-custom-white-100"}>
            Select movie status below:
          </Text>
          <MovieStatusButton
            title={"To Watch"}
            buttonMovieStatus={"ToWatch"}
            currentMovieStatus={chosenMovieStatus}
            setMovieStatus={setChosenMovieStatus}
          />
          <MovieStatusButton
            title={"Watching"}
            buttonMovieStatus={"Watching"}
            currentMovieStatus={chosenMovieStatus}
            setMovieStatus={setChosenMovieStatus}
          />
          <MovieStatusButton
            title={"Watched"}
            buttonMovieStatus={"Watched"}
            currentMovieStatus={chosenMovieStatus}
            setMovieStatus={setChosenMovieStatus}
          />
        </View>
        <View className={"flex flex-row justify-between mt-4"}>
          <CustomButton
            buttonClassName={"w-[48%]"}
            title={"Cancel"}
            onPress={onClose}
          />
          <CustomButton
            isLoading={savingUserMovie}
            buttonClassName={"w-[48%]"}
            title={"Save"}
            onPress={() => onSubmit()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SaveMovieModal;
