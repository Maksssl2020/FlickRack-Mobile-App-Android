import { useMutation } from "@tanstack/react-query";
import { RegisterRequest } from "@/types/AuthenticationTypes";
import { handleUserRegister } from "@/services/authenticationApi";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";

function useRegisterMutation(onSuccess?: () => void) {
  const { mutate: register, isPending: registering } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (data: RegisterRequest) => handleUserRegister(data),
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

  return { register, registering };
}

export default useRegisterMutation;
