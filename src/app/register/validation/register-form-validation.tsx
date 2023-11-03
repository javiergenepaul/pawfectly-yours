import * as z from "zod";

export type RegisterRequestInterface = z.infer<typeof RegisterFormSchema>;

export const defaultRegisterForm: z.infer<typeof RegisterFormSchema> = {
  email: "",
  password: "",
  confirmPassword: "",
};


export const RegisterFormSchema = z
  .object({
    email: z.string().email("Invalid email address").min(1, {
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
    confirmPassword: z.string().min(1, {
      message: "Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
