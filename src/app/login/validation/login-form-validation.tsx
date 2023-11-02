import * as z from "zod";

export type LoginRequestInterface = z.infer<typeof LoginFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, {
    message: "Email is Required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  // .refine(
  //   (password) => {
  //     return (
  //       /[A-Z]/.test(password) &&
  //       /\d/.test(password) &&
  //       /[!@#$%^&*()_+]/.test(password)
  //     );
  //   },
  //   {
  //     message:
  //       "Password must contain at least one uppercase letter, one number, and one special character.",
  //   }
  // ),
  rememberMe: z.boolean(),
});

export const defaultLoginForm: z.infer<typeof LoginFormSchema> = {
  email: "",
  password: "",
  rememberMe: false,
};
export const testLoginForm: z.infer<typeof LoginFormSchema> = {
  email: "gjavier@gmail.com",
  password: "fetchPassword",
  rememberMe: true,
};
