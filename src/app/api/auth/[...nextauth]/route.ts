import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvide from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PATHS, UserInterface } from "@/config";
import { LoginRequestInterface } from "@/app/login/validation/login-form-validation";
import { AuthApi } from "@/services";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvide({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials) {
        try {
          const data = await AuthApi.loginService(
            credentials as LoginRequestInterface
          );
          if (data) {
            return data?.resultData;
          } else {
            return { id: "1", error: "error", status: 400 };
          }
        } catch (error) {
          return { id: "1", name: "error", status: 400 };
        }
      },
    }),
    CredentialProvider({
      id: "register",
      name: "register",
      credentials: {
        email: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const data = await AuthApi.registerService(
          credentials as LoginRequestInterface
        );

        if (data?.resultData) {
          return data?.resultData;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // TODO:: add validations from BE
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (user?.name === "error") {
    //     const error: any = new Error("error on login");
    //     error.status = 400; // Set the desired status code

    //     throw error;
    //   } else return true;
    // },
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account };
    },
    async session({ session, token }: any): Promise<any> {
      if (token) {
        const credentials: any = {
          email: token.email as string,
          providerId: token.id as string,
          name: token.name as string,
          providerName: token.provider.toUpperCase(),
        };
        const response = await AuthApi.loginUsingProvider(
          credentials as LoginRequestInterface
        );
        if (response) {
          return {
            ...session,
            provider: token.provider.toUpperCase(),
            user: {
              ...response.resultData,
              image: session.user.image,
            },
          };
        }
        return session;
      }
      session.user = token as unknown as UserInterface;
      return session;
    },
  },
  pages: {
    signIn: PATHS.LOGIN,
    newUser: PATHS.REGISTER,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
