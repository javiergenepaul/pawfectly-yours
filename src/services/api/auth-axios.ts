import { LoginRequestInterface } from "@/app/login/validation/login-form-validation";
import { axiosInstance } from "..";
import { API_URL, ApiResultModel } from "@/config";

const AUTH_URL: string = "api/auth";

const loginService = async (
  formData: LoginRequestInterface
): Promise<ApiResultModel<any>> => {
  const response = await axiosInstance.post(`${API_URL}/login`, formData);
  return response.data;
};

const loginUsingProvider = async (
  formData: LoginRequestInterface
): Promise<ApiResultModel<any>> => {
  const response = await axiosInstance.post(
    `${AUTH_URL}/login-using-provider`,
    formData
  );
  return response.data;
};

const verifyEmail = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.post(`${API_URL}/verify-email`, email);
  return response.data.resultData;
};

const registerService = async (
  formData: LoginRequestInterface
): Promise<ApiResultModel<any>> => {
  const response = await axiosInstance.post(`${API_URL}/register`, formData);
  return response.data;
};

export const AuthApi = {
  loginService,
  loginUsingProvider,
  verifyEmail,
  registerService,
};
