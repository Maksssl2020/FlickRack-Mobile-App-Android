import { useMutation } from "@tanstack/react-query";
import { ChangeEmailRequest } from "@/types/AuthenticationTypes";
import { handleChangeUserEmail } from "@/services/authenticationApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useChangeUserEmailMutation(onSuccess?: () => void) {
  const { mutate: changeEmail, isPending: changingEmail } = useMutation({
    mutationKey: ["changeUserEmail"],
    mutationFn: (data: ChangeEmailRequest) => handleChangeUserEmail(data),
    onSuccess: () => {
      onSuccess?.();

      Toast.show({
        type: "success",
        text1: "Successfully changed e-mail.",
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

  return { changeEmail, changingEmail };
}

export default useChangeUserEmailMutation;
