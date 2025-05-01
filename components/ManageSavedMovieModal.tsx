import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Text, View } from "react-native";
import { MovieDataToManage, UserMovieStatus } from "@/types/UserMovieTypes";
import CustomButton from "@/components/CustomButton";
import MovieStatusButton from "@/components/MovieStatusButton";
import useUpdateUserMovieStatusMutation from "@/hooks/mutations/useUpdateUserMovieStatusMutation";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import useDeleteUserMovieMutation from "@/hooks/mutations/useDeleteUserMovieMutation";

type ManageSavedMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movieData?: MovieDataToManage;
};

const ManageSavedMovieModal = ({
  isOpen,
  onClose,
  movieData,
}: ManageSavedMovieModalProps) => {
  const [movieStatus, setMovieStatus] = useState<UserMovieStatus | undefined>(
    movieData?.userMovieStatus,
  );
  const { userId } = useAuthenticationStore.getState().authentication;
  const { updateUserMovieStatus, updatingUserMovieStatus } =
    useUpdateUserMovieStatusMutation(() => {
      onClose();
    });
  const { deleteUserMovie, deletingUserMovie } = useDeleteUserMovieMutation(
    () => {
      onClose();
    },
  );

  useEffect(() => {
    if (movieData?.userMovieStatus) {
      setMovieStatus(movieData.userMovieStatus);
    }
  }, [movieData]);

  const onUpdateSubmit = () => {
    if (userId && movieData?.id && movieStatus) {
      updateUserMovieStatus({
        userId: userId,
        movieId: parseInt(movieData!.id),
        userMovieStatus: movieStatus,
      });
    }
  };

  const onDeleteSubmit = () => {
    if (movieData?.id) {
      deleteUserMovie(parseInt(movieData!.id));
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
          Manage Movie
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
            currentMovieStatus={movieStatus}
            setMovieStatus={setMovieStatus}
          />
          <MovieStatusButton
            title={"Watching"}
            buttonMovieStatus={"Watching"}
            currentMovieStatus={movieStatus}
            setMovieStatus={setMovieStatus}
          />
          <MovieStatusButton
            title={"Watched"}
            buttonMovieStatus={"Watched"}
            currentMovieStatus={movieStatus}
            setMovieStatus={setMovieStatus}
          />
        </View>
        <View className={"w-full h-auto flex flex-col gap-3 mt-8"}>
          <CustomButton
            buttonClassName={"w-full h-[35px]"}
            textClassName={"text-xl"}
            isLoading={deletingUserMovie}
            title={"Delete Movie"}
            onPress={onDeleteSubmit}
          />
          <CustomButton
            buttonClassName={"w-full h-[35px]"}
            textClassName={"text-xl"}
            isLoading={updatingUserMovieStatus}
            title={"Update Movie Status"}
            onPress={() => onUpdateSubmit()}
          />
          <CustomButton
            buttonClassName={"w-full h-[35px]"}
            textClassName={"text-xl"}
            title={"Cancel"}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ManageSavedMovieModal;
