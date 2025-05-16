import {
  AuthenticationResponse,
  AuthenticationState,
} from "@/types/AuthenticationTypes";
import { create } from "zustand/react";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

type AuthenticationStoreState = {
  authentication: AuthenticationState;
  updateData: (data: AuthenticationState) => void;
  login: (data: AuthenticationResponse) => void;
  logout: () => void;
};

const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  username: null,
  accessToken: null,
  userId: null,
  email: null,
  createdAt: null,
};

export const useAuthenticationStore = create<AuthenticationStoreState>()(
  persist(
    (setState) => ({
      authentication: initialAuthenticationState,
      updateData: (data) =>
        setState({
          authentication: {
            ...data,
          },
        }),
      login: (data) =>
        setState({
          authentication: {
            isAuthenticated: true,
            ...data,
          },
        }),
      logout: () =>
        setState({
          authentication: initialAuthenticationState,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorageNative),
    },
  ),
);
