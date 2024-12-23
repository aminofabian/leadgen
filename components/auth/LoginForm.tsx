"use client";

import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "../ui/form";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urLError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Already in Use with a Different Provider"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="text-slate-50">
      <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Don't Have an Account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-200">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        className="h-11 bg-black/20 border border-white/10 text-slate-100 placeholder:text-slate-500 
                          focus:border-[#f059da] focus:ring-[#f059da] focus:ring-opacity-20 rounded-xl
                          transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400/90 font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-200">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="••••••••"
                        disabled={isPending}
                        type="password"
                        className="h-11 bg-black/20 border border-white/10 text-slate-100 placeholder:text-slate-500 
                          focus:border-[#f059da] focus:ring-[#f059da] focus:ring-opacity-20 rounded-xl
                          transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400/90 font-light" />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urLError} />
            <FormSuccess message={success} />
            <div className="flex flex-col space-y-6">
              <Button
                size="sm"
                variant="link"
                className="text-sm text-[#f059da]/80 hover:text-[#f059da] transition-colors"
                asChild
              >
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>
              <Button
                variant="default"
                type="submit"
                className="w-full h-11 bg-[#f059da] hover:bg-[#f059da]/90 text-white font-medium
                  border-0 rounded-xl transition-all duration-200 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:hover:scale-100"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;