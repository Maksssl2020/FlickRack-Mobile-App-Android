import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { UserMovieStatus } from "@/types/UserMovieTypes";

type MovieStatusButtonProps = {
  title: string;
  buttonMovieStatus: UserMovieStatus;
  currentMovieStatus: UserMovieStatus | undefined;
  setMovieStatus: (status: UserMovieStatus) => void;
};

const MovieStatusButton = ({
  title,
  buttonMovieStatus,
  currentMovieStatus,
  setMovieStatus,
}: MovieStatusButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => setMovieStatus(buttonMovieStatus)}
      className={`w-full h-[40px] justify-center  border-2 rounded-lg border-custom-violet-500 items-center ${currentMovieStatus === buttonMovieStatus && "bg-custom-violet-500"}`}
    >
      <Text className={"text-custom-white-100 text-xl font-bold"}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MovieStatusButton;
