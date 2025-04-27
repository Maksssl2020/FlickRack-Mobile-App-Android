import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import {
  MovieDataToDisplayInModalToSave,
  UserMovieStatus,
} from "@/types/UserMovieTypes";
import useSaveUserMovieMutation from "@/hooks/mutations/useSaveUserMovieMutation";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import Toast from "react-native-toast-message";

type SaveMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movieData: MovieDataToDisplayInModalToSave | undefined;
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
  const { saveUserMovie, savingUserMovie } = useSaveUserMovieMutation();

  const onSubmit = () => {
    console.log("SUBMIT");

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
          <TouchableOpacity
            onPress={() => setChosenMovieStatus("ToWatch")}
            className={`w-full h-[40px] justify-center  border-2 rounded-lg border-custom-violet-500 items-center ${chosenMovieStatus === "ToWatch" && "bg-custom-violet-500"}`}
          >
            <Text className={"text-custom-white-100 text-xl font-bold"}>
              To Watch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setChosenMovieStatus("Watching")}
            className={`w-full h-[40px] justify-center  border-2 rounded-lg border-custom-violet-500 items-center ${chosenMovieStatus === "Watching" && "bg-custom-violet-500"}`}
          >
            <Text className={"text-custom-white-100  text-xl font-bold"}>
              Watching
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setChosenMovieStatus("Watched")}
            className={`w-full h-[40px] justify-center  border-2 rounded-lg border-custom-violet-500 items-center ${chosenMovieStatus === "Watched" && "bg-custom-violet-500"}`}
          >
            <Text className={"text-custom-white-100  text-xl font-bold"}>
              Watched
            </Text>
          </TouchableOpacity>
        </View>
        <View className={"flex-row  justify-between mt-4"}>
          <CustomButton
            buttonClassName={"w-[49%]"}
            title={"Cancel"}
            onPress={onClose}
          />
          <CustomButton
            isLoading={savingUserMovie}
            buttonClassName={"w-[49%]"}
            title={"Save"}
            onPress={() => onSubmit()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SaveMovieModal;
