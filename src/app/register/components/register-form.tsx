"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PATHS } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Icons } from "@/components";
import { signIn } from "next-auth/react";
import {
  RegisterFormSchema,
  RegisterRequestInterface,
  defaultRegisterForm,
} from "../validation/register-form-validation";
import { useLoadingStore } from "@/models";

export default function RegisterForm() {
  const { setLoading } = useLoadingStore();

  const form = useForm<RegisterRequestInterface>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: defaultRegisterForm,
  });

  const handleOnSubmit = async (values: RegisterRequestInterface) => {
    setLoading(true);

    await signIn("register", {
      email: values.email,
      password: values.password,
      callbackUrl: PATHS.MAIN,
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    hasError={fieldState.invalid}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    type="text"
                    suffix={<Icons.mail />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    hasError={fieldState.invalid}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    hasError={fieldState.invalid}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button hasLoadingFeedback type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}
