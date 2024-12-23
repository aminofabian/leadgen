"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { redirect } from "next/navigation";

const ERROR_MESSAGES = {
  INVALID_FIELDS: "Invalid fields!",
  EMAIL_NOT_EXIST: "Email does not exist!",
  CONFIRMATION_EMAIL_SENT: "Confirmation email sent!",
  INVALID_CREDENTIALS: "Invalid credentials!",
  SOMETHING_WENT_WRONG: "Something went wrong!",
};

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.INVALID_FIELDS };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: ERROR_MESSAGES.EMAIL_NOT_EXIST };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: ERROR_MESSAGES.CONFIRMATION_EMAIL_SENT };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: ERROR_MESSAGES.INVALID_CREDENTIALS };
  }

  try {
    await signIn("credentials", { 
      email, 
      password,
      redirect: false, // Prevent automatic redirect
    });
    
    // If login is successful, redirect to the dashboard
    redirect(callbackUrl || "/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: ERROR_MESSAGES.INVALID_CREDENTIALS };
        default:
          return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
      }
    }
    throw error;
  }
};