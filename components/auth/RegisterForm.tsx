'use client';
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {UserIcon } from "lucide-react";
import CardWrapper from "./CardWrapper";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import { register } from "@/actions/register";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  
  return (
    <div className="text-slate-50">
      <CardWrapper
        headerLabel="Create an Account"
        backButtonLabel="Already Have an Account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-200">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="First Name"
                            className="h-11 pl-10 bg-black/20 border border-white/10 text-slate-100 
                              placeholder:text-slate-500 focus:border-[#f059da] focus:ring-[#f059da] 
                              focus:ring-opacity-20 rounded-xl transition-all duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400/90 font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-200">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Last Name"
                            className="h-11 pl-10 bg-black/20 border border-white/10 text-slate-100 
                              placeholder:text-slate-500 focus:border-[#f059da] focus:ring-[#f059da] 
                              focus:ring-opacity-20 rounded-xl transition-all duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400/90 font-light" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-200">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <EnvelopeClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...field}
                          type="email"
                          disabled={isPending}
                          placeholder="you@example.com"
                          className="h-11 pl-10 bg-black/20 border border-white/10 text-slate-100 
                            placeholder:text-slate-500 focus:border-[#f059da] focus:ring-[#f059da] 
                            focus:ring-opacity-20 rounded-xl transition-all duration-200"
                        />
                      </div>
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
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...field}
                          type="password"
                          disabled={isPending}
                          placeholder="••••••••"
                          className="h-11 pl-10 bg-black/20 border border-white/10 text-slate-100 
                            placeholder:text-slate-500 focus:border-[#f059da] focus:ring-[#f059da] 
                            focus:ring-opacity-20 rounded-xl transition-all duration-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400/90 font-light" />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-[#f059da] hover:bg-[#f059da]/90 text-white font-medium
                border-0 rounded-xl transition-all duration-200 transform hover:scale-[1.02]
                disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default RegisterForm;