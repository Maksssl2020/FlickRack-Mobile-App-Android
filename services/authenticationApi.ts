import {
  AuthenticationResponse,
  ChangeEmailRequest,
  ChangePasswordRequest,
  ChangeUsernameRequest,
  LoginRequest,
  RegisterRequest,
} from "@/types/AuthenticationTypes";
import axiosConfig from "@/services/axiosConfig";

export async function handleUserRegister(
  data: RegisterRequest,
): Promise<AuthenticationResponse> {
  const response = await axiosConfig.post<AuthenticationResponse>(
    "/authentication/register",
    data,
  );
  return response.data;
}

export async function handleUserLogin(
  data: LoginRequest,
): Promise<AuthenticationResponse> {
  const response = await axiosConfig.post<AuthenticationResponse>(
    "/authentication/login",
    data,
  );
  return response.data;
}

export async function handleChangeUserPassword(data: ChangePasswordRequest) {
  const response = await axiosConfig.put<void>(
    "/authentication/change-password",
    data,
  );
  return response.data;
}

export async function handleChangeUserUsername(data: ChangeUsernameRequest) {
  const response = await axiosConfig.put<void>(
    "/authentication/change-username",
    data,
  );
  return response.data;
}

export async function handleChangeUserEmail(data: ChangeEmailRequest) {
  const response = await axiosConfig.put<void>(
    "/authentication/change-email",
    data,
  );
  return response.data;
}
