export interface AuthenticationState {
  isAuthenticated: boolean;
  userId: number | null;
  username: string | null;
  email: string | null;
  accessToken: string | null;
  createdAt: Date | null;
}

export interface AuthenticationResponse {
  userId: number;
  username: string;
  accessToken: string;
  email: string;
  createdAt: Date;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ChangePasswordRequest {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

export interface ChangeUsernameRequest {
  userId: number;
  newUsername: string;
}

export interface ChangeEmailRequest {
  userId: number;
  newEmail: string;
}
