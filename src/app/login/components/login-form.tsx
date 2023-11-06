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
import { PATHS } from "@/config";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  LoginRequestInterface,
  defaultLoginForm,
} from "../validation/login-form-validation";
import { Icons } from "@/components";
import { signIn } from "next-auth/react";
import { useLoadingStore } from "@/models";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { setLoading } = useLoadingStore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginRequestInterface>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: defaultLoginForm,
  });

  const handleOnSubmit = async (values: LoginRequestInterface) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: PATHS.MAIN,
      redirect: false,
    })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Invalid Session",
        });
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(res);

    // if (res?.error?.startsWith("error on login")) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid Credentials",
    //   });
    // } else if (res?.status === 200) {
    //   router.push(PATHS.MAIN);
    // }
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
    </>
  );
}
