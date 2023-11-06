import { LoginProviderEnum } from "./enum";

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    token: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: UserInterface;
    provider: LoginProviderEnum;
    error?: string;
  }
}

export interface ApiResultModel<T> {
  status: number;
  resultData: T;
  message: string;
  errors: any;
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
