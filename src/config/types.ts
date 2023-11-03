import { LoginProviderEnum } from "./enum";

declare module "next-auth" {
  interface Session {
    user: UserInterface;
    provider: LoginProviderEnum;
    error?: "error";
  }
}

export interface ApiResultModel<T> {
  status: number;
  resultData: T;
  message: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  firstName: string;
  LastName: string;
  displayName: string;
  token: string;
}
