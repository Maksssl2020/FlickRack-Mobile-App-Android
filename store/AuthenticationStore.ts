import {
  AuthenticationResponse,
  AuthenticationState,
} from "@/types/AuthenticationTypes";
import { create } from "zustand/react";
import { persist } from "zustand/middleware";

type AuthenticationStoreState = {
  authentication: AuthenticationState;
  login: (data: AuthenticationResponse) => void;
  logout: () => void;
};

const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  username: null,
  accessToken: null,
  userId: null,
};

export const useAuthenticationStore = create<AuthenticationStoreState>()(
  persist(
    (setState) => ({
      authentication: initialAuthenticationState,
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
    },
  ),
);
