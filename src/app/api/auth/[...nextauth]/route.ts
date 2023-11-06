import NextAuth, { NextAuthOptions, User } from "next-auth";
import GithubProvide from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PATHS, UserInterface } from "@/config";
import { LoginRequestInterface } from "@/app/login/validation/login-form-validation";
import { AuthApi, axiosInstance } from "@/services";

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
          const response = await axiosInstance.post(`/api/auth/login`, credentials);
      
          if (response.data && response.data.resultData) {
            // Authentication successful
            return response.data.resultData;
          } else {
            // Handle other error cases
            throw new Error("User not found on login");
          }
        } catch (error:any) {
          if (error.response) {
            // Handle Axios response error
            if (error.response.status === 401) {
              // Handle 401 Unauthorized error
              const errorMessage = error.response.data.message;
              console.error("401 Unauthorized Error:", errorMessage);
              throw new Error(errorMessage);
            } else {
              // Handle other response errors (4xx or 5xx)
              const errorMessage = error.response.data.message;
              console.error("Axios response error:", errorMessage);
              throw new Error(errorMessage);
            }
          } else {
            // Handle other types of errors
            console.error("Error occurred during authentication:", error.message);
            throw error;
          }
        }
      }
      

      // async authorize(credentials) {
      //   try {
      //     const data: any = await axiosInstance
      //       .post(`/api/auth/login`, credentials)
      //       .catch((error) => {
      //         console.log(`catch`);

      //         return error.response?.data;
      //         // throw new Error("yawa");
      //       });

      //     console.log(`datas`);
      //     console.log(data);
      //     if (data) {
      //       // Authentication successful
      //       return data.resultData;
      //     } else {
      //       throw new Error(data);
      //       // Handle specific error cases
      //       if (data && data.errors) {
      //         return new Error(data.errors[0].message); // Replace this with your actual error handling logic
      //       }
      //       // Handle other error cases
      //       return new Error("User not found on login");
      //     }
      //   } catch (error: any) {
      //     console.log(`error na`);
      //     console.log(error);

      //     return new Error("user not found on login");
      //   }
      //   // const data = await AuthApi.loginService(
      //   //   credentials as LoginRequestInterface
      //   // ).catch((error) => {
      //   //   return { resultData: error };
      //   //   // return data;
      //   //   // throw new Error(error)
      //   // });
      //   // console.log(data.resultData);

      //   // if (data) {
      //   //   return data?.resultData;
      //   // } else {
      //   //   return new Error("user not found on login");
      //   // }
      // },
    }),
    // CredentialProvider({
    //   id: "register",
    //   name: "register",
    //   credentials: {
    //     email: {
    //       label: "Username",
    //       type: "text",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const data = await AuthApi.registerService(
    //       credentials as LoginRequestInterface
    //     );

    //     if (data?.resultData) {
    //       return data?.resultData;
    //     }
    //     return Promise.reject("Credential Error");
    //   },
    // }),
  ],
  callbacks: {
    // TODO:: add validations from BE
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("user");

    //   console.log(user);

    //   return false;
    //   // if (user?.name === "error") {
    //   //   const error: any = new Error("error on login");
    //   //   error.status = 400; // Set the desired status code

    //   //   throw error;
    //   // } else return true;
    // },
    async jwt({ token, account, user }) {
      const credentials: any = {
        email: token.email as string,
        providerId: token.id as string,
        name: token.name as string,
        providerName: account?.provider.toUpperCase(),
      };

      if (
        !token.token &&
        account?.provider &&
        account?.provider !== "credentials"
      ) {
        const response = await AuthApi.loginUsingProvider(
          credentials as LoginRequestInterface
        ).catch(() => {
          throw new Error("thow on fetch");
          // return Promise.reject("Unauthorized");
        });

        if (response) {
          return {
            ...token,
            id: response.resultData.id,
            email: response.resultData.email,
            name: response.resultData.displayName,
            token: response.resultData.token,
            image: token.image,
          };
        } else {
          throw new Error("Invalid credentials");
          // return Promise.reject("User noofound");
        }
      }
      return { ...token, ...user };
    },
    async session({ session, token }: any): Promise<any> {
      if (token) {
        session.user = token;
        return session;
      }
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
