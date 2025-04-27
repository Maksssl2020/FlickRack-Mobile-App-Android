import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/types/AuthenticationTypes";
import { handleUserLogin } from "@/services/authenticationApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";
import { useAuthenticationStore } from "@/store/AuthenticationStore";

function useLoginMutation(onSuccess?: () => void) {
  const { mutate: login, isPending: logging } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (data: LoginRequest) => handleUserLogin(data),
    onSuccess: (data) => {
      useAuthenticationStore.getState().login(data);
      onSuccess?.();
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

  return { login, logging };
}

export default useLoginMutation;
