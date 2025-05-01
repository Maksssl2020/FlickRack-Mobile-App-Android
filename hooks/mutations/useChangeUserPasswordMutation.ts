import { useMutation } from "@tanstack/react-query";
import { ChangePasswordRequest } from "@/types/AuthenticationTypes";
import { handleChangeUserPassword } from "@/services/authenticationApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useChangeUserPasswordMutation(onSuccess?: () => void) {
  const { mutate: changePassword, isPending: changingPassword } = useMutation({
    mutationKey: ["changeUserPassword"],
    mutationFn: (data: ChangePasswordRequest) => handleChangeUserPassword(data),
    onSuccess: () => {
      onSuccess?.();

      Toast.show({
        type: "success",
        text1: "Successfully changed password.",
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

  return { changePassword, changingPassword };
}

export default useChangeUserPasswordMutation;
