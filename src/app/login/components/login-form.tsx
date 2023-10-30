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
import * as z from "zod";
import {
  LoginFormSchema,
  defaultLoginForm,
} from "../validation/login-form-validation";
import { useLoadingStore } from "@/models";

export default function LoginForm() {
  const { setLoading } = useLoadingStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: defaultLoginForm,
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);

    setTimeout(() => {
      toast({
        variant: "destructive",
        description:
          "Oops. There is something wrong with the server, please try again later.",
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="emailAddress"
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
