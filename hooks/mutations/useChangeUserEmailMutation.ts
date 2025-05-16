import { useMutation } from "@tanstack/react-query";
import { ChangeEmailRequest } from "@/types/AuthenticationTypes";
import { handleChangeUserEmail } from "@/services/authenticationApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import { useAuthenticationStore } from "@/store/AuthenticationStore";

function useChangeUserEmailMutation(onSuccess?: () => void) {
  const { authentication, updateData } = useAuthenticationStore.getState();

  const { mutate: changeEmail, isPending: changingEmail } = useMutation({
    mutationKey: ["changeUserEmail"],
    mutationFn: (data: ChangeEmailRequest) => handleChangeUserEmail(data),
    onSuccess: (_, variables) => {
      onSuccess?.();

      Toast.show({
        type: "success",
        text1: "Successfully changed e-mail.",
      });

      updateData({
        ...authentication,
        email: variables.newEmail,
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data;

      if (errorMessage) {
        Toast.show({
          type: "error",
          text1: errorMessage as string,
        });
      }
    },
  });

  return { changeEmail, changingEmail };
}

export default useChangeUserEmailMutation;
