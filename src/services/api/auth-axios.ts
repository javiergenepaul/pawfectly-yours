import { LoginRequestInterface } from "@/app/login/validation/login-form-validation";
import { axiosInstance } from "..";
import { ApiResultModel } from "@/config";

export const loginService = async (
  formData: LoginRequestInterface
): Promise<ApiResultModel<any>> => {
  const response = await axiosInstance.post("api/auth/login", formData);
  return response.data;
};
