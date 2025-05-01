import { useMutation } from "@tanstack/react-query";
import { ChangeUsernameRequest } from "@/types/AuthenticationTypes";
import { handleChangeUserUsername } from "@/services/authenticationApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useChangeUserUsernameMutation(onSuccess?: () => void) {
  const { mutate: changeUsername, isPending: changingUsername } = useMutation({
    mutationKey: ["changeUserUsername"],
    mutationFn: (data: ChangeUsernameRequest) => handleChangeUserUsername(data),
    onSuccess: () => {
      onSuccess?.();

      Toast.show({
        type: "success",
        text1: "Successfully changed username.",
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    },
  });

  return { changeUsername, changingUsername };
}

export default useChangeUserUsernameMutation;
