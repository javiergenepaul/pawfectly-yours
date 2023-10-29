import * as z from "zod";

export const LoginFormSchema = z.object({
  emailAddress: z.string().email("Invalid email address").min(1, {
    message: "Email is Required",
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .refine(
      (password) => {
        return (
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*()_+]/.test(password)
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one number, and one special character.",
      }
    ),
  rememberMe: z.boolean(),
});

export const defaultLoginForm: z.infer<typeof LoginFormSchema> = {
  emailAddress: "",
  password: "",
  rememberMe: false,
};
