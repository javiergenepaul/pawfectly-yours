"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { PATHS } from "@/config";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  LoginRequestInterface,
  testLoginForm,
} from "../validation/login-form-validation";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services";
import LoadingMask from "@/components/loading-mask";
import { Icons } from "@/components";

export default function LoginForm() {
  const { toast } = useToast();

  /**
   * Custom hook that handles a mutation using the provided mutation function and handles
   * the success and error cases.
   * @param {Object} options - The options object for the mutation.
   * @param {Function} options.mutationFn - The mutation function to be called.
   * @param {LoginRequestInterface} options.formData - The form data to be passed to the mutation function.
   * @param {Function} options.onSuccess - The function to be called on successful mutation.
   * @param {Function} options.onError - The function to be called on error during mutation.
   * @returns None
   */
  const mutation = useMutation({
    mutationFn: (formData: LoginRequestInterface) => loginService(formData),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Login Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description:
          "Oops. There is something wrong with the server, please try again later.",
      });
    },
  });

  const form = useForm<LoginRequestInterface>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: testLoginForm,
  });

  const onSubmit = (values: LoginRequestInterface) => {
    mutation.mutate(values);
  };

  return (
    <>
      <LoadingMask isLoading={mutation.isPending} />
      <Form {...form}>
        <div className="">{mutation.data?.resultData.email}</div>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center mb-8">
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-muted-foreground cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember Me
                      </label>
                    </div>
                    <Link
                      href={PATHS.FORGOT_PASSWORD}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline hover:underline-offset-4"
                    >
                      Forget Password
                    </Link>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button hasLoadingFeedback type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
