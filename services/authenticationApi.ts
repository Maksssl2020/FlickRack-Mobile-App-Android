import {
  AuthenticationResponse,
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
