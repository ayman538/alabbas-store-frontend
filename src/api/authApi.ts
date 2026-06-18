import { apiClient } from "./apiClient";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post("/public/auth/login", request);

  return response.data;
}